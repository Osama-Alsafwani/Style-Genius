import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";

export interface Analysis {
  imageUrl: string;
  predictions: {
    className: string;
    probability: number;
  }[];
  date: string;
}

export default function AnalysisModal({
  analysis,
  onClose,
}: {
  analysis: Analysis;
  onClose: () => void;
}) {
  return (
    <Transition show={true} as={Fragment}>
      <Dialog open={true} onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>
        {/* Modal Content */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${analysis.imageUrl}`}
                alt="Analysis Preview"
                className="h-64 w-full object-cover rounded-t-lg"
              />
              {/* Move predictions and close button inside DialogPanel */}
              <div className="space-y-2 mt-4">
                {analysis.predictions.slice(0, 3).map((pred, i) => (
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
                className="p-2 absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
