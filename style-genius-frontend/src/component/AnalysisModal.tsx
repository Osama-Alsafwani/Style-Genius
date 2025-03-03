import { Dialog } from '@headlessui/react';

export default function AnalysisModal({ analysis, onClose }: {
  analysis: Analysis;
  onClose: () => void;
}) {
  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        
        <div className="relative bg-white rounded-lg max-w-2xl p-6">
          <img 
            src={analysis.imageUrl} 
            alt="Analysis" 
            className="w-full h-64 object-cover rounded"
          />
          <div className="mt-4 space-y-2">
            {analysis.predictions.map((pred: any, i: number)) => (
              <div key={i} className="flex justify-between">
                <span className="capitalize">{pred.className}</span>
                <span className="text-purple-600">
                  {(pred.probability * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    </Dialog>
  );
}