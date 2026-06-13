export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-white">
          Navya<span className="text-indigo-400">.</span>
        </h1>

        <ul className="hidden md:flex gap-8 text-slate-300">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

      </div>
    </nav>
  );
}