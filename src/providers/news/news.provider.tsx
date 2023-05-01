/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useCallback, useEffect, useState } from "react";
import { FCWithChildren } from "../../common/types/general.types";
import { searchNews as searchNewsApi } from "../../common/network/news.network";
import { FILTER_DEFAULT, PAGE_DEFAULT, SearchResponse, UseNews } from "./types";
import { useDidMountEffect } from "../../common/hooks/useDidMountEffect.hook";

const initialNewsContext: UseNews = [
  {
    searchResponse: undefined,
    searchError: undefined,
    searchLoading: false,
    page: 1,
    filter: "",
    hasNoResults: false,
  },
  {
    onFilterChange: (_) => void 0,
    onPageChange: (_) => void 0,
  },
];

export const NewsContext = createContext<UseNews>(initialNewsContext);

export const NewsProvider: FCWithChildren = ({ children }) => {
  const [filter, setFilter] = useState(FILTER_DEFAULT);
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [hasNoResults, setHasNoResults] = useState(false);

  const searchNews = useCallback(async () => {
    try {
      setHasNoResults(false);
      setError(undefined);
      setLoading(true);
      const data = await searchNewsApi(filter, page);
      setSearchResponse(data);
      if (data.value.length === 0) setHasNoResults(true);
    } catch (error) {
      setError("An unexpected error occurred. Please contact support.");
    } finally {
      setLoading(false);
    }
  }, [setLoading, filter, page]);

  useDidMountEffect(() => {
    if (!filter) return;
    searchNews();
  }, [page]);

  useEffect(() => {
    if (!filter) return;
    if (page === 1) searchNews();
    else setPage(1);
  }, [filter]);

  return (
    <NewsContext.Provider
      value={[
        {
          filter,
          page,
          searchResponse,
          searchError: error,
          searchLoading: loading,
          hasNoResults,
        },
        {
          onFilterChange: setFilter,
          onPageChange: setPage,
        },
      ]}
    >
      {children}
    </NewsContext.Provider>
  );
};
