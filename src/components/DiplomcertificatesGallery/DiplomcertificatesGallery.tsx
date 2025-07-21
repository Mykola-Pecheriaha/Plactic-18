'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./DiplomcertificatesGallery.module.css";
import { ZoomIn, ZoomOut, Play, Pause, Maximize, Grid3X3, X, Plus, Download } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
}

interface DiplomcertificatesGalleryProps {
  images: GalleryImage[];
}

interface Position {
  x: number;
  y: number;
}

export function DiplomcertificatesGallery({ images }: DiplomcertificatesGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  const [initialZoomLevel, setInitialZoomLevel] = useState<number>(1);
  
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoomAndPosition = useCallback(() => {
    setZoomLevel(1);
    setCurrentPos({ x: 0, y: 0 });
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    resetZoomAndPosition();
  }, [images.length, resetZoomAndPosition]);

  const prevImage = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    resetZoomAndPosition();
  }, [images.length, resetZoomAndPosition]);

  const toggleSlideshow = useCallback(() => {
    setIsSlideshow(prev => !prev);
  }, []);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.2, 5));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.2, 1));
  }, []);

  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false));
    setCurrentIndex(0);
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreen) {
        switch (e.key) {
          case "Escape":
            setFullscreen(false);
            resetZoomAndPosition();
            setIsSlideshow(false);
            setIsFullscreenMode(false);
            break;
          case "ArrowLeft":
            prevImage();
            break;
          case "ArrowRight":
            nextImage();
            break;
          case " ":
            e.preventDefault();
            toggleSlideshow();
            break;
          case "+":
            e.preventDefault();
            zoomIn();
            break;
          case "-":
            e.preventDefault();
            zoomOut();
            break;
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreen, nextImage, prevImage, resetZoomAndPosition, toggleSlideshow, zoomIn, zoomOut]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSlideshow && fullscreen) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSlideshow, fullscreen, images.length]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (fullscreen && containerRef.current?.contains(e.target as Node)) {
      e.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(1, Math.min(5, zoomLevel * delta));
      
      if (newZoom !== zoomLevel) {
        setZoomLevel(newZoom);
        
        const newX = x - (x - currentPos.x) * (newZoom / zoomLevel);
        const newY = y - (y - currentPos.y) * (newZoom / zoomLevel);
        
        setCurrentPos({ x: newX, y: newY });
      }
    }
  }, [fullscreen, zoomLevel, currentPos]);

  useEffect(() => {
    if (fullscreen && containerRef.current) {
      const element = containerRef.current;
      element.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        if (element) {
          element.removeEventListener("wheel", handleWheel);
        }
      };
    }
  }, [fullscreen, handleWheel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - currentPos.x, y: e.clientY - currentPos.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      setCurrentPos({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setTouchStartDistance(distance);
      setInitialZoomLevel(zoomLevel);
    } else if (e.touches.length === 1 && zoomLevel > 1) {
      setIsDragging(true);
      setStartPos({
        x: e.touches[0].clientX - currentPos.x,
        y: e.touches[0].clientY - currentPos.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && touchStartDistance !== null) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      const scale = distance / touchStartDistance;
      const newZoom = Math.max(1, Math.min(5, initialZoomLevel * scale));
      setZoomLevel(newZoom);
    } else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      const newX = e.touches[0].clientX - startPos.x;
      const newY = e.touches[0].clientY - startPos.y;
      setCurrentPos({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStartDistance(null);
  };

  const openFullscreen = () => {
    setFullscreen(true);
    resetZoomAndPosition();
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    resetZoomAndPosition();
    setIsSlideshow(false);
    setIsFullscreenMode(false);
  };

  const toggleThumbnails = () => {
    setShowThumbnails(!showThumbnails);
  };

  const toggleFullscreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreenMode(true);
    } else {
      document.exitFullscreen();
      setIsFullscreenMode(false);
    }
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
    resetZoomAndPosition();
  };

  const handleImageLoad = (index: number) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Помилка завантаження:', error);
    }
  };

  if (!images || images.length === 0) {
    return <div className={styles.noImages}>Зображення недоступні</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.gallery}>
        <button className={styles.navButton} onClick={prevImage} aria-label="Попереднє зображення">
          &#10094;
        </button>

        <div
          className={styles.imageContainer}
          onMouseEnter={() => setShowPlusButton(true)}
          onMouseLeave={() => setShowPlusButton(false)}
        >
          {!imagesLoaded[currentIndex] && <div className={styles.imageLoader}>Завантаження...</div>}
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            className={styles.image}
            onLoad={() => handleImageLoad(currentIndex)}
            onError={() => handleImageLoad(currentIndex)}
            priority={currentIndex === 0}
          />

          {showPlusButton && (
            <button className={styles.plusButton} onClick={openFullscreen} aria-label="Збільшити зображення">
              <Plus size={24} />
            </button>
          )}
        </div>

        <button className={styles.navButton} onClick={nextImage} aria-label="Наступне зображення">
          &#10095;
        </button>

        <div className={styles.bottomPanel}>
          <div className={styles.thumbnailsRow}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${index === currentIndex ? styles.activeThumbnail : ""}`}
                onClick={() => selectImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={60}
                  height={80}
                  className={styles.thumbnailImage}
                  onLoad={() => {}}
                  onError={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {fullscreen && (
        <div 
          className={styles.fullscreenOverlay} 
          onClick={closeFullscreen} 
          ref={fullscreenRef}
        >
          <div 
            className={styles.fullscreenContent} 
            onClick={e => e.stopPropagation()}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.imageCounter}>
              {currentIndex + 1}/{images.length} | Zoom: {Math.round(zoomLevel * 100)}%
            </div>

            <div className={styles.toolsPanel}>
              <button className={styles.toolButton} onClick={zoomOut} aria-label="Зменшити">
                <ZoomOut size={20} />
              </button>

              <button className={styles.toolButton} onClick={zoomIn} aria-label="Збільшити">
                <ZoomIn size={20} />
              </button>

              <button
                className={`${styles.toolButton} ${isSlideshow ? styles.active : ""}`}
                onClick={toggleSlideshow}
                aria-label={isSlideshow ? "Зупинити слайдшоу" : "Запустити слайдшоу"}
              >
                {isSlideshow ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                className={`${styles.toolButton} ${isFullscreenMode ? styles.active : ""}`}
                onClick={toggleFullscreenMode}
                aria-label="Повноекранний режим браузера"
              >
                <Maximize size={20} />
              </button>

              <button
                className={`${styles.toolButton} ${showThumbnails ? styles.active : ""}`}
                onClick={toggleThumbnails}
                aria-label="Показати/сховати мініатюри"
              >
                <Grid3X3 size={20} />
              </button>

              <button 
                className={styles.toolButton} 
                onClick={handleDownload} 
                aria-label="Завантажити зображення"
              >
                <Download size={20} />
              </button>

              <button className={styles.toolButton} onClick={closeFullscreen} aria-label="Закрити">
                <X size={20} />
              </button>
            </div>

            <button className={styles.fullscreenNavButton} onClick={prevImage} aria-label="Попереднє зображення">
              &#10094;
            </button>

            <div className={styles.fullscreenImageContainer}>
              <div 
                className={styles.zoomableImageWrapper}
                style={{
                  transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
                }}
              >
                <Image
                  ref={imageRef}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={currentImage.width}
                  height={currentImage.height}
                  className={styles.fullscreenImage}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  }}
                  onLoad={() => handleImageLoad(currentIndex)}
                  onError={() => handleImageLoad(currentIndex)}
                  draggable={false}
                />
              </div>
              {currentImage.title && <div className={styles.imageTitle}>{currentImage.title}</div>}
            </div>

            <button className={styles.fullscreenNavButton} onClick={nextImage} aria-label="Наступне зображення">
              &#10095;
            </button>

            {showThumbnails && (
              <div className={styles.thumbnailsContainer}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.fullscreenThumbnail} ${index === currentIndex ? styles.activeFullscreenThumbnail : ""}`}
                    onClick={() => selectImage(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={100}
                      height={75}
                      className={styles.fullscreenThumbnailImage}
                      onLoad={() => {}}
                      onError={() => {}}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className={styles.fullscreenIndicators}>
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.fullscreenIndicator} ${
                    index === currentIndex ? styles.activeFullscreenIndicator : ""
                  }`}
                  onClick={() => selectImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiplomcertificatesGallery; 