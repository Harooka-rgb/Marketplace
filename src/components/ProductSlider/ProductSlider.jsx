import React, { useState, useEffect, useCallback } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './ProductSlider.module.css';

const ProductSlider = ({ 
  children, 
  itemsPerView = 4,
  gap = 24,
  showArrows = true,
  showDots = true,
  arrowPosition = 'top'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemsPerView);
  const totalItems = React.Children.count(children);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setVisibleItems(1);
      } else if (width < 768) {
        setVisibleItems(2);
      } else if (width < 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(itemsPerView);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, totalItems - visibleItems);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.min(maxIndex, Math.max(0, index)));
  }, [maxIndex]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const translateX = -(currentIndex * (100 / visibleItems));

  if (totalItems === 0) return null;

  return (
    <div className={styles.sliderWrapper}>
      {arrowPosition === 'top' && showArrows && (
        <div className={styles.topControls}>
          <button
            onClick={goToPrev}
            disabled={!canGoPrev}
            className={`${styles.arrow} ${styles.arrowLeft} ${!canGoPrev ? styles.arrowDisabled : ''}`}
            aria-label="Назад"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`${styles.arrow} ${styles.arrowRight} ${!canGoNext ? styles.arrowDisabled : ''}`}
            aria-label="Вперед"
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}

      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(${translateX}%)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            gap: `${gap}px`
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              className={styles.slideItem}
              style={{ flex: `0 0 calc(${100 / visibleItems}% - ${gap * (visibleItems - 1) / visibleItems}px)` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {arrowPosition === 'side' && showArrows && (
        <>
          <button
            onClick={goToPrev}
            disabled={!canGoPrev}
            className={`${styles.sideArrow} ${styles.sideArrowLeft} ${!canGoPrev ? styles.arrowDisabled : ''}`}
            aria-label="Назад"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`${styles.sideArrow} ${styles.sideArrowRight} ${!canGoNext ? styles.arrowDisabled : ''}`}
            aria-label="Вперед"
          >
            <IoIosArrowForward />
          </button>
        </>
      )}

      {showDots && maxIndex > 0 && (
        <div className={styles.dotsContainer}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ''}`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
