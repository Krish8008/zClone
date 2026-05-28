import { Route, Routes } from "react-router-dom";

import Login from "./landing_page/login/login";
import Signup from "./landing_page/signup/Signup";
import Hero from "./landing_page/home/Hero";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;