import "../css/Galleries.css";
import { useEffect, useState, useRef } from "react";
import images from "./galleries.json";

export default function Galleries() {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadeInActive, setIsFadeInActive] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState("");
    const [disableClicks, setDisableClicks] = useState(false);
    const modalRef = useRef(null);
    const bodyRef = useRef(null);

    const handleImageClick = (src) => {
        setModalImageSrc(src);
        setModalVisible(true);
        setDisableClicks(true);
        setIsFadingOut(false);

        setTimeout(() => {
            setIsFadeInActive(true);
        }, 1);
    };

    const closeModal = () => {
        setIsFadingOut(true);
        setIsFadeInActive(false);
        setTimeout(() => {
            setModalVisible(false);
            setDisableClicks(false);
        }, 600);
    };

    /*
    const images = [
        "/galleries/image (1).webp",
        "/galleries/image (2).webp",
        "/galleries/image (3).webp",
        "/galleries/image (4).webp",
        "/galleries/image (5).webp",
        "/galleries/image (6).webp",
        "/galleries/image (7).webp",
        "/galleries/image (8).webp",
        "/galleries/image (9).webp",
        "/galleries/image (10).webp",
        "/galleries/image (11).webp",
        "/galleries/image (12).webp",
        "/galleries/image (13).webp",
        "/galleries/image (14).webp",
        "/galleries/image (15).webp",
        "/galleries/image (16).webp",
        "/galleries/image (17).webp",
        "/galleries/image (18).webp",
        "/galleries/image (19).webp",
    ];
    */

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const timeout = setTimeout(() => {
            const targets = document.querySelectorAll(".img-image");
            targets.forEach((img) => observer.observe(img));
        }, 100);

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (modalVisible) {
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.paddingRight = "15px";
        } else {
            document.documentElement.style.overflow = "";
            document.documentElement.style.paddingRight = "0";
        }

        // Optional cleanup if component unmounts
        return () => {
            document.documentElement.style.overflow = "";
            document.documentElement.style.paddingRight = "0";
        };
    }, [modalVisible]);

    const vwToPx = (vw) => (vw / 100) * window.innerWidth;
    const totalPadding = `${vwToPx(5) + 15}px`;

    return (
        <>
            <div
                id="galleries-content"
                className={"page-root contents min-vh-100 min-vw-50 justify-content-center align-items-center d-flex flex-column seq-anim"}
                translate="yes"
                ref={bodyRef}
                style={{ paddingRight: modalVisible ? totalPadding : "5vw" }}
            >
                <h1 className="display-4 text-uppercase seq-anim">Galleries</h1>
                <p id="galleries-main-desc" className=" seq-anim">
                    Here you can view all of my best works. Enjoy my photographies!
                </p>
                <div className="masonry seq-anim">
                    {images.map((src, index) => (
                        <div key={index} className="img-hover-zoom">
                            <img
                                key={index}
                                src={src}
                                alt={`img-${index}`}
                                loading="eager"
                                className="shadow-1-strong rounded mb-4 img-image"
                                style={{
                                    pointerEvents: disableClicks ? "none" : "auto",
                                }}
                                onClick={() => { handleImageClick(src) }}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalVisible && (
                <div
                    ref={modalRef}
                    className={`modal custom-modal ${isFadingOut ? "fade-out-galleries" : isFadeInActive? "fade-in-galleries" : ""}`}
                >
                    <span className="close" id="image-close" onClick={closeModal}>
                        &times;
                    </span>
                    <img
                        style={{ pointerEvents: "none" }}
                        src={modalImageSrc}
                        alt=""
                        className="modal-image"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            )}
        </>
    );
}
