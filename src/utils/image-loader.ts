export class ImageLoader {
  private loadedImages = new Set<string>();
  private failedImages = new Set<string>();

  async loadImage(src: string): Promise<boolean> {
    if (this.loadedImages.has(src)) {
      return true;
    }

    if (this.failedImages.has(src)) {
      return false;
    }

    return new Promise(resolve => {
      const img = new Image();

      img.onload = () => {
        this.loadedImages.add(src);
        resolve(true);
      };

      img.onerror = () => {
        this.failedImages.add(src);
        resolve(false);
      };

      img.src = src;
    });
  }

  isLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  hasFailed(src: string): boolean {
    return this.failedImages.has(src);
  }

  clear(): void {
    this.loadedImages.clear();
    this.failedImages.clear();
  }
}
