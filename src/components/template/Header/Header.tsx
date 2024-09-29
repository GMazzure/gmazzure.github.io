import React from "react";
import "./Header.css";

interface Props {}

export const Header = (props: Props) => {

  return (
    <div>
      <div className="header">
        <nav>
          <a href="">
            <span style={{ color: "var(--black)" }}>gmazzure</span>
            <span className="text-emerald-700">.dev</span>
          </a>
          <ul className="header-nav tracking-widest text-sm">
            <li className="menu-item">
              <a href="">ABOUT</a>
            </li>
            <li className="menu-item">
              <a href="">EXPERIENCE</a>
            </li>
            <li className="menu-item">
              <a href="">PROJECTS</a>
            </li>
            <li>
              <a className="text-neutral-100 active:text-neutral-100 lets-chat">
                <span className="px-4 rounded-full hover:rounded-lg tracking-tight bg-emerald-700 text-neutral-100 scroll-pt-3 p-2">
                  LET'S CHAT!
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="circle move-horizontal"></div>
    </div>
  );
};
