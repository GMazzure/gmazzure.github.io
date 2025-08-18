import "./Header.css";

import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="header">
        <div className="container mx-auto px-4">
          <nav>
            <a href="">
              <span style={{ color: "var(--black)" }}>gmazzure</span>
              <span className="text-emerald-700">.dev</span>
            </a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`w-6 h-0.5 bg-neutral-800 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-neutral-800 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-neutral-800 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
            
            {/* Desktop menu */}
            <ul className="header-nav tracking-widest text-xs hidden md:flex">
              <li className="menu-item">
                <a href="#about-me">ABOUT</a>
              </li>
              <li className="menu-item">
                <a href="#projects">PROJECTS</a>
              </li>
              <li className="menu-item">
                <a href="#experience">EXPERIENCE</a>
              </li>
              <li>
                <a className="text-neutral-100 active:text-neutral-100 lets-chat" href="#contact">
                  <span className="px-4 rounded-full tracking-tight bg-emerald-700 text-neutral-100 scroll-pt-3 p-2">
                    LET'S CHAT!
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
              <ul className="flex flex-col p-4 gap-4">
                <li><a href="#about-me" className="block py-2 text-neutral-800 font-medium" onClick={() => setIsMenuOpen(false)}>ABOUT</a></li>
                <li><a href="#projects" className="block py-2 text-neutral-800 font-medium" onClick={() => setIsMenuOpen(false)}>PROJECTS</a></li>
                <li><a href="#experience" className="block py-2 text-neutral-800 font-medium" onClick={() => setIsMenuOpen(false)}>EXPERIENCE</a></li>
                <li>
                  <a href="#contact" className="block" onClick={() => setIsMenuOpen(false)}>
                    <span className="inline-block px-4 py-2 rounded-full bg-emerald-700 text-white text-sm font-medium">
                      LET'S CHAT!
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="circle move-horizontal"></div>
    </>
  );
};
