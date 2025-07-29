import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../css/MobileNavbar.css";

function MobileNavbar({ handleNavClick }) {
    const enterSound = useRef(null);
    const exitSound = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    useEffect(() => {
        const enterAudio = new Audio("/enter.wav");
        enterAudio.preload = "auto";
        enterSound.current = enterAudio;
        const exitAudio = new Audio("/exit.wav");
        exitAudio.preload = "auto";
        exitSound.current = exitAudio;
    })

    const toggleMenu = () => {
        if (enterSound.current) {
            enterSound.current.currentTime = 0;
            enterSound.current.play().catch(err => console.log("Sound error: ", err));
        }
        setIsMenuOpen(true);
        setModalVisible(true);
        document.documentElement.style.overflow = "hidden";
    };

    const closeMenu = () => {
        if (exitSound.current) {
            exitSound.current.currentTime = 0;
            exitSound.current.play().catch(err => console.log("Sound error: ", err));
        }
        setModalVisible(false);
        document.documentElement.style.overflow = "";
        setTimeout(() => {
            setIsMenuOpen(false);
        }, 600);
    };

    const handleClick = (e, path) => {
        closeMenu();
        handleNavClick(e, path);
    };

    return (
        <>
            {!isHomePage && (
                <nav
                    id="mobile-nav"
                    className="main-nav nav row text-center justify-content-between sticky-top seq-anim"
                >
                    <Link id="brand" className="col-sm-10" to="/" onClick={(e) => handleClick(e, "/")}>
                        Matthijn
                    </Link>
                    <Link id="mobile-menu-toggle" className="col-sm-2" onClick={toggleMenu}>
                        <i className="bi bi-three-dots-vertical"></i>
                    </Link>
                </nav>
            )}

            {isMenuOpen && (
                <div
                    id="mobile-menu-modal"
                    className={`modal seq-anim ${modalVisible ? "fade-in-mobile-modal" : "fade-out-mobile-modal"}`}
                >
                    <span className="close" id="mobile-menu-close" onClick={closeMenu}>
                        &times;
                    </span>
                    <Link className="nav-option mobile-modal-content" to="/galleries" onClick={(e) => handleClick(e, "/galleries")}>
                        Galleries
                    </Link>
                    <Link className="nav-option mobile-modal-content" to="/blog" onClick={(e) => handleClick(e, "/blog")}>
                        Blog
                    </Link>
                    <Link className="nav-option mobile-modal-content" to="/about" onClick={(e) => handleClick(e, "/about")}>
                        About
                    </Link>
                    <Link className="nav-option mobile-modal-content" to="/contact" onClick={(e) => handleClick(e, "/contact")}>
                        Contact
                    </Link>
                </div>
            )}
        </>
    );
}

export default MobileNavbar;
