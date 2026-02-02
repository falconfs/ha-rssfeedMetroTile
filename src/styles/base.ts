import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    height: 100%;
  }

  /* Aspect Ratio Container */
  .aspect-ratio-box {
    position: relative;
    width: 100%;
    padding-bottom: var(--aspect-ratio-padding, 100%);
  }

  .aspect-ratio-box > .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Fixed Height Container - uses container height with minimum */
  .fixed-height {
    min-height: 300px;
    height: 100%;
  }

  /* Carousel Wrapper */
  .carousel-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: var(--ha-card-background, var(--card-background-color));
  }

  .carousel {
    width: 100%;
    height: 100%;
  }

  /* Slide Base */
  .slide {
    position: relative;
    display: flex;
    align-items: flex-end;
    background: var(--ha-card-background, var(--card-background-color));
    overflow: hidden;
  }

  .slide a {
    color: inherit;
    text-decoration: none;
    width: 100%;
  }

  .slide a:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }

  /* Image Base */
  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slide-image[loading='lazy'] {
    background: var(--secondary-background-color);
  }

  /* Content Base */
  .slide-content {
    padding: 16px;
  }

  .slide-title {
    margin: 0 0 8px 0;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.2;
  }

  .slide-description {
    margin: 0 0 8px 0;
    font-size: 0.9em;
    line-height: 1.4;
    opacity: 0.9;
  }

  .slide-date {
    font-size: 0.75em;
    opacity: 0.7;
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .carousel,
    .slide {
      transition: none !important;
    }
  }

  /* Responsive Typography */
  @media (max-width: 600px) {
    .slide-title {
      font-size: 1.2em;
    }

    .slide-description {
      font-size: 0.85em;
    }
  }
`;
