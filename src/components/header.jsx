export default function Header() {
  return (
    <header className="w-full font-hind text-white relative top-0 left-0 z-50 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
        <div className="flex items-baseline flex-row space-x-2">
          <img
            src="/eclipse_logo_white.png"
            alt="Eclipse logo"
            className="h-8 translate-y-1 w-auto"
          />
          <div className="flex flex-col items-start">
          <span className="text-5xl font-bold font-ekl tracking-wide">
            eclipse
          </span>
          </div>
          
        </div>
      </div>
    </header>
  );
}