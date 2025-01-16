"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the popup if the click is outside both the button and popup
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        popupRef.current && !popupRef.current.contains(event.target)
      ) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button ref={buttonRef} onClick={() => setIsPopupVisible(true)}>
        Open Popup
      </button>

      {isPopupVisible && (
        <div>
          <div ref={popupRef}>
            <p>Popup Content</p>
          </div>
        </div>
      )}
    </div>
  );
}
