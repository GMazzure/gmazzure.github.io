import React from 'react'
import "./Header.css";

interface Props {
    
}

export const Header = (props: Props) => {
    return (
      <div>
        <div className="header">
          <nav>
            <a href="">
              <span style={{ color: "var(--white)" }}>gmazzure.</span>
              <span style={{ color: "var(--leaf)" }}>dev</span>
            </a>
            <ul className="header-nav">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Experience</a>
              </li>
              <li>
                <a href="">Posts</a>
              </li>
              <li style={{ paddingLeft: "1.3em" }}>
                <a style={{ fontSize: "27px" }} href="/en/">
                  🇺🇸
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
}
