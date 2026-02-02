import { TouchState } from '../types';
import { SWIPE_THRESHOLD } from '../constants';

export class TouchHandler {
  private touchState: TouchState = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false,
  };

  constructor(
    private element: HTMLElement,
    private onSwipeLeft: () => void,
    private onSwipeRight: () => void,
    private onSwipeStart: () => void,
    private onSwipeEnd: () => void
  ) {
    this.attachListeners();
  }

  private attachListeners(): void {
    // Touch events
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), {
      passive: false,
    });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), {
      passive: false,
    });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));

    // Mouse events (for desktop drag)
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseUp.bind(this));
  }

  private handleTouchStart(e: TouchEvent): void {
    const touch = e.touches[0];
    this.touchState = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      isDragging: true,
    };
    this.onSwipeStart();
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.touchState.isDragging) return;

    const touch = e.touches[0];
    this.touchState.currentX = touch.clientX;
    this.touchState.currentY = touch.clientY;

    // Prevent vertical scroll if horizontal swipe detected
    const deltaX = Math.abs(this.touchState.currentX - this.touchState.startX);
    const deltaY = Math.abs(this.touchState.currentY - this.touchState.startY);

    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }

  private handleTouchEnd(): void {
    if (!this.touchState.isDragging) return;

    const deltaX = this.touchState.currentX - this.touchState.startX;
    const deltaY = this.touchState.currentY - this.touchState.startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if horizontal or vertical swipe
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe detected
      if (absDeltaX > SWIPE_THRESHOLD) {
        if (deltaX > 0) {
          this.onSwipeRight(); // Swipe right = Previous slide
        } else {
          this.onSwipeLeft(); // Swipe left = Next slide
        }
      }
    } else {
      // Vertical swipe detected
      if (absDeltaY > SWIPE_THRESHOLD) {
        if (deltaY > 0) {
          this.onSwipeRight(); // Swipe down = Previous slide
        } else {
          this.onSwipeLeft(); // Swipe up = Next slide
        }
      }
    }

    this.touchState.isDragging = false;
    this.onSwipeEnd();
  }

  private handleMouseDown(e: MouseEvent): void {
    this.touchState = {
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isDragging: true,
    };
    this.onSwipeStart();
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.touchState.isDragging) return;
    this.touchState.currentX = e.clientX;
    this.touchState.currentY = e.clientY;
  }

  private handleMouseUp(): void {
    this.handleTouchEnd();
  }

  public destroy(): void {
    // Remove all listeners
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    this.element.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    this.element.removeEventListener('mouseleave', this.handleMouseUp.bind(this));
  }
}
