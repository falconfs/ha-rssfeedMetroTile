import { css } from 'lit';

export const errorStateStyles = css`
  .error-container,
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 24px;
    text-align: center;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }

  .error-container {
    background: var(--error-color, #db4437);
    color: white;
  }

  .error-icon,
  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.6;
  }

  .error-title,
  .empty-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .error-message,
  .empty-message {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  .error-details {
    font-size: 12px;
    opacity: 0.6;
    margin-top: 12px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    max-width: 400px;
    word-wrap: break-word;
  }

  .star-trek-quote {
    margin-top: 24px;
    padding: 16px;
    background: var(--secondary-background-color);
    border-left: 4px solid var(--primary-color);
    border-radius: 4px;
    font-style: italic;
    max-width: 400px;
  }

  .star-trek-quote-text {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .star-trek-quote-author {
    font-size: 12px;
    opacity: 0.7;
    text-align: right;
  }

  .performance-warning {
    position: absolute;
    top: 50px;
    right: 10px;
    background: var(--warning-color, #ffa500);
    color: var(--text-primary-color, #fff);
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 11px;
    z-index: 100;
    max-width: 200px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  /* Fallback for missing image */
  .slide-image-fallback {
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
