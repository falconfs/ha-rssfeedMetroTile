import { LovelaceCardConfig } from 'custom-card-helpers';

export interface CardConfig extends LovelaceCardConfig {
  type: 'custom:rssfeed-metro-tile';
  entity: string;

  // Layout
  aspect_ratio?: '1:1' | '16:9' | '4:3' | string;

  // Carousel
  slide_duration_sec?: number;
  transition?: TransitionType;
  pause_on_hover?: boolean;
  auto_play?: boolean;

  // Content
  row_limit?: number;
  show_images?: boolean;
  image_layout?: ImageLayout;
  lazy_load_images?: boolean;

  // Navigation
  show_navigation?: boolean;
  show_indicators?: boolean;
  keyboard_navigation?: boolean;

  // Grid (Sections View)
  grid_rows?: number;
  grid_columns?: number;

  // Advanced
  performance_warning?: number;
  error_entity_message?: string;
  style?: string;

  // Modal configuration
  open_in_modal?: boolean;
  modal_type?: ModalType;
  modal_size?: ModalSize;
  modal_width?: string;
  modal_height?: string;
  modal_animation?: ModalAnimation;
  modal_close_on_backdrop?: boolean;
  modal_show_close_button?: boolean;
  modal_close_on_esc?: boolean;
  modal_show_loading?: boolean;
  modal_iframe_sandbox?: boolean;
  modal_fallback_to_external?: boolean;

  // Legacy (deprecated)
  dynamic_height?: boolean;
  to_big_title?: number;
}

export interface FeedItem {
  title: string;
  description?: string;
  summary?: string;
  link: string;
  published?: string;
  links: Array<{ type: string; href: string }>;
}

export type TransitionType = 'slide-vertical' | 'slide-horizontal' | 'fade';
export type ImageLayout = 'background' | 'split';
export type ModalType = 'custom' | 'none';
export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type ModalAnimation = 'fade' | 'slide-up' | 'scale' | 'none';

export interface CarouselState {
  currentIndex: number;
  timeRemaining: number;
  isPaused: boolean;
  totalSlides: number;
}

export interface TouchState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
}

export interface ErrorState {
  type: 'entity' | 'empty' | 'image' | 'none';
  message: string;
  details?: string;
}

export interface ModalConfig {
  url: string;
  title: string;
  size: ModalSize;
  width?: string;
  height?: string;
  animation: ModalAnimation;
  closeOnBackdrop: boolean;
  showCloseButton: boolean;
  closeOnEsc: boolean;
  showLoading: boolean;
  iframeSandbox: boolean;
  fallbackToExternal: boolean;
}

export interface ModalState {
  isOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorType?: 'cors' | 'network' | 'unknown';
  url?: string;
  title?: string;
}
