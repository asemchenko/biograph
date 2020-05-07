export interface Event {
  eventId: number;
}

export function getStubEmptyEvent(): Event {
  return {
    eventId: null,
  };
}
