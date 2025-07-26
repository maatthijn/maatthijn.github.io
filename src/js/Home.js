import { Link, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import "../css/Home.css";

function Home() {
    const { handleNavClick } = useOutletContext();
    useEffect(() => {
        document.title = "HAFIDH MAULANA MATIN";
    });

    return (
        <>
            <div id="home-content" className="page-root d-flex flex-column min-vh-100 min-vw-100 justify-content-center align-items-center seq-anim">
                <h1 id="my-name" className="display-4 text-uppercase seq-anim">Hafidh Maulana Matin</h1>
                <p className="display-6 seq-anim" id="salut" translate="yes">Welcome to Matthijn's Portfolio</p>
                <div className="row text-center text-uppercase home-option seq-anim">
                    <Link to="/galleries" className="col-lg-3 home-link" onClick={(e) => handleNavClick(e, "/galleries")}>GALLERIES</Link>
                    <Link to="/blog" className="col-lg-3 home-link" onClick={(e) => handleNavClick(e, "/blog")}>BLOG</Link>
                    <Link to="/about" className="col-lg-3 home-link" onClick={(e) => handleNavClick(e, "/about")}>ABOUT</Link>
                    <Link to="/contact" className="col-lg-3 home-link" onClick={(e) => handleNavClick(e, "/contact")}>CONTACT</Link>
                </div>
            </div>
        </>
    )
}

export default Home;