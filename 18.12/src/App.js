import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import PostPage from "./pages/PostPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
  );
}

export default App;
