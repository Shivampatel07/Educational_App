import "./css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();

  function fun() {
    let menu = document.getElementById("menu-icon");
    let navbar = document.getElementsByClassName("navbar");
    menu.classList.toggle("bx-x");
    navbar[0].classList.toggle("open");
  }

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  useEffect(() => {
    if (user) {
      setUser(false);
    } else if (!user) {
      setUser(true);
    }
  }, []);
  async function logout() {
    await axios.get("/api/auth/logout").then((res) => {
      setIsLoggedIn(false);
    });
    await navigate("/login");
  }

  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Codenirvana" width="150%" />
          </Link>
        </div>
        <ul className="navbar">
          <li>
            <Link to="/practice">Practice</Link>
          </li>
          <li>
            <Link to="/quizlist">Quiz</Link>
          </li>
          <li>
            <Link to="/contactus">Contact</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/register">Log-in</Link>
            </li>
          )}
        </ul>
        <div className="main">
          <div className="bx bx-menu" id="menu-icon" onClick={fun}></div>
        </div>
      </nav>
    </>
  );
}

export default Header;
