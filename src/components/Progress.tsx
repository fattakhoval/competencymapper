import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Progress = () => {
  const progressData = [
    {
      month: "Jan",
      technical: 75,
      leadership: 65,
      communication: 80,
    },
    {
      month: "Feb",
      technical: 78,
      leadership: 68,
      communication: 82,
    },
    {
      month: "Mar",
      technical: 82,
      leadership: 72,
      communication: 85,
    },
    {
      month: "Apr",
      technical: 85,
      leadership: 75,
      communication: 87,
    },
    {
      month: "May",
      technical: 88,
      leadership: 80,
      communication: 88,
    },
  ];

  const competencies = [
    {
      name: "Technical Skills",
      current: 88,
      previous: 75,
      change: "+13",
    },
    {
      name: "Leadership",
      current: 80,
      previous: 65,
      change: "+15",
    },
    {
      name: "Communication",
      current: 88,
      previous: 80,
      change: "+8",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Progress Tracking
        </h1>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Competency Development Over Time
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="technical"
                  stroke="#1E40AF"
                  name="Technical Skills"
                />
                <Line
                  type="monotone"
                  dataKey="leadership"
                  stroke="#047857"
                  name="Leadership"
                />
                <Line
                  type="monotone"
                  dataKey="communication"
                  stroke="#B91C1C"
                  name="Communication"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competencies.map((comp) => (
            <Card key={comp.name} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {comp.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Level</span>
                  <span className="font-medium">{comp.current}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Previous Level</span>
                  <span className="font-medium">{comp.previous}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Change</span>
                  <span className="font-medium text-green-600">
                    {comp.change}%
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;