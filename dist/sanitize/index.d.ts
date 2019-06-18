interface IReplacements {
    [val: number]: number | string;
    [val: string]: number | string;
}
export declare function sanitize(data: any, rmap: IReplacements): any;
export declare function _sanitize(data: any, rmap: IReplacements): any;
export {};
