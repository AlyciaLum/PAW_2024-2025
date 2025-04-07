import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/post">Post</Link>
            <Link to="/categories">Kategorie</Link>
        </nav>
    );
}
