import { maxBy } from 'lodash';
export function getLatestEvent(events: Array<any>) {
  const latestEvent = maxBy(events || [], (eventItem) => {
    return eventItem && eventItem.lastUpdated
      ? new Date(eventItem.lastUpdated)
      : null;
  });
  return latestEvent ? latestEvent : null;
}
