import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./frontend/pages/Home";
import Post from "./frontend/pages/Post";
import Categories from "./frontend/pages/Categories";
import Navbar from "./frontend/components/Navbar";
import "./frontend/styles/main.scss";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
  );
}

export default App;
