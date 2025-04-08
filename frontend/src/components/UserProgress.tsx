import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface ProgressData {
  attempts: number;
  success: number;
}

const UserProgress: React.FC = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<string, ProgressData>>({});

  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/auth/progress/${user._id}`)
      .then((res) => res.json())
      .then((data) => setProgress(data.progress || {}))
      .catch(console.error);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Progress Dashboard</h2>
        {Object.keys(progress).length === 0 ? (
          <p className="text-center text-gray-600">No progress recorded.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500">
              <tr>
                <th className="px-6 py-3 text-white">Letter</th>
                <th className="px-6 py-3 text-white">Attempts</th>
                <th className="px-6 py-3 text-white">Success</th>
                <th className="px-6 py-3 text-white">Accuracy (%)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(progress).map(([letter, d]) => {
                const acc = d.attempts ? ((d.success / d.attempts) * 100).toFixed(1) : "0";
                return (
                  <tr key={letter} className="hover:bg-gray-50 text-center">
                    <td className="px-6 py-4">{letter}</td>
                    <td className="px-6 py-4">{d.attempts}</td>
                    <td className="px-6 py-4">{d.success}</td>
                    <td className="px-6 py-4">{acc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserProgress;
