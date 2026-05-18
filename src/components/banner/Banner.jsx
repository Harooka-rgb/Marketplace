import React, { useState, useEffect, useCallback, memo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './Banner.module.css';

const slides = [
  {
    id: 1,
    subTitle: 'Best Deal Online on laptops',
    mainTitle: 'LAPTOPS',
    promoText: 'UP to 80% OFF',
    image: 'https://enter.kg/images/stories/virtuemart/product/23c1_amd_opp_15_ffplus_naturalsilver_nt_hdcam_nonfpr_nonodd_nonbacklit_coreset_front_whitebg_with_screen_final_m1547150_2888.png',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    bgGradientFallback: '#667eea',
    accentColor: '#764ba2',
  },
  {
    id: 2,
    subTitle: 'New Gaming Collection',
    mainTitle: 'GAMING',
    promoText: 'UP to 50% OFF',
    image: 'https://itline.kg/upload/resize_cache/iblock/9e1/360_300_1/y2ss0zr9shinvfcsyfy19d5ij9lniiqi.png',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff6b6b 100%)',
    bgGradientFallback: '#f5576c',
    accentColor: '#ff6b6b',
  },
  {
    id: 3,
    subTitle: 'Ultra Thin & Light',
    mainTitle: 'ULTRABOOKS',
    promoText: 'Starting $599',
    image: 'https://gudini.kg/image/cache/catalog/Apple/MacBook%20Air%2020%2025/1114-800x800.png',
    bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
    bgGradientFallback: '#a8edea',
    accentColor: '#d299c2',
  },
  {
    id: 4,
    subTitle: 'Professional Series',
    mainTitle: 'WORKSTATION',
    promoText: 'For Creators',
    image: 'https://i.dell.com/sites/csimages/Banner_Imagery/all/prod-868908-notebook-precision-5690-1920x1440.png',
    bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    bgGradientFallback: '#1a1a2e',
    accentColor: '#e94560',
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeSlide = useCallback((newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    changeSlide((prev) => (prev + 1) % slides.length);
  }, [changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [changeSlide]);

  const goToSlide = useCallback((index) => {
    if (index !== currentSlide) {
      changeSlide(index);
    }
  }, [changeSlide, currentSlide]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className={styles.bannerOuter}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Кнопки навигации - вне overflow:hidden контейнера */}
      <button 
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={prevSlide}
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <IoIosArrowBack />
      </button>

      <div 
        className={styles.bannerContainer}
        style={{ 
          background: currentSlideData.bgGradient,
          '--accent-color': currentSlideData.accentColor 
        }}
      >
        <div className={styles.sliderWrapper}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''} ${
                index === (currentSlide - 1 + slides.length) % slides.length ? styles.prev : ''
              } ${index === (currentSlide + 1) % slides.length ? styles.next : ''}`}
            >
              <div className={styles.bannerContent}>
                <div className={styles.textSection}>
                  <p className={styles.subTitle}>{slide.subTitle}</p>
                  <h1 className={styles.mainTitle}>{slide.mainTitle}</h1>
                  <p className={styles.promoText}>{slide.promoText}</p>
                  
                  <button className={styles.ctaButton}>
                    Shop Now
                  </button>
                </div>

                <div className={styles.imageSection}>
                  <div className={styles.imageWrapper}>
                    <img 
                      src={slide.image} 
                      alt={slide.mainTitle}
                      className={styles.bannerImage}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className={styles.imageGlow} style={{ background: slide.accentColor }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Пагинация */}
        <div className={styles.pagination}>
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{ '--dot-color': slide.accentColor }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div 
            className={`${styles.progressFill} ${isAutoPlaying ? styles.animating : ''}`}
            style={{ 
              animationDuration: isAutoPlaying ? '6s' : '0s',
              background: currentSlideData.accentColor 
            }}
          />
        </div>
      </div>

      <button 
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={nextSlide}
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default memo(Banner);