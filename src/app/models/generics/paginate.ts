// import { Type } from "class-transformer";

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];

export type Column<T, D extends number = 2> = [D] extends [never]
  ? never
  : T extends Record<string, any>
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends Date
          ? `${K}`
          : T[K] extends Array<infer U>
          ? `${K}` | Join<K, Column<U, Prev[D]>>
          : `${K}` | Join<K, Column<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

export type Order<T> = [Column<T>, "ASC" | "DESC"];
export type SortBy<T> = Order<T>[];

export class Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: SortBy<T>;
    searchBy: Column<T>[];
    search: string;
    filter?: { [column: string]: string | string[] };
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}
