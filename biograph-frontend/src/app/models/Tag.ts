export interface Tag {
  tagId: number;
  name: string;
  description: string;
  color: string;
  totalEvents: number;
  creationTime: string;
}


export function getStubEmptyTag(): Tag {
  return {
    tagId: null,
    name: '',
    description: '',
    totalEvents: 0,
    creationTime: new Date().toISOString(),
    color: null,
  };
}
