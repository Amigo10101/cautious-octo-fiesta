import React, { useState, useEffect } from "react";

import "./totop.css";

const ScrollButton = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {   
            if (window.scrollY > 1) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="top-to-btm">
            {" "}
            {showTopBtn && (
               
                <i  onClick={goToTop} class="bi bi-chevron-double-up"></i>
            )}{" "}
        </div>
    );
};
export default ScrollButton;