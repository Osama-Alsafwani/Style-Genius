import { useState } from "react";
import Spinner from "../component/Spinner";
import { useAuthStore } from "../lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import AnalysisModal, { Analysis } from "../component/AnalysisModal";

export default function DashboardPage() {
  const { user, logout, token } = useAuthStore();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });

  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Welcomming */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}!</h1>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      {/* Analysis History */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Your Style Profile</h2>
        {userData?.analyses?.length === 0 ? (
          <p className="text-gray-500 text-center">No analyses yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {userData?.analyses?.map((analysis: Analysis) => (
              <div
                key={analysis.date}
                onClick={() => setSelectedAnalysis(analysis)}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${
                    analysis.imageUrl
                  }`}
                  alt="Analysis"
                  className="w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-medium mb-2">
                    {new Date(analysis.date).toLocaleDateString()}
                  </h3>
                  <div className="space-y-1">
                    {analysis.predictions.slice(0, 3).map((pred, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="capitalize">{pred.className}</span>
                        <span className="text-purple-600">
                          {(pred.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedAnalysis && (
        <AnalysisModal
          analysis={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
        />
      )}
    </div>
  );
}
