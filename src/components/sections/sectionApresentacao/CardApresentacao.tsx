import "./CardApresentacao.css";
import { interval } from "rxjs";

import { useState, useEffect } from "react";

type Props = {};
// import devPhoto from "../../../assets/leaf.avif";
import linkedinIcon from "../../../assets/icons/linkedin-leaf.svg";
import githubIcon from "../../../assets/icons/github-white.png";

export default function CardApresentacao({}: Props) {
  const [currentText, setCurrentText] = useState(0);
  const observable$ = interval(2500);

  useEffect(() => {
    const subscription = observable$.subscribe(() =>
      setCurrentText((curState: number) => (curState < 4 ? curState + 1 : 0))
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className="cardLayout p-8">
      <div id="about" className="justify-evenly">
        <div className="devPhoto max-w-md floating-animation" />
       
        <div className="aboutMe max-w-2xl">
          <p className="text-neutral-800 mt-0 -mb-1 font-medium text-2xl">
            Gustavo Mazzure
          </p>

          <div className="words-wrapper text-neutral-500 mt-0 text-xs size tracking-widest">
            <p
              className={
                "slide " + (currentText != 0 ? "is-hidden" : "is-visible")
              }
            >
              FULL STACK DEVELOPER
            </p>

            <p
              className={
                " slide " + (currentText != 1 ? "is-hidden" : "is-visible")
              }
            >
              SYSTEM ARCHITECT
            </p>

            <p
              className={
                " slide " + (currentText != 2 ? "is-hidden" : "is-visible")
              }
            >
              SOFTWARE ENGINEER
            </p>

            <p
              className={
                " slide " + (currentText != 3 ? "is-hidden" : "is-visible")
              }
            >
              TECH LEADER
            </p>

            <p
              className={
                " slide " + (currentText != 4 ? "is-hidden" : "is-visible")
              }
            >
              HUMAN
            </p>
          </div>

          <p className="text-emerald-700 mt-4 mb-1 font-medium text-lg border-emerald-700 border-b-2 min-w-56 w-1/4">
            About me
          </p>

          <p className="text-neutral-500 text-base font-regular">
            Hello there! I've been {/* <s>creating</s> <b>fixing</b>  */}
            tailoring solutions since 2017. I built, trained, managed, grown and
            led development teams of 2 to 7 people. I've worked on many projects, designed and
            implemented databases and integrated with multiple APIs thus far. I
            am a lifelong learner and a problem solver.
          </p>

          <ul
            className="mt-8"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "0",
              listStyle: "none",
            }}
          >
            <a href="">
              <li>
                <img src={linkedinIcon} alt="" width="26" />
              </li>
            </a>
            <a href="">
              <li>
                <img src={githubIcon} alt="" width="26" />
              </li>
            </a>
          </ul>
        </div>
      </div>
    </section>
  );
}
