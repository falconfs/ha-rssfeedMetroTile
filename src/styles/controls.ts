import { css } from 'lit';

export const controlStyles = css`
  /* Navigation Buttons */
  .navigation-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: all 0.2s ease;
    font-size: 20px;
  }

  .navigation-button:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  .navigation-button:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .navigation-button.prev {
    left: 10px;
  }

  .navigation-button.next {
    right: 10px;
  }

  /* Vertical Navigation for slide-vertical transition */
  .transition-slide-vertical .navigation-button {
    left: 50%;
    transform: translateX(-50%);
  }

  .transition-slide-vertical .navigation-button:hover {
    transform: translateX(-50%) scale(1.1);
  }

  .transition-slide-vertical .navigation-button.prev {
    top: 10px;
    left: 50%;
  }

  .transition-slide-vertical .navigation-button.next {
    top: auto;
    bottom: 10px;
    left: 50%;
    right: auto;
  }

  .navigation-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* Indicators (Dots) */
  .indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 1;
  }

  /* Vertical Indicators for slide-vertical transition */
  .transition-slide-vertical .indicators {
    flex-direction: column;
    bottom: auto;
    left: auto;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.2);
  }

  .indicator.active {
    background: white;
    width: 24px;
    border-radius: 4px;
  }

  /* Active indicator in vertical mode */
  .transition-slide-vertical .indicator.active {
    width: 8px;
    height: 24px;
  }

  .indicator:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Timer Bubble */
  .timer-bubble {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
  }

  .timer-bubble.paused {
    opacity: 0.5;
  }

  .timer-bubble.hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .navigation-button,
    .indicator,
    .timer-bubble {
      transition: none;
    }
  }

  /* Touch-friendly larger hit areas */
  @media (pointer: coarse) {
    .navigation-button {
      width: 48px;
      height: 48px;
    }

    .indicator {
      width: 12px;
      height: 12px;
    }

    .indicator.active {
      width: 32px;
    }

    .transition-slide-vertical .indicator.active {
      width: 12px;
      height: 32px;
    }
  }
`;
