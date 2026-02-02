import { css } from 'lit';

export const slideVerticalStyles = css`
  /* Vertical Slide Transition */
  .transition-slide-vertical .carousel {
    transition: transform 0.6s ease-in-out;
  }

  .transition-slide-vertical .slide {
    width: 100%;
    height: 100%;
    min-height: 300px;
  }
`;

export const slideHorizontalStyles = css`
  /* Horizontal Slide Transition */
  .transition-slide-horizontal .carousel {
    display: flex;
    transition: transform 0.6s ease-in-out;
  }

  .transition-slide-horizontal .slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }
`;

export const fadeStyles = css`
  /* Fade Transition */
  .transition-fade .carousel {
    position: relative;
  }

  .transition-fade .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }

  .transition-fade .slide.active {
    opacity: 1;
    position: relative;
  }
`;
