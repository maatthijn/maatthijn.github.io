import "../css/Galleries.css";
import { useEffect, useState, useRef } from "react";
import { useLoading } from "./contexts/LoadingContext";
import LoadingScreen from "./LoadingScreen";

export default function Galleries() {
    const { isLoading, setIsLoading } = useLoading();
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadeInActive, setIsFadeInActive] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState("");
    const [images, setImages] = useState([]);
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

    //    useEffect(() => {
    //        if (images.length === 0) return;
    //
    //        const observer = new IntersectionObserver(
    //            (entries) => {
    //                entries.forEach((entry) => {
    //                    if (entry.isIntersecting) {
    //                        entry.target.classList.add("visible");
    //                        observer.unobserve(entry.target);
    //                    }
    //                });
    //            },
    //            { threshold: 0.1 }
    //        );
    //
    //        const targets = document.querySelectorAll(".img-image");
    //        targets.forEach((img) => observer.observe(img));
    //
    //        return () => {
    //            observer.disconnect();
    //        };
    //    }, [images]);

    useEffect(() => {
        if (images.length === 0) return;

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

        // Ensures DOM is ready
        const raf = requestAnimationFrame(() => {
            const targets = document.querySelectorAll(".img-image");
            const unobserved = [];

            // Wait until all images are loaded
            targets.forEach((img) => {
                if (img.complete) {
                    observer.observe(img);
                } else {
                    unobserved.push(img);
                }

                if (unobserved.length === 0) return;

                let loadedCount = 0;
                unobserved.forEach((img) => {
                    img.addEventListener("load", () => {
                        loadedCount++;
                        if (loadedCount === unobserved.length) {
                            unobserved.forEach((img) => observer.observe(img));
                        }
                    });
                });
            });
        });

        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();
        };
    }, [images]);

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }
            try {
                const response = await fetch("https://backend-one-cyan.vercel.app/api/galleries");
                const data = await response.json();
                const publishedImage = data.filter(image => image.published === true)
                setImages(publishedImage);
            } catch (error) {
                console.error("Failed to fetch images:", error);
            } finally {
                await delay(500);
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [setIsLoading]);

    useEffect(() => {
        document.title = "Galleries | HAFIDH MAULANA MATIN"
        if (modalVisible) {
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.paddingRight = "15px";
        } else {
            document.documentElement.style.overflow = "";
            document.documentElement.style.paddingRight = "0";
        }

        return () => {
            document.documentElement.style.overflow = "";
            document.documentElement.style.paddingRight = "0";
        };
    }, [modalVisible])

    const vwToPx = (vw) => (vw / 100) * window.innerWidth;
    const totalPadding = `${vwToPx(5) + 15}px`;

    useEffect(() => {
        if (isLoading) return;

        const timeout = setTimeout(() => {
            const elements = document.querySelectorAll(".seq-anim");
            elements.forEach((el, i) => {
                el.style.opacity = "0";
                setTimeout(() => {
                    el.style.opacity = "1";
                }, 2000 / elements.length * i);
            });
        }, 50);

        return () => clearTimeout(timeout);
    }, [isLoading])

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div key="galleries-loaded">
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
                            {images.map((image, index) => (
                                <div key={index} className="img-hover-zoom">
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={image.name || `img-${index}`}
                                        loading="lazy"
                                        className="shadow-1-strong rounded mb-4 img-image"
                                        style={{
                                            pointerEvents: disableClicks ? "none" : "auto",
                                        }}
                                        onClick={() => { handleImageClick(image.url) }}
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
                            className={`modal custom-modal ${isFadingOut ? "fade-out-galleries" : isFadeInActive ? "fade-in-galleries" : ""}`}
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
                </div>
            )
            }
        </>
    );
}
