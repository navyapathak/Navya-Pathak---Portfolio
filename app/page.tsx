export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-indigo-400 font-medium mb-4">
          AI/ML Engineer • Full Stack Developer
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Navya Pathak
        </h1>

        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          B.Tech Computer Science student passionate about
          Artificial Intelligence, Machine Learning,
          Generative AI, and Full Stack Development.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <button className="px-6 py-3 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition">
            View Projects
          </button>

          <button className="px-6 py-3 border border-indigo-500 rounded-xl hover:bg-indigo-500/10 transition">
            Download Resume
          </button>
        </div>
      </div>
    </main>
  );
}