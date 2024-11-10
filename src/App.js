import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rule from "./components/Rule/Rule";
import EasyMode from "./components/Game/EasyMode";
import MediumMode from "./components/Game/MediumMode";
import HardMode from "./components/Game/HardMode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rule />} />
        <Route path="/game/easy" element={<EasyMode />} />
        <Route path="/game/medium" element={<MediumMode />} />
        <Route path="/game/hard" element={<HardMode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
