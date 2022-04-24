import {MarkDefInterface} from './mark-def.interface';
import {ChildInterface} from './child.interface';

export interface PortableTextInterface {
  _key: string;
  _type: string;
  _level?: number;
  style: string;
  text?: string;
  children?: Array<ChildInterface>;
  markDefs?: Array<MarkDefInterface>;
  listItem?: string;
}
