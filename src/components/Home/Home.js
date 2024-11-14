import logo from "../../assets/mine-logo.svg";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Minesweeper</h1>
        <div className="home-button-group">
          <button
            className="home-button"
            onClick={() => {
              navigate("/game/easy");
            }}
          >
            Easy
          </button>
          <button
            className="home-button"
            onClick={() => {
              navigate("/game/medium");
            }}
          >
            Medium
          </button>
          <button
            className="home-button"
            onClick={() => {
              navigate("/game/hard");
            }}
          >
            Hard
          </button>
          <button
            className="home-button"
            onClick={() => {
              navigate("/rules");
            }}
          >
            Rules
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
