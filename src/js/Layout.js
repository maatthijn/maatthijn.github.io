import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import { useLoading } from "./contexts/LoadingContext";

export default function Layout() {
    const { isLoading } = useLoading();
    const location = useLocation();
    const navigate = useNavigate();
    const [isAnimating, setIsAnimating] = useState(false);
    const prevPathRef = useRef(location.pathname);
    const clickSound = useRef(null);
    const errorSound = useRef(null);

    useEffect(() => {
        const clickAudio = new Audio("/click.wav");
        const errorAudio = new Audio("/error.wav");
        clickAudio.preload = "auto";
        errorAudio.preload = "auto";
        clickSound.current = clickAudio;
        errorSound.current = errorAudio;
        const elements = document.querySelectorAll(".seq-anim");
        setIsAnimating(true);

        elements.forEach((el) => {
            el.classList.remove("fade-out");
            el.classList.remove("seq-anim-run");
            el.style.opacity = "0";
        });

        const delayFadeIn = async () => {
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];

                el.classList.add("seq-anim-run");
                el.classList.remove("seq-anim-run");
                el.style.opacity = "1"
                await new Promise((res) => setTimeout(res, 2000 / elements.length));
            }
            setIsAnimating(false);
        };

        delayFadeIn();
        prevPathRef.current = location.pathname;
    }, [location.pathname]);

    const handleNavClick = async (e, to) => {
        e.preventDefault();
        if (isAnimating || location.pathname === to) {
            if (errorSound.current) {
                errorSound.current.currentTime = 0;
                errorSound.current.play().catch(err => console.log("Sound error: ", err));
            }
            return
        };
        if (clickSound.current) {
            clickSound.current.currentTime = 0;
            clickSound.current.play().catch(err => console.log("Sound error: ", err));
        }
        setIsAnimating(true);

        const fromHome = location.pathname === "/";
        const toHome = to === "/";
        const shouldAnimateNavbar = fromHome || toHome;

        const elements = document.querySelectorAll(".seq-anim");
        for (let i = (elements.length - 1); i >= 0; i--) {
            const el = elements[i];
            if (el.classList.contains("main-nav") && !shouldAnimateNavbar) continue;
            el.classList.add("fade-out");
            el.style.opacity = "0";
            el.classList.remove("fade-out");
            await new Promise((res) => setTimeout(res, 1500 / elements.length));

        }
        prevPathRef.current = to;
        navigate(to);
    };

    return (
        <>
            {!isLoading &&
                <>
                    <Navbar handleNavClick={handleNavClick} />
                    <MobileNavbar handleNavClick={handleNavClick} />
                </>
            }
            {isAnimating && <div className="interaction-blocker"></div>}
            <Outlet context={{ handleNavClick }} />
        </>
    );
}
