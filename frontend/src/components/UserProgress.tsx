import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navigation from "./Navigation";
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ProgressData {
  attempts: number;
  success: number;
}

const TOTAL_LETTERS = 49;
const TOP_N = 5;

const UserProgress: React.FC = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<string, ProgressData>>({});

  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/auth/progress/${user._id}`)
      .then(res => res.json())
      .then(data => setProgress(data.progress || {}))
      .catch(console.error);
  }, [user]);

  // build stats array
  const stats = Object.entries(progress).map(([letter, { attempts, success }]) => {
    const wrong = attempts - success;
    const accuracy = attempts > 0 ? (success / attempts) * 100 : 0;
    return { letter, attempts, success, wrong, accuracy };
  });

  const completedCount = stats.filter(s => s.success > 0).length;
  const overallPercent = Math.round((completedCount / TOTAL_LETTERS) * 100);

  const needsPractice = stats
    .filter(s => s.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, TOP_N);

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Overall Progress Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ChartBarIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-800">Overall Progress</h2>
            </div>
            <p className="text-gray-600 mb-2">
              {completedCount} of {TOTAL_LETTERS} letters completed
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 bg-gradient-to-r from-kid-blue to-kid-purple"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <p className="mt-2 text-right text-sm font-medium text-gray-700">
              {overallPercent}%
            </p>
          </div>

          {/* Needs Practice */}
          {needsPractice.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl font-semibold text-gray-800">Needs Practice</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {needsPractice.map(({ letter, wrong, accuracy }) => (
                  <div
                    key={letter}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col items-center"
                  >
                    <span className="text-4xl font-bold mb-2">{letter}</span>
                    <span className="text-sm text-red-700 font-semibold">
                      {wrong} wrong
                    </span>
                    <span className="text-xs text-gray-600">
                      {accuracy.toFixed(0)}% accuracy
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Letter-by-Letter Stats Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Letter-by-Letter Stats
            </h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-100">
                  <th className="px-4 py-2 text-left text-gray-700">Letter</th>
                  <th className="px-4 py-2 text-right text-gray-700">Attempts</th>
                  <th className="px-4 py-2 text-right text-gray-700">Correct</th>
                  <th className="px-4 py-2 text-right text-gray-700">Wrong</th>
                  <th className="px-4 py-2 text-right text-gray-700">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {stats.map(({ letter, attempts, success, wrong, accuracy }, idx) => (
                  <tr
                    key={letter}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-left text-lg font-medium text-gray-800">
                      {letter}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">{attempts}</td>
                    <td className="px-4 py-3 text-right text-green-600">{success}</td>
                    <td className="px-4 py-3 text-right text-red-600">{wrong}</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {accuracy.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProgress;
