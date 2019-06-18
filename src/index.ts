import * as json5 from "json5";
import { filter } from "./filter/index";

export * from "./sanitize";

export function dataInvariants(data: any, filters: string[]) {
  // a simple filters to eliminate non-json fields from data.
  // this is especially ueful whendata is a js object literal
  data = json5.parse(json5.stringify(data));
  return filter(data, filters);
}
