import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rule from "./components/Rule/Rule";
import Game from "./components/Game/Game";
import EasyMode from "./components/Game/EasyMode";
import MediumMode from "./components/Game/MediumMode";
import HardMode from "./components/Game/HardMode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rule />} />
        <Route
          path="/game/easy"
          element={<Game rows={8} cols={8} mines={10} />}
        />
        <Route
          path="/game/medium"
          element={<Game rows={16} cols={16} mines={40} />}
        />
        <Route
          path="/game/hard"
          element={<Game rows={30} cols={16} mines={99} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
