import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rule from "./components/Rule/Rule";
import Game from "./components/Game/Game";
import { GameProvider } from "./GameContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rule />} />
        <Route
          path="/game/easy"
          element={
            <GameProvider key="easy" size={8} mines={10}>
              <Game />
            </GameProvider>
          }
        />
        <Route
          path="/game/medium"
          element={
            <GameProvider key="medium" size={16} mines={40}>
              <Game />
            </GameProvider>
          }
        />
        <Route
          path="/game/hard"
          element={
            <GameProvider key="hard" size={30} mines={99}>
              <Game />
            </GameProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
