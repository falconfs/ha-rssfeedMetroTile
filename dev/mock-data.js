// Mock RSS Feed Data Generator
export const generateMockFeedItems = count => {
  const titles = [
    'Breaking: TypeScript 5.5 Released with New Features',
    'Home Assistant 2026.1 Brings Major UI Improvements',
    'Web Components: The Future of Frontend Development',
    'Lit Framework Reaches 3.0 Milestone',
    'RSS Feeds Make a Comeback in Modern Web Apps',
    'Developer Tools: Best Practices for 2026',
    'Accessibility in Web Development: A Complete Guide',
    'Performance Optimization Tips for Single Page Apps',
    'Touch Gestures: Implementing Swipe Navigation',
    'CSS Grid vs Flexbox: When to Use Each',
    'State Management in Modern Web Components',
    'Testing Web Components with Playwright',
    'Responsive Design Patterns for Dashboard UIs',
    'Dark Mode Implementation Best Practices',
    'Build Tools Comparison: Vite vs Rollup vs Webpack',
  ];

  const descriptions = [
    'Discover the latest features and improvements that make development faster and more enjoyable.',
    'A deep dive into the new capabilities that will transform how you build applications.',
    'Learn about the key changes and how they impact your development workflow.',
    'Explore best practices and real-world examples from industry experts.',
    'This comprehensive guide covers everything you need to know to get started.',
    'Get insights into the technical decisions behind this important update.',
    'Find out how this will affect your projects and what you need to do.',
    'Join thousands of developers who are already benefiting from these improvements.',
    'A step-by-step tutorial with code examples and practical tips.',
    'Understanding the core concepts and advanced techniques for better results.',
  ];

  const imageUrls = [
    'https://picsum.photos/seed/1/800/600',
    'https://picsum.photos/seed/2/800/600',
    'https://picsum.photos/seed/3/800/600',
    'https://picsum.photos/seed/4/800/600',
    'https://picsum.photos/seed/5/800/600',
    'https://picsum.photos/seed/6/800/600',
    'https://picsum.photos/seed/7/800/600',
    'https://picsum.photos/seed/8/800/600',
    'https://picsum.photos/seed/9/800/600',
    'https://picsum.photos/seed/10/800/600',
  ];

  const items = [];

  for (let i = 0; i < count; i++) {
    const randomTitle = titles[i % titles.length];
    const randomDescription = descriptions[i % descriptions.length];
    const randomImage = imageUrls[i % imageUrls.length];
    const daysAgo = count - i;
    const publishedDate = new Date();
    publishedDate.setDate(publishedDate.getDate() - daysAgo);

    items.push({
      title: `${randomTitle} (${i + 1})`,
      description: randomDescription,
      summary: randomDescription,
      link: `https://example.com/article/${i + 1}`,
      published: publishedDate.toISOString(),
      links: [
        {
          type: 'text/html',
          href: `https://example.com/article/${i + 1}`,
        },
        {
          type: 'image/jpeg',
          href: randomImage,
        },
      ],
    });
  }

  return items;
};

// Edge Case Generators
export const generateLongTitleItems = count => {
  const longTitles = [
    'This is an extremely long title that should test the text overflow and ellipsis behavior of the card component when dealing with very long content that needs to be truncated properly',
    'Another super long title: Understanding the Complexities of Modern Web Development Frameworks and Their Impact on Developer Experience in 2026 and Beyond',
    'Breaking News: Major Technology Company Announces Revolutionary New Product That Will Change Everything We Know About Computing Forever and Ever',
  ];

  return generateMockFeedItems(count).map((item, i) => ({
    ...item,
    title: longTitles[i % longTitles.length],
  }));
};

export const generateNoDescriptionItems = count => {
  return generateMockFeedItems(count).map(item => ({
    ...item,
    description: undefined,
    summary: undefined,
  }));
};

export const generateOldDateItems = count => {
  return generateMockFeedItems(count).map((item, i) => {
    const yearsAgo = Math.floor(i / 2) + 1;
    const date = new Date();
    date.setFullYear(date.getFullYear() - yearsAgo);

    return {
      ...item,
      published: date.toISOString(),
    };
  });
};

export const generateMixedImageItems = count => {
  return generateMockFeedItems(count).map((item, i) => {
    const hasValidImage = i % 3 !== 0; // Every 3rd item has broken image

    return {
      ...item,
      links: hasValidImage
        ? item.links
        : [
            { type: 'text/html', href: item.link },
            { type: 'image/jpeg', href: 'https://broken-url.invalid/image.jpg' },
          ],
    };
  });
};

export const generateBrokenImageItems = count => {
  return generateMockFeedItems(count).map(item => ({
    ...item,
    links: [
      { type: 'text/html', href: item.link },
      { type: 'image/jpeg', href: 'https://broken-url.invalid/image.jpg' },
    ],
  }));
};

export const generateSlowLoadingImageItems = count => {
  return generateMockFeedItems(count).map((item, i) => ({
    ...item,
    links: [
      { type: 'text/html', href: item.link },
      {
        type: 'image/jpeg',
        href: `https://deelay.me/2000/https://picsum.photos/seed/${i}/800/600`, // 2s delay
      },
    ],
  }));
};

// Mock Home Assistant Object
export const createMockHass = feedItems => {
  return {
    states: {
      'sensor.die_zeit': {
        entity_id: 'sensor.die_zeit',
        state: 'ok',
        attributes: {
          entries: feedItems,
          friendly_name: 'Die Zeit RSS Feed',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.test_feed': {
        entity_id: 'sensor.test_feed',
        state: 'ok',
        attributes: {
          entries: feedItems.slice(0, 5),
          friendly_name: 'Test Feed (5 items)',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.empty_feed': {
        entity_id: 'sensor.empty_feed',
        state: 'ok',
        attributes: {
          entries: [],
          friendly_name: 'Empty Feed',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.no_images': {
        entity_id: 'sensor.no_images',
        state: 'ok',
        attributes: {
          entries: feedItems.slice(0, 8).map(item => ({
            ...item,
            links: [{ type: 'text/html', href: item.link }],
          })),
          friendly_name: 'Feed without Images',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.long_titles': {
        entity_id: 'sensor.long_titles',
        state: 'ok',
        attributes: {
          entries: generateLongTitleItems(8),
          friendly_name: 'Feed with Long Titles',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.no_description': {
        entity_id: 'sensor.no_description',
        state: 'ok',
        attributes: {
          entries: generateNoDescriptionItems(8),
          friendly_name: 'Feed without Descriptions',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.old_dates': {
        entity_id: 'sensor.old_dates',
        state: 'ok',
        attributes: {
          entries: generateOldDateItems(8),
          friendly_name: 'Feed with Old Dates',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.mixed_images': {
        entity_id: 'sensor.mixed_images',
        state: 'ok',
        attributes: {
          entries: generateMixedImageItems(9),
          friendly_name: 'Feed with Mixed Valid/Broken Images',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.broken_images': {
        entity_id: 'sensor.broken_images',
        state: 'ok',
        attributes: {
          entries: generateBrokenImageItems(5),
          friendly_name: 'Feed with All Broken Images',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.slow_images': {
        entity_id: 'sensor.slow_images',
        state: 'ok',
        attributes: {
          entries: generateSlowLoadingImageItems(5),
          friendly_name: 'Feed with Slow Loading Images',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.many_items': {
        entity_id: 'sensor.many_items',
        state: 'ok',
        attributes: {
          entries: generateMockFeedItems(50),
          friendly_name: 'Feed with Many Items (50)',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.unavailable': {
        entity_id: 'sensor.unavailable',
        state: 'unavailable',
        attributes: {},
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.missing_entries': {
        entity_id: 'sensor.missing_entries',
        state: 'ok',
        attributes: {
          friendly_name: 'Feed Missing Entries Attribute',
          // No 'entries' key!
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
      'sensor.malformed_data': {
        entity_id: 'sensor.malformed_data',
        state: 'ok',
        attributes: {
          entries: 'not-an-array', // Wrong type
          friendly_name: 'Malformed Feed Data',
        },
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      },
    },
    config: {
      latitude: 52.52,
      longitude: 13.405,
      elevation: 0,
      unit_system: {
        length: 'km',
        mass: 'kg',
        temperature: '°C',
        volume: 'L',
      },
      location_name: 'Home',
      time_zone: 'Europe/Berlin',
      components: ['feedreader'],
      config_dir: '/config',
      whitelist_external_dirs: [],
      allowlist_external_dirs: [],
      version: '2026.1.0',
      config_source: 'storage',
      safe_mode: false,
      state: 'RUNNING',
      external_url: null,
      internal_url: null,
    },
    themes: {
      default_theme: 'default',
      themes: {},
    },
    language: 'en',
    selectedLanguage: 'en',
    locale: {
      language: 'en',
      number_format: 'language',
      time_format: 'language',
    },
    callService: (domain, service, serviceData) => {
      console.log('Mock service call:', domain, service, serviceData);
      return Promise.resolve();
    },
    callWS: msg => {
      console.log('Mock WebSocket call:', msg);
      return Promise.resolve({});
    },
    connection: {
      subscribeEvents: () => Promise.resolve(() => {}),
      subscribeMessage: () => Promise.resolve(() => {}),
    },
  };
};

// Preset configurations for testing
export const presetConfigs = {
  default: {
    entity: 'sensor.die_zeit',
    slide_duration_sec: 5,
  },
  square: {
    entity: 'sensor.die_zeit',
    aspect_ratio: '1:1',
    transition: 'fade',
  },
  widescreen: {
    entity: 'sensor.die_zeit',
    aspect_ratio: '16:9',
    transition: 'slide-horizontal',
  },
  split: {
    entity: 'sensor.die_zeit',
    aspect_ratio: '4:3',
    image_layout: 'split',
  },
  noImages: {
    entity: 'sensor.no_images',
    show_images: true,
  },
  empty: {
    entity: 'sensor.empty_feed',
  },
  fast: {
    entity: 'sensor.test_feed',
    slide_duration_sec: 2,
  },
  minimal: {
    entity: 'sensor.test_feed',
    show_navigation: false,
    show_indicators: false,
    auto_play: true,
  },
  longTitles: {
    entity: 'sensor.long_titles',
  },
  noDescription: {
    entity: 'sensor.no_description',
  },
  oldDates: {
    entity: 'sensor.old_dates',
  },
  mixedImages: {
    entity: 'sensor.mixed_images',
    show_images: true,
  },
  brokenImages: {
    entity: 'sensor.broken_images',
    show_images: true,
  },
  slowImages: {
    entity: 'sensor.slow_images',
    lazy_load_images: true,
  },
  performance: {
    entity: 'sensor.many_items',
    row_limit: 50,
    performance_warning: 20,
  },
  unavailable: {
    entity: 'sensor.unavailable',
  },
  missingData: {
    entity: 'sensor.missing_entries',
  },
  malformed: {
    entity: 'sensor.malformed_data',
  },
};

// HA Theme Presets
export const HA_THEMES = {
  'default-light': {
    '--ha-card-background': '#ffffff',
    '--card-background-color': '#ffffff',
    '--primary-text-color': '#212121',
    '--secondary-text-color': '#727272',
    '--primary-color': '#03a9f4',
    '--accent-color': '#ff9800',
    '--secondary-background-color': '#f5f5f5',
    '--divider-color': 'rgba(0, 0, 0, 0.12)',
    '--error-color': '#db4437',
    '--warning-color': '#ffa500',
  },
  'default-dark': {
    '--ha-card-background': '#1c1c1c',
    '--card-background-color': '#1c1c1c',
    '--primary-text-color': '#e1e1e1',
    '--secondary-text-color': '#9b9b9b',
    '--primary-color': '#03a9f4',
    '--accent-color': '#ff9800',
    '--secondary-background-color': '#2c2c2c',
    '--divider-color': 'rgba(255, 255, 255, 0.12)',
    '--error-color': '#ef5350',
    '--warning-color': '#ffb74d',
  },
  blue: {
    '--ha-card-background': '#111827',
    '--card-background-color': '#111827',
    '--primary-text-color': '#f3f4f6',
    '--secondary-text-color': '#9ca3af',
    '--primary-color': '#3b82f6',
    '--accent-color': '#60a5fa',
    '--secondary-background-color': '#1f2937',
    '--divider-color': 'rgba(255, 255, 255, 0.1)',
    '--error-color': '#ef4444',
    '--warning-color': '#f59e0b',
  },
  red: {
    '--ha-card-background': '#1a1a1a',
    '--card-background-color': '#1a1a1a',
    '--primary-text-color': '#fef2f2',
    '--secondary-text-color': '#fca5a5',
    '--primary-color': '#ef4444',
    '--accent-color': '#f87171',
    '--secondary-background-color': '#2d1a1a',
    '--divider-color': 'rgba(255, 255, 255, 0.1)',
    '--error-color': '#dc2626',
    '--warning-color': '#f59e0b',
  },
  green: {
    '--ha-card-background': '#0f1f13',
    '--card-background-color': '#0f1f13',
    '--primary-text-color': '#f0fdf4',
    '--secondary-text-color': '#86efac',
    '--primary-color': '#22c55e',
    '--accent-color': '#4ade80',
    '--secondary-background-color': '#1a2e1f',
    '--divider-color': 'rgba(255, 255, 255, 0.1)',
    '--error-color': '#ef4444',
    '--warning-color': '#f59e0b',
  },
  purple: {
    '--ha-card-background': '#1e1229',
    '--card-background-color': '#1e1229',
    '--primary-text-color': '#faf5ff',
    '--secondary-text-color': '#d8b4fe',
    '--primary-color': '#a855f7',
    '--accent-color': '#c084fc',
    '--secondary-background-color': '#2d1b40',
    '--divider-color': 'rgba(255, 255, 255, 0.1)',
    '--error-color': '#ef4444',
    '--warning-color': '#f59e0b',
  },
  'high-contrast': {
    '--ha-card-background': '#000000',
    '--card-background-color': '#000000',
    '--primary-text-color': '#ffffff',
    '--secondary-text-color': '#cccccc',
    '--primary-color': '#00ff00',
    '--accent-color': '#ffff00',
    '--secondary-background-color': '#1a1a1a',
    '--divider-color': '#ffffff',
    '--error-color': '#ff0000',
    '--warning-color': '#ffaa00',
  },
};

// Grid Presets
export const GRID_PRESETS = {
  '1x1': { columns: 1, rows: 1 },
  '2x1': { columns: 2, rows: 1 },
  '1x2': { columns: 1, rows: 2 },
  '2x2': { columns: 2, rows: 2 },
  '3x2': { columns: 3, rows: 2 },
  '4x2': { columns: 4, rows: 2 },
  '6x2': { columns: 6, rows: 2 },
  '4x3': { columns: 4, rows: 3 },
  '6x3': { columns: 6, rows: 3 },
};
