import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useAuthStore } from "../lib/store/authStore";
import { useMutation } from "@tanstack/react-query";

export default function AnalysisPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const { token } = useAuthStore();

  const {
    mutate: analyzeImage,
    data,
    isPending,
  } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Analysis failed");
      return response.json();
    },
  });

  const navigate = useNavigate();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      analyzeImage(file);
    },
  });
  // useEffect(() => {
  //   if (preview) {
  //     URL.revokeObjectURL(preview);
  //   }
  // }, [preview]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Analyze Your Style</h1>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Back to Dashboard
      </button>
      {/* DropZone */}
      <div className="mb-8 space-y-6">
        <div
          className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer h-96 flex items-center justify-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-full mx-auto" />
          ) : (
            <p className="text-gray-500">Drag & drop outfit photo here</p>
          )}
        </div>

        {isPending && <p className="text-center">Analyzing your style...</p>}

        {data?.predictions && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
            <div className="space-y-3">
              {data.predictions.map((pred: any, i: number) => (
                // Remove curly braces and semicolon here
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-700">{pred.className}</span>
                  <span className="text-purple-600 font-medium">
                    {(pred.probability * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
