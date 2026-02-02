import { ASPECT_RATIOS } from '../constants';
import { CardConfig } from '../types';

export function calculateAspectPadding(ratio?: string): number {
  if (!ratio) return 0;

  if (ratio in ASPECT_RATIOS) {
    return ASPECT_RATIOS[ratio as keyof typeof ASPECT_RATIOS];
  }

  const [width, height] = ratio.split(':').map(Number);
  if (width && height) {
    return (height / width) * 100;
  }

  return 0;
}

export function shouldUseAspectRatio(config: CardConfig): boolean {
  return !!config.aspect_ratio && config.aspect_ratio !== '';
}

export function getHeightStyle(): string {
  // Always use auto height - either from aspect ratio or container
  return 'auto';
}
