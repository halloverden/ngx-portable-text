export interface MarkerInterface {
  applyMarks(child: string, options: {[key:string]: any}): HTMLElement;
  supports(type: string): boolean;
}
