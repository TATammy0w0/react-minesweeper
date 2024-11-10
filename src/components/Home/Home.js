import logo from "../../logo.svg";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Minesweeper</h1>
        <button
          onClick={() => {
            navigate("/game/easy");
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            navigate("/game/medium");
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            navigate("/game/hard");
          }}
        >
          Hard
        </button>
        <button
          onClick={() => {
            navigate("/rules");
          }}
        >
          Rules
        </button>
        <p>Made with React.js by Wenjing Ma</p>
      </header>
    </div>
  );
}

export default Home;
