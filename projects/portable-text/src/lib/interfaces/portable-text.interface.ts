import {MarkDefInterface} from './mark-def.interface';
import {ChildInterface} from './child.interface';

export interface PortableTextInterface {
  _key: string;
  _type: string;
  _level?: number;
  _listItem?: string;
  _marks: Array<string>;
  style: string;
  text?: string;
  children?: Array<ChildInterface>;
  markDefs?: Array<MarkDefInterface>;
}
