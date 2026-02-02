import { css } from 'lit';

export const backgroundLayoutStyles = css`
  /* Background Image Layout */
  .layout-background .slide {
    color: white;
  }

  .layout-background .slide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.5) blur(5px);
    z-index: 0;
  }

  .layout-background .slide-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .layout-background .slide-image-fallback {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      var(--primary-color, #03a9f4) 0%,
      var(--accent-color, #ff9800) 100%
    );
    opacity: 0.3;
    z-index: 0;
  }
`;

export const splitLayoutStyles = css`
  /* Split Layout */
  .layout-split .slide {
    flex-direction: column;
    align-items: stretch;
  }

  .layout-split .slide-image {
    flex-shrink: 0;
    height: 50%;
    width: 100%;
    object-fit: cover;
  }

  .layout-split .slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    overflow-y: auto;
  }

  .layout-split .slide-image-fallback {
    height: 50%;
    background: var(--secondary-background-color);
  }
`;
