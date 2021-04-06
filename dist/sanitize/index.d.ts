import { JsPrimitive } from "../definitions";
export interface IReplacements {
    [val: number]: number | string;
    [val: string]: number | string;
}
export declare function sanitize(data: JsPrimitive, rmap: IReplacements): JsPrimitive;
