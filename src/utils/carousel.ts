import { CarouselState } from '../types';

export class CarouselController {
  private interval?: number;
  private state: CarouselState;

  constructor(
    private duration: number,
    length: number,
    private onChange: (state: CarouselState) => void
  ) {
    this.state = {
      currentIndex: 0,
      timeRemaining: duration,
      isPaused: false,
      totalSlides: length,
    };
  }

  start(): void {
    this.stop();
    this.state.timeRemaining = this.duration;
    this.state.isPaused = false;

    this.interval = window.setInterval(() => {
      if (this.state.isPaused) return;

      this.state.timeRemaining--;

      if (this.state.timeRemaining <= 0) {
        this.next();
      } else {
        this.onChange(this.state);
      }
    }, 1000);
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  pause(): void {
    this.state.isPaused = true;
    this.onChange(this.state);
  }

  resume(): void {
    this.state.isPaused = false;
    this.onChange(this.state);
  }

  next(): void {
    this.state.currentIndex = (this.state.currentIndex + 1) % this.state.totalSlides;
    this.state.timeRemaining = this.duration;
    this.onChange(this.state);
  }

  previous(): void {
    this.state.currentIndex =
      (this.state.currentIndex - 1 + this.state.totalSlides) % this.state.totalSlides;
    this.state.timeRemaining = this.duration;
    this.onChange(this.state);
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.state.totalSlides) {
      this.state.currentIndex = index;
      this.state.timeRemaining = this.duration;
      this.onChange(this.state);
    }
  }

  reset(): void {
    this.state.currentIndex = 0;
    this.state.timeRemaining = this.duration;
    this.state.isPaused = false;
    this.onChange(this.state);
  }

  updateLength(newLength: number): void {
    this.state.totalSlides = newLength;
    if (this.state.currentIndex >= newLength) {
      this.state.currentIndex = 0;
    }
    this.onChange(this.state);
  }

  getState(): CarouselState {
    return { ...this.state };
  }
}
