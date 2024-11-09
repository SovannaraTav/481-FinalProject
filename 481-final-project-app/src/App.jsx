import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import Connections from "./pages/Connections";
import "./styles/global.css"
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import Profile from "./components/Profile";
import SignIn from "./pages/SignIn";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="connections" element={<Connections />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:name" element={<Profile />} />
        <Route path="signin" element={<SignIn />} /> 
      </Routes>     
      <Footer/>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);