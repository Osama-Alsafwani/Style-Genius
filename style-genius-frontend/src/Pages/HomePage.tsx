import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
      <nav className="p-6 flex justify-between items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-white"
        >
          StyleGenius
        </motion.span>

        <button
          onClick={() => window.open("/auth", "_blank")}
          className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-lg 
             text-white hover:bg-white/20 transition-all"
        >
          Get Started
        </button>
      </nav>

      <main className="container mx-auto px-4 mt-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            Your AI Fashion Companion
          </h1>
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            Discover your unique style through AI-powered analysis and get
            personalized recommendations that evolve with your taste.
          </p>

          <div className="flex justify-center gap-4 flex-col md:flex-row">
            <button
              onClick={() => navigate("/analysis")}
              className="px-8 py-4 bg-purple-600 text-white rounded-xl
                       hover:bg-purple-700 transition-colors text-lg"
            >
              Analyze Your Style
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
