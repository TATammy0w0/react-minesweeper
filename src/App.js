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
            <GameProvider
              key="easy"
              rows={8}
              cols={8}
              mines={10}
              difficulty="easy"
            >
              <Game />
            </GameProvider>
          }
        />
        <Route
          path="/game/medium"
          element={
            <GameProvider
              key="medium"
              rows={16}
              cols={16}
              mines={40}
              difficulty="medium"
            >
              <Game />
            </GameProvider>
          }
        />
        <Route
          path="/game/hard"
          element={
            <GameProvider
              key="hard"
              rows={30}
              cols={16}
              mines={99}
              difficulty="hard"
            >
              <Game />
            </GameProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
