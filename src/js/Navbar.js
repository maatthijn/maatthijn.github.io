import { Link, useLocation } from "react-router-dom";

import "../css/Navbar.css"
// I just learn that better put Bootstrap on individual .css than drop it directly to JS file

function Navbar({ handleNavClick }) {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            {!isHomePage &&
                <nav id="desktop-nav"
                className="main-nav nav row min-vw-50 text-center justify-content-center sticky-top seq-anim">
                    <Link to="/galleries" className="col-lg-2 nav-option" onClick={(e) => handleNavClick(e, "/galleries")}>Galleries</Link>
                    <Link to="/blog" className="col-lg-2 nav-option" onClick={(e) => handleNavClick(e, "/blog")}>Blog</Link>
                    <Link to="/" id="brand" className="col-lg-4" onClick={(e) => handleNavClick(e, "/")}>Matthijn</Link>
                    <Link to="/about" className="col-lg-2 nav-option" onClick={(e) => handleNavClick(e, "/about")}>About</Link>
                    <Link to="/contact" className="col-lg-2 nav-option" onClick={(e) => handleNavClick(e, "/contact")}>Contact</Link>
                </nav>
            }
        </>
    );
}

export default Navbar;
