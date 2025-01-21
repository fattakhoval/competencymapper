import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search } from "lucide-react";

const Interviews = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const interviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Developer",
      date: "2024-02-15",
      status: "Completed",
      notes: "Strong technical skills, good cultural fit",
    },
    {
      id: 2,
      candidate: "Sarah Williams",
      position: "Project Manager",
      date: "2024-02-16",
      status: "Scheduled",
      notes: "Experience in Agile methodologies",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interview History</h1>
          <Button className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Interview
          </Button>
        </div>

        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Search interviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <div className="space-y-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {interview.candidate}
                  </h3>
                  <p className="text-gray-600">{interview.position}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(interview.date).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        interview.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {interview.status}
                    </span>
                  </div>
                </div>
                <Textarea
                  className="mt-2 w-1/2"
                  placeholder="Add interview notes..."
                  defaultValue={interview.notes}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interviews;