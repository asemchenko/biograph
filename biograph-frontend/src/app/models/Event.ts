import {Tag} from './Tag';
import {Category} from './Category';
import {Parameter} from './Parameter';
import {Attachment} from './Attachment';

export interface Event {
  eventId: number;
  name: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  creationTime: string;
  lastModifiedTime: string;
  parameters: Parameter[];
  attachments: Attachment[];
  tags: Tag[];
  category: Category;
}

export function getStubEmptyEvent(): Event {
  return {
    eventId: null,
    name: '',
    description: '',
    startDatetime: '',
    endDatetime: '',
    creationTime: '',
    lastModifiedTime: '',
    parameters: [],
    attachments: [],
    tags: [],
    category: null,
  };
}
