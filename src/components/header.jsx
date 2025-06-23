export default function Header() {
  return (
    <header className="w-full font-hind text-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
        {/* <div className="flex justify-between items-center backdrop-blur-md bg-white/10 border border-white/30 shadow-lg p-4 w-full max-w-xl rounded-"> */}
        <div>
          <h1>
            <span className="text-5xl font-bold font-ekl tracking-wide">eclipse</span>
          </h1>
          {/* <nav className="space-x-6 text-sm font-medium">
            <a href="#join" className="hover:text-white/80 transition-colors">
              Join
            </a>
            <a href="#team" className="hover:text-white/80 transition-colors">
              Team
            </a>
            <a href="#contact" className="hover:text-white/80 transition-colors">
              Contact
            </a>
          </nav> */}
        </div>
      </div>
    </header>
  );
}