import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * Carousel props
 * @param images - array of imported image URLs (e.g. import img from '../path.png')
 * @param autoPlay - whether the carousel should automatically advance
 * @param interval - auto-advance interval in milliseconds
 * @param maxWidth - maximum width of the carousel (px or CSS value)
 */
type Props = {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  maxWidth?: number | string;
  /**
   * If true, the carousel will size itself to fit the viewport height
   * so the image is visible without page scrolling. The component will
   * set its container height to `calc(100vh - viewportOffset)`.
   */
  fitViewport?: boolean;
  /** Number of pixels to subtract from 100vh (header + margins). */
  viewportOffset?: number;
};

/**
 * Reusable Carousel component
 * - Displays one image at a time
 * - Prev/Next buttons
 * - Indicators to jump to a specific slide
 * - Autoplay with pause-on-hover
 * - Keyboard navigation with left/right arrows
 */
export default function Carousel({ images, autoPlay = true, interval = 4000, maxWidth = 900, fitViewport = false, viewportOffset = 120 }: Props) {
  // current slide index
  const [index, setIndex] = useState(0);
  // reference to the interval so we can clear/restart it
  const autoplayRef = useRef<number | null>(null);
  // element reference so we can attach hover listeners (pause on hover)
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // helpers to move between slides
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // setup autoplay interval when component mounts or when settings change
  useEffect(() => {
    if (!autoPlay) return;
    autoplayRef.current = window.setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    // cleanup interval when component unmounts or dependencies change
    return () => { if (autoplayRef.current) window.clearInterval(autoplayRef.current); };
  }, [autoPlay, interval, images.length]);

  // pause autoplay when the mouse is over the carousel, resume on leave
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleEnter = () => { if (autoplayRef.current) { window.clearInterval(autoplayRef.current); autoplayRef.current = null; } };
    const handleLeave = () => { if (!autoplayRef.current && autoPlay) { autoplayRef.current = window.setInterval(() => setIndex((i) => (i + 1) % images.length), interval); } };
    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [autoPlay, interval, images.length]);

  // keyboard navigation: left/right arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // If fitViewport is enabled we set an explicit height so the
  // image can use 100% height and not cause the page to scroll.
  // We'll attempt to detect the header height automatically and use
  // it to compute `viewportOffset`. If detection fails we fall back
  // to the `viewportOffset` prop value.
  const [measuredOffset, setMeasuredOffset] = useState<number | null>(null);

  useEffect(() => {
    if (!fitViewport) return;

    const measure = () => {
      // Strategy: look for the first <header> element in the document
      // (this matches the project's `MainLayout`), otherwise try a
      // header inside the app root.
      const header = document.querySelector('header') || document.querySelector('#root header');
      if (header instanceof HTMLElement) {
        const rect = header.getBoundingClientRect();
        setMeasuredOffset(Math.round(rect.height));
      } else {
        setMeasuredOffset(null);
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [fitViewport]);

  const effectiveOffset = measuredOffset ?? viewportOffset;

  const containerStyle: CSSProperties = fitViewport
    ? { position: 'relative', height: `calc(100vh - ${effectiveOffset}px)`, width: '100%', maxWidth, margin: '24px auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }
    : { position: 'relative', maxHeight: '80%', width: '100%', maxWidth, margin: '24px auto' };

  return (
    <div ref={carouselRef} style={containerStyle}>
      {/* Image viewport: overflow hidden keeps the image contained */}
      <div style={{ overflow: 'hidden', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', flex: fitViewport ? 1 : undefined }}>
        {/*
          When fitViewport is true we let the image take the full
          height of the container (height set to viewport). We use
          objectFit: 'contain' so the entire image is visible and
          aspect ratio is preserved. Otherwise keep the default
          responsive behavior (width:100%, height:auto).
        */}
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          style={fitViewport ? { display: 'block', width: '100%', height: '100%', objectFit: 'contain' } : { display: 'block', width: '100%', height: 'auto' }}
          loading="lazy"
        />
      </div>

      {/* Prev/Next buttons (absolutely positioned) */}
      <button aria-label="Previous" onClick={prev} style={navButtonStyle('left')}>‹</button>
      <button aria-label="Next" onClick={next} style={navButtonStyle('right')}>›</button>

      {/* Indicators: small dots that jump to a slide */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', background: i === index ? '#333' : '#ddd', cursor: 'pointer', padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Inline style generator for nav buttons. Keeping this local makes the
 * component self-contained. If you want to theme/stylize differently,
 * extract to a CSS module.
 */
function navButtonStyle(pos: 'left' | 'right'): CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [pos]: 8,
    background: 'rgba(255,255,255,0.9)',
    border: '1px solid rgba(0,0,0,0.1)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 20,
    lineHeight: 1,
    padding: 0,
  };
}
