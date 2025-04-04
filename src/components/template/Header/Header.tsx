import "./Header.css";

export const Header = () => {

  return (
    <>
      <div className="header">
        <nav style={{marginTop: '-6px'}}>
          <a href="">
            <span style={{ color: "var(--black)" }}>gmazzure</span>
            <span className="text-emerald-700">.dev</span>
          </a>
          <ul className="header-nav tracking-widest text-xs">
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
      </div>
      <div className="circle move-horizontal"></div>
    </>
  );
};
