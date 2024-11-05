import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import Connections from "./pages/Connections";
import Profile from "./pages/Profile";
import "./styles/global.css"
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="connections" element={<Connections />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);