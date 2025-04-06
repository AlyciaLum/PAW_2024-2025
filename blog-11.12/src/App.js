import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import "./styles/main.scss";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
  );
}

export default App;
