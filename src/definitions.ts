export type JsPrimitive =
  | Record<string, unknown>
  | Array<JsPrimitive>
  | string
  | number
  | boolean;
