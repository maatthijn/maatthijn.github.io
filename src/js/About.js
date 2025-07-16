import { Link, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../css/About.css";

function About() {
    const { handleNavClick } = useOutletContext();
    useEffect(() => {document.title = "About | HAFIDH MAULANA MATIN"});

    return (
        <>
            <div id="about-content" className="page-root contents min-vh-100 min-vw-50 justify-content-center align-items-center d-flex flex-column seq-anim" translate="yes">
                <p className="about-p seq-anim">
                    Hi! I'm <span className="pinky">Hafidh</span>, a multidisciplinary creator with a passion for building things — from
                    intuitive websites to beautiful photographs. I'm currently diving deep into <span className="pinky">web
                        development, book writer, data analysis, and photography</span>. With a background in <span className="pinky">microbiology</span>, I bring
                    a unique mix of analytical thinking and creative vision to everything I do.
                </p>
                <p className="about-p seq-anim">
                    My creative work revolves around <span className="pinky">visual</span> and <span className="pinky">literal storytelling</span>. I love capturing landscape photos with
                    my camera and turning it into delightful images through photo-editing process with Lightroom. I also
                    love writing my own story, thus I'm planning of creating my own book.
                </p>
                <p className="about-p seq-anim">
                    Besides of my creative world, I studied <span className="pinky">Life Science</span> at Institut Teknologi Bandung, where I honed my skills
                    in <span className="pinky">research, leadership, and data analysis</span>. I also enhance my data analysis skill by learning <span className="pinky">advanced programming</span>.
                    While I've shifted gears professionally, my academic background still informs the way I think and work —
                    <span className="pinky">methodolical, curious, and always learning</span>.
                </p>
                <div className="justify-content-center align-items-center d-flex flex-column">
                    <p className=" seq-anim">Take a trip to see my creative works!</p>
                    <ul className="nav justify-content-center content-nav">
                        <li className="nav-item seq-anim">
                            <Link to="/galleries" className="nav-link" onClick={(e) => handleNavClick(e, "/galleries")}>Galleries</Link>
                        </li>
                        <li className="nav-item seq-anim">
                            <Link to="/blog" className="nav-link" onClick={(e) => handleNavClick(e, "/blog")}>Blog</Link>
                        </li>
                    </ul>
                    <ul className="nav justify-content-center icon-nav">
                        <li className="nav-item seq-anim">
                            <Link to="https://www.instagram.com/maatthijn" className="nav-link" target="_blank">
                                <i className="bi bi-instagram"></i>
                            </Link>
                        </li>
                        <li className="nav-item seq-anim">
                            <Link to="https://www.facebook.com/maulana.m.hambali" className="nav-link" target="_blank">
                                <i className="bi bi-facebook"></i>
                            </Link>
                        </li>
                        <li className="nav-item seq-anim">
                            <Link to="https://www.linkedin.com/in/hafidh-maulana-matin/" className="nav-link" target="_blank">
                                <i className="bi bi-linkedin"></i>
                            </Link>
                        </li>
                        <li className="nav-item seq-anim">
                            <Link to="https://github.com/maatthijn/" className="nav-link" target="_blank">
                                <i className="bi bi-github"></i>
                            </Link>
                        </li>
                        <li className="nav-item seq-anim">
                            <Link to="https://haveetzmatthijn.medium.com/" className="nav-link" target="_blank">
                                <i className="bi bi-medium"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default About;