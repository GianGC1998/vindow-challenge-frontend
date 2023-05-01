import { Dispatch, SetStateAction } from "react";

import { NewsEntity } from "../../common/entities/news.entity";

export type SearchResponse = {
  totalCount: number;
  value: NewsEntity[];
};

export type UseNewsState = {
  searchResponse: SearchResponse | undefined;
  searchLoading: boolean;
  searchError: string | undefined;
  filter: string;
  page: number;
  hasNoResults: boolean;
};

export type UseNewsDispatch = {
  onFilterChange: Dispatch<SetStateAction<string>>;
  onPageChange: Dispatch<SetStateAction<number>>;
};

export type UseNews = [UseNewsState, UseNewsDispatch];

export const PAGE_DEFAULT = 1;
export const FILTER_DEFAULT = "";
