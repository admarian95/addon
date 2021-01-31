import { Link } from "react-router-dom";
import './Header.css'
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Main</Link>
            <div className="collapse navbar-collapse" style={{ display:'flex',flexBasis:'auto'}}id="navbarNav">
                <ul className="navbar-nav" style={{flexDirection:'row'}}>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/register">Register User </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/getPosts">Show All Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/addPost">Add Post</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;