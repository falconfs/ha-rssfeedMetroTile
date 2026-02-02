import { HomeAssistant } from 'custom-card-helpers';
import { ErrorState } from '../types';
import { ERROR_MESSAGES, STAR_TREK_QUOTES } from '../constants';

export function validateEntity(hass: HomeAssistant, entity: string): ErrorState {
  if (!entity) {
    return {
      type: 'entity',
      message: ERROR_MESSAGES.NO_ENTITY,
    };
  }

  const stateObj = hass.states[entity];

  if (!stateObj) {
    return {
      type: 'entity',
      message: ERROR_MESSAGES.ENTITY_NOT_FOUND(entity),
      details: 'Check that the entity exists and is available.',
    };
  }

  if (!stateObj.attributes.entries || !Array.isArray(stateObj.attributes.entries)) {
    return {
      type: 'entity',
      message: ERROR_MESSAGES.MISSING_ENTRIES(entity),
      details: `Expected an RSS feed sensor with "entries" attribute. Found: ${Object.keys(stateObj.attributes).join(', ')}`,
    };
  }

  return { type: 'none', message: '' };
}

export function getRandomStarTrekQuote(): { quote: string; author: string } {
  return STAR_TREK_QUOTES[Math.floor(Math.random() * STAR_TREK_QUOTES.length)];
}

export function shouldShowPerformanceWarning(itemCount: number, limit: number): string | null {
  if (itemCount > limit) {
    return ERROR_MESSAGES.TOO_MANY_ITEMS(itemCount, limit);
  }
  return null;
}
