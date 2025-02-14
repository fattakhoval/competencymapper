const express = require('express');

module.exports = (db, authenticateToken) => {
    const router = express.Router();

    // Middleware для проверки токена
    router.use(authenticateToken);

    // Получение списка вопросов для теста
    router.get('/questions', async (req, res) => {
        try {
            console.log('Fetching questions from database...');
            
            // Проверяем подключение к БД
            if (!db) {
                console.error('Database connection is not established');
                return res.status(500).json({ error: 'Database connection error' });
            }

            // Получаем все вопросы из базы данных с подробным логированием
            const [questions] = await db.query('SELECT * FROM Tests')
                .catch(err => {
                    console.error('SQL Error:', err);
                    throw err;
                });

            console.log(`Retrieved ${questions.length} questions`);

            if (!questions || questions.length === 0) {
                return res.status(404).json({ error: 'No questions found' });
            }

            // Группируем вопросы по категориям
            const groupedQuestions = questions.reduce((acc, question) => {
                const category = question.category;
                if (!acc[category]) {
                    acc[category] = [];
                }

                // Проверяем наличие и валидность JSON в options
                let options;
                try {
                    options = typeof question.options === 'string' 
                        ? JSON.parse(question.options) 
                        : question.options;
                } catch (err) {
                    console.error(`Error parsing options for question ${question.id}:`, err);
                    options = [];
                }

                acc[category].push({
                    id: question.id,
                    category: question.category,
                    question: question.question,
                    options: options
                });
                return acc;
            }, {});

            console.log('Categories found:', Object.keys(groupedQuestions));

            // Выбираем случайные вопросы из каждой категории
            const selectedQuestions = Object.entries(groupedQuestions).flatMap(([category, questions]) => {
                const shuffled = [...questions].sort(() => Math.random() - 0.5);
                return shuffled.slice(0, 4);
            });

            console.log(`Sending ${selectedQuestions.length} questions`);
            res.status(200).json(selectedQuestions);
        } catch (error) {
            console.error('Error in /questions route:', error);
            res.status(500).json({ 
                error: 'Failed to retrieve questions',
                details: error.message
            });
        }
    });

    // Получение результатов теста
    router.get('/', async (req, res) => {
        try {
            const userId = req.user.id;
            const [results] = await db.query(
                'SELECT score, completedAt FROM TestResults WHERE userId = ? ORDER BY completedAt DESC',
                [userId]
            );
    
            // Преобразуем JSON-строку обратно в объект, если это необходимо
            const parsedResults = results.map(result => ({
                ...result,
                score: JSON.parse(result.score),
            }));
    
            res.status(200).json(parsedResults);
        } catch (error) {
            console.error('Error retrieving test results:', error);
            res.status(500).json({ error: 'Failed to retrieve test results' });
        }
    });

// Сохранение результата теста
router.post('/', async (req, res) => {
  console.log('=== Starting test results save ===');
  console.log('Headers:', req.headers);
  console.log('User from token:', req.user);
  console.log('Request body:', req.body);

  try {
      // Получаем ID пользователя из токена
      const userId = req.user?.id;
      console.log('User ID from token:', userId);

      if (!userId) {
          console.error('No user ID in token');
          return res.status(401).json({ error: 'User not authenticated' });
      }

      const { results } = req.body;
      console.log('Results from request:', results);
      
      // Проверяем корректность данных
      if (!results || typeof results !== 'object' || Array.isArray(results)) {
          console.error('Invalid results format:', results);
          return res.status(400).json({ 
              error: 'Invalid data format',
              details: 'Results must be an object with category scores'
          });
      }

      // Проверяем структуру результатов
      for (const category in results) {
          const categoryData = results[category];
          console.log(`Checking category ${category}:`, categoryData);
          
          if (!categoryData.score || !categoryData.percentage) {
              console.error(`Invalid data for category ${category}:`, categoryData);
              return res.status(400).json({
                  error: 'Invalid category data',
                  details: `Category ${category} missing required fields`
              });
          }
      }

      console.log('Preparing SQL query...');
      const resultsJson = JSON.stringify(results);
      console.log('JSON to save:', resultsJson);

      // Сохраняем результаты
      console.log('Executing INSERT query...');
      const [result] = await db.query(
          'INSERT INTO TestResults (userId, score, completedAt) VALUES (?, ?, NOW())',
          [userId, resultsJson]
      );

      console.log('Query result:', result);

      if (!result.insertId) {
          console.error('Insert failed - no insertId returned');
          throw new Error('Failed to insert test results');
      }

      console.log('Test results saved successfully with ID:', result.insertId);
      
      res.status(201).json({
          message: 'Test results saved successfully',
          resultId: result.insertId
      });

  } catch (error) {
      console.error('Error in test results save:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
          console.error('Foreign key constraint failed - invalid userId');
          return res.status(400).json({
              error: 'Invalid user ID',
              details: 'User does not exist in database'
          });
      }
      res.status(500).json({
          error: 'Failed to save test results',
          details: error.message
      });
  }
  console.log('=== End test results save ===');
});


    return router;
};
