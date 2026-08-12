import { useState, useEffect, useRef } from "react";

import img0 from "../assets/images/photo-silhouette.jpg";
import img1 from "../assets/images/photo-engagement-1.jpg";
import img2 from "../assets/images/photo-engagement-2.jpg";
import img3 from "../assets/images/photo-teena-solo.jpg";
import img4 from "../assets/images/photo-selfie-1.jpg";
import img5 from "../assets/images/photo-outdoors-1.jpg";
import img6 from "../assets/images/photo-outdoors-2.jpg";
import img7 from "../assets/images/photo-casual-1.jpg";

const photos = [img0, img1, img2, img3, img4, img5, img6, img7];

function PhotoGallery() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 3000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
    resetTimer();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) {
      goTo((current + 1) % photos.length);
    } else {
      goTo((current - 1 + photos.length) % photos.length);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="photo-gallery"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="photo-strip"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {photos.map((src, i) => (
          <img key={i} src={src} alt="" className="gallery-photo" />
        ))}
      </div>

      <div className="gallery-dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
