import { CardConfig } from './types';

export const DEFAULT_CONFIG: Partial<CardConfig> = {
  slide_duration_sec: 5,
  show_images: true,
  row_limit: 0,
  transition: 'slide-vertical',
  image_layout: 'background',
  aspect_ratio: '16:9',
  lazy_load_images: true,
  pause_on_hover: true,
  auto_play: true,
  show_navigation: true,
  show_indicators: true,
  keyboard_navigation: true,
  grid_rows: 4,
  grid_columns: 4,
  performance_warning: 20,
  // Modal defaults
  open_in_modal: true,
  modal_type: 'custom',
  modal_size: 'medium',
  modal_width: '',
  modal_height: '',
  modal_animation: 'fade',
  modal_close_on_backdrop: true,
  modal_show_close_button: true,
  modal_close_on_esc: true,
  modal_show_loading: true,
  modal_iframe_sandbox: true,
  modal_fallback_to_external: true,
};

export const SUPPORTED_TRANSITIONS = ['slide-vertical', 'slide-horizontal', 'fade'] as const;

export const ASPECT_RATIOS = {
  '1:1': 100,
  '16:9': 56.25,
  '4:3': 75,
} as const;

export const MODAL_SIZES = {
  small: { width: '50vw', height: '60vh' },
  medium: { width: '70vw', height: '75vh' },
  large: { width: '90vw', height: '85vh' },
  fullscreen: { width: '95vw', height: '95vh' },
} as const;

export const MODAL_ANIMATIONS = {
  fade: {
    enter: 'fadeIn 0.2s ease-out',
    exit: 'fadeOut 0.15s ease-in',
  },
  'slide-up': {
    enter: 'slideUp 0.3s ease-out',
    exit: 'slideDown 0.2s ease-in',
  },
  scale: {
    enter: 'scaleIn 0.2s ease-out',
    exit: 'scaleOut 0.15s ease-in',
  },
  none: {
    enter: 'none',
    exit: 'none',
  },
} as const;

export const STAR_TREK_QUOTES = [
  {
    quote: 'Space: the final frontier.',
    author: 'Captain James T. Kirk',
  },
  {
    quote: 'Live long and prosper.',
    author: 'Spock',
  },
  {
    quote: 'Resistance is futile.',
    author: 'The Borg',
  },
  {
    quote: 'Make it so.',
    author: 'Captain Jean-Luc Picard',
  },
  {
    quote: "I'm a doctor, not a feed parser!",
    author: 'Dr. Leonard McCoy',
  },
  {
    quote: 'Insufficient data does not compute.',
    author: 'Data',
  },
  {
    quote: 'The needs of the many outweigh the needs of the few.',
    author: 'Spock',
  },
  {
    quote: 'Engage!',
    author: 'Captain Jean-Luc Picard',
  },
  {
    quote: 'Logic is the beginning of wisdom, not the end.',
    author: 'Spock',
  },
  {
    quote: "Things are only impossible until they're not.",
    author: 'Captain Jean-Luc Picard',
  },
];

export const ERROR_MESSAGES = {
  NO_ENTITY: 'Entity is required. Please configure an entity.',
  ENTITY_NOT_FOUND: (entity: string) => `Entity "${entity}" not found in Home Assistant.`,
  MISSING_ENTRIES: (entity: string) =>
    `Entity "${entity}" does not have an "entries" attribute. Make sure it's an RSS feed sensor.`,
  EMPTY_FEED: 'Feed is empty',
  IMAGE_LOAD_ERROR: 'Image failed to load',
  TOO_MANY_ITEMS: (count: number, limit: number) =>
    `Warning: ${count} feed items detected. Consider limiting to ${limit} items for better performance.`,
} as const;

export const SWIPE_THRESHOLD = 50; // px
export const TOUCH_TIMEOUT = 300; // ms

export const VERSION = '2.2.0';
