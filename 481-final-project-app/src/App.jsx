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
import SignUp from "./pages/SignUp";
import EnterInfo from "./pages/EnterInfo";
import Messaging from "./pages/Messaging";


export default function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="home" element={<Home />} />
        <Route path="messaging" element={<Messaging />} />
        <Route path="connections" element={<Connections />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="enterinfo" element = {<EnterInfo />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);