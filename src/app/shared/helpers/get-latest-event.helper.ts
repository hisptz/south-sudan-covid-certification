import { maxBy } from 'lodash';
export function getLatestEvent(events: Array<any>) {
  const latestEvent = maxBy(events || [], (eventItem) => {
    return eventItem && eventItem.created ? new Date(eventItem.created) : null;
  });
  return latestEvent ? latestEvent : null;
}
