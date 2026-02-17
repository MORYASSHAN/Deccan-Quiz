import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyles.js";
import { Award, LogIn, LogOut, Menu, X } from "lucide-react";

const Navbar = ({ logoSrc }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check login status + listen for auth changes
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoggedIn(!!token);

    const handler = (ev) => {
      const detailUser = ev?.detail?.user ?? null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoggedIn(!!detailUser);
    };
    window.addEventListener("authChanged", handler);

    return () => window.removeEventListener("authChanged", handler);
  }, []);

  // Logout function
  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
    } catch (e) {
      console.warn(e);
    }

    window.dispatchEvent(
      new CustomEvent("authChanged", { detail: { user: null, token: null } })
    );

    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className={navbarStyles.nav}>
      <div
        style={{ backgroundImage: navbarStyles.decorativePatternBackground }}
        className={navbarStyles.decorativePattern}
      ></div>

      <div className={navbarStyles.bubbel}></div>
      <div className={navbarStyles.bubbe2}></div>
      <div className={navbarStyles.bubbe3}></div>

      <div className={navbarStyles.container}>
        {/* Logo */}
        <div className={navbarStyles.logoContainer}>
          <Link to="/" className={navbarStyles.logoButton}>
            <div className={navbarStyles.logoInner}>
              <img
                src={
                  logoSrc ||
                  "https://yt3.googleusercontent.com/eD5QJD-9uS--ekQcA-kDTCu1ZO4d7d7BTKLIVH-EySZtDVw3JZcc-bHHDOMvxys92F7rD8Kgfg=s900-c-k-c0x00ffffff-no-rj"
                }
                alt="QuizMaster logo"
                className={navbarStyles.logoImage}
              />
            </div>
          </Link>
        </div>

        {/* Title */}
        <div className={navbarStyles.titleContainer}>
          <div className={navbarStyles.titleBackground}>
            <h1 className={navbarStyles.titleText}>Deccan Quiz Application</h1>
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className={navbarStyles.desktopButtonsContainer}>
          <div className={navbarStyles.spacer}>
            <NavLink to="/" className={navbarStyles.resultsButton}>
              <Award className={navbarStyles.buttonIcon} />
              Home
            </NavLink>

            {loggedIn ? (
              <button onClick={handleLogout} className={navbarStyles.logoutButton}>
                <LogOut className={navbarStyles.buttonIcon} />
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={navbarStyles.loginButton}>
                <LogIn className={navbarStyles.buttonIcon} />
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className={navbarStyles.menuToggleButton}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className={navbarStyles.menuIcon} />
            ) : (
              <Menu className={navbarStyles.menuIcon} />
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <div className={navbarStyles.mobileMenuPanel}>
            <ul className={navbarStyles.mobileMenuList}>
              <li>
                <NavLink
                  to="/"
                  className={navbarStyles.mobileMenuItem}
                  onClick={() => setMenuOpen(false)}
                >
                  <Award className={navbarStyles.mobileMenuIcon} />
                  Home
                </NavLink>
              </li>
              <li>
                {loggedIn ? (
                  <button
                    onClick={handleLogout}
                    className={navbarStyles.mobileMenuItem}
                  >
                    <LogOut className={navbarStyles.mobileMenuIcon} />
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className={navbarStyles.mobileMenuItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <LogIn className={navbarStyles.mobileMenuIcon} />
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
      {navbarStyles.animations && <style>{navbarStyles.animations}</style>}
    </nav>
  );
};

export default Navbar;
