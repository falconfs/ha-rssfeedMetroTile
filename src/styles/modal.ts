import { css } from 'lit';

export const modalStyles = css`
  /* Modal Backdrop */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }

  .modal-backdrop.hidden {
    display: none;
  }

  /* Modal Container */
  .modal-container {
    position: relative;
    background: var(--card-background-color, #fff);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    max-width: 95vw;
    max-height: 95vh;
    overflow: hidden;
    z-index: 9999;
  }

  /* Size variants */
  .modal-container.size-small {
    width: 50vw;
    height: 60vh;
  }

  .modal-container.size-medium {
    width: 70vw;
    height: 75vh;
  }

  .modal-container.size-large {
    width: 90vw;
    height: 85vh;
  }

  .modal-container.size-fullscreen {
    width: 95vw;
    height: 95vh;
  }

  /* Mobile: Auto-fullscreen under 720px */
  @media (max-width: 720px) {
    .modal-container {
      width: 95vw !important;
      height: 95vh !important;
      border-radius: 8px;
    }
  }

  /* Modal Header */
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    flex-shrink: 0;
  }

  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    padding-right: 16px;
  }

  .modal-close-button {
    background: none;
    border: none;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    color: var(--secondary-text-color, #757575);
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .modal-close-button:hover {
    background: var(--divider-color, #e0e0e0);
    color: var(--primary-text-color, #212121);
  }

  .modal-close-button:focus {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  /* Modal Body */
  .modal-body {
    position: relative;
    flex: 1;
    overflow: hidden;
    background: var(--card-background-color, #fff);
  }

  /* iframe */
  .modal-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  .modal-iframe.hidden {
    display: none;
  }

  /* Loading State */
  .modal-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--card-background-color, #fff);
    z-index: 1;
  }

  .modal-loading ha-circular-progress {
    --md-circular-progress-size: 48px;
  }

  .modal-loading-text {
    font-size: 14px;
    color: var(--secondary-text-color, #757575);
  }

  /* Error State */
  .modal-error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 32px;
    background: var(--card-background-color, #fff);
    text-align: center;
    z-index: 1;
  }

  .modal-error-icon {
    font-size: 48px;
    opacity: 0.5;
  }

  .modal-error-title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
  }

  .modal-error-message {
    margin: 8px 0 0;
    font-size: 14px;
    color: var(--secondary-text-color, #757575);
    max-width: 400px;
  }

  .modal-error-button {
    margin-top: 16px;
    padding: 10px 24px;
    background: var(--primary-color, #03a9f4);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .modal-error-button:hover {
    background: var(--dark-primary-color, #0288d1);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .modal-error-button:active {
    transform: translateY(0);
  }

  .modal-error-button:focus {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  /* Animations */

  /* Fade Animation */
  .modal-animation-fade.modal-backdrop {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-fade.modal-backdrop.closing {
    animation: fadeOut 0.15s ease-in;
  }

  .modal-animation-fade .modal-container {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-fade.closing .modal-container {
    animation: fadeOut 0.15s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  /* Slide-up Animation */
  .modal-animation-slide-up.modal-backdrop {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-slide-up.modal-backdrop.closing {
    animation: fadeOut 0.15s ease-in;
  }

  .modal-animation-slide-up .modal-container {
    animation: slideUp 0.3s ease-out;
  }

  .modal-animation-slide-up.closing .modal-container {
    animation: slideDown 0.2s ease-in;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(50px);
    }
  }

  /* Scale Animation */
  .modal-animation-scale.modal-backdrop {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-scale.modal-backdrop.closing {
    animation: fadeOut 0.15s ease-in;
  }

  .modal-animation-scale .modal-container {
    animation: scaleIn 0.2s ease-out;
  }

  .modal-animation-scale.closing .modal-container {
    animation: scaleOut 0.15s ease-in;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  /* None Animation */
  .modal-animation-none .modal-backdrop,
  .modal-animation-none .modal-container {
    animation: none !important;
  }

  /* Accessibility */
  .modal-container:focus {
    outline: none;
  }

  .modal-container:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: -2px;
  }

  /* Prevent body scroll when modal is open */
  body.modal-open {
    overflow: hidden;
  }
`;
