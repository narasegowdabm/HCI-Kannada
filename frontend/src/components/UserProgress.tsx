import React, { useEffect, useState } from "react";

interface ProgressData {
  attempts: number;
  success: number;
}

const UserProgress: React.FC = () => {
  // State to hold progress data, stored as an object where key is the letter
  const [progress, setProgress] = useState<{ [letter: string]: ProgressData }>({});

  useEffect(() => {
    // Retrieve progress data from localStorage on mount
    const storedProgress = localStorage.getItem("progress");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Progress Dashboard</h2>
        {Object.keys(progress).length === 0 ? (
          <p className="text-center text-gray-600">No progress recorded. Start practicing!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Letter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Attempts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Success</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Accuracy (%)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(progress).map(([letter, data]) => {
                  const accuracy =
                    data.attempts > 0 ? ((data.success / data.attempts) * 100).toFixed(1) : "0";
                  return (
                    <tr key={letter} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-center">{letter}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">{data.attempts}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">{data.success}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">{accuracy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProgress;
