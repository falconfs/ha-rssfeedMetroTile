import { HomeAssistant } from 'custom-card-helpers';
import { FeedItem } from '../types';

export function extractFeed(
  hass: HomeAssistant,
  entity: string,
  limit: number
): FeedItem[] {
  const stateObj = hass.states[entity];

  if (!stateObj?.attributes.entries) {
    return [];
  }

  const feed = stateObj.attributes.entries as FeedItem[];
  const rowLimit = limit || feed.length;

  return feed.slice(0, rowLimit);
}

export function getSlideImage(item: FeedItem): string | null {
  const imageLink = item.links?.find(link => link.type?.includes('image'));
  return imageLink?.href || null;
}

export function formatPublishedDate(published?: string): string {
  if (!published) return '';

  try {
    const date = new Date(published);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return published;
  }
}
