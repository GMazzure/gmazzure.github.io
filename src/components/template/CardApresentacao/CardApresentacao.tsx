import "./CardApresentacao.css";

type Props = {};
import devPhoto from "../../../assets/leaf.avif";
import linkedinIcon from "../../../assets/icons/linkedin-leaf.svg"
import githubIcon from "../../../assets/icons/github-leaf.png"

export default function CardApresentacao({}: Props) {
  return (
    <div className="cardLayout">
      <div id="about">
        <div className="devPhoto" />
        <div style={{ width: "49%", color: "white" }}>
          <h4 style={{ color: "var(--leaf)", margin: "0" }}>About me</h4>
          <h2
            style={{
              fontFamily: "UbuntuBold",
              fontSize: "2em",
              margin: "20px 0 16px 0",
            }}
          >
            Gustavo Mazzure
          </h2>
          <h3 style={{ color: "#ddd", fontSize: "1.3em", margin: "0" }}>
            FullStack Web Developer
          </h3>
          <p style={{ color: "#999", fontSize: "1.2em", marginTop: "1.5em" }}>
            My name is Gustavo Mazzure, or simply "gmazzure", Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nunc vitae neque malesuada mi
            feugiat rhoncus. Praesent vestibulum at felis vitae fermentum. Donec
            condimentum placerat auctor. Proin ut ornare nulla, sit amet cursus
            neque
          </p>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "1em 0 0 0",
              marginBottom: "0",
              listStyle: "none",
            }}
          >
            <a href="">
              <li>
                <img src={linkedinIcon} alt="" width="32" />
              </li>
            </a>
            <a href="">
              <li>
                <img src={githubIcon} alt="" width="32" />
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}
