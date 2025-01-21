import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, RefreshCw } from "lucide-react";

const data = [
  { skill: "Time Management", score: 85 },
  { skill: "Team Collaboration", score: 92 },
  { skill: "Stress Management", score: 78 },
  { skill: "Communication", score: 88 },
  { skill: "Problem Solving", score: 90 },
];

const Results = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assessment Results
          </h1>
          <p className="text-xl text-gray-600">
            Here's how you performed across different competencies
          </p>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Competency Scores
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#1E40AF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Key Strengths
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-green-600">
                <span className="w-4 h-4 bg-green-600 rounded-full mr-3"></span>
                Team Collaboration (92%)
              </li>
              <li className="flex items-center text-green-600">
                <span className="w-4 h-4 bg-green-600 rounded-full mr-3"></span>
                Problem Solving (90%)
              </li>
              <li className="flex items-center text-green-600">
                <span className="w-4 h-4 bg-green-600 rounded-full mr-3"></span>
                Communication (88%)
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Areas for Improvement
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-orange-600">
                <span className="w-4 h-4 bg-orange-600 rounded-full mr-3"></span>
                Stress Management (78%)
              </li>
              <li className="flex items-center text-orange-600">
                <span className="w-4 h-4 bg-orange-600 rounded-full mr-3"></span>
                Time Management (85%)
              </li>
            </ul>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Button className="bg-primary hover:bg-primary-hover text-white">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Link to="/test">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Take Another Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;