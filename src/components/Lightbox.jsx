import { useEffect } from "react";
import "./Lightbox.css";

function Lightbox({ images = [], currentIndex = 0, isOpen = false, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        
        {/* CLOSE BUTTON */}
        <button className="lightbox-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* PREVIOUS BUTTON */}
        <button className="lightbox-nav prev" onClick={onPrev} aria-label="Previous image">
          ‹
        </button>

        {/* IMAGE DISPLAY */}
        <div className="lightbox-content">
          <img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt || "HybriMoto Workshop"}
            className="lightbox-image"
          />
          <div className="lightbox-caption">
            <span className="lightbox-counter">{currentIndex + 1} / {images.length}</span>
            {currentImage.title && <p className="lightbox-title">{currentImage.title}</p>}
          </div>
        </div>

        {/* NEXT BUTTON */}
        <button className="lightbox-nav next" onClick={onNext} aria-label="Next image">
          ›
        </button>

      </div>
    </div>
  );
}

export default Lightbox;
