import { useNavigate } from "react-router-dom";
import "../../styles.css";
import "./DifficultiesHeader.css";

function DifficultiesHeader() {
  const navigate = useNavigate();
  return (
    <div className="DifficultiesBtnGroup">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
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
    </div>
  );
}

export default DifficultiesHeader;
