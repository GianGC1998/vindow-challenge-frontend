import { FC } from "react";
import { Card } from "../components/Card/Card";
import { Pagination } from "../components/Pagination/Pagination";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { useNews } from "../providers/news/news.hook";
import { PAGE_SIZE_DEFAULT } from "../common/constants/pagination.constants";
import { CardSkeleton } from "../components/Card/Skeleton";
import { AlertError } from "../components/AlertError/AlertError";

export const SearchPage: FC = () => {
  const [
    { page, searchError, searchLoading, searchResponse, hasNoResults },
    { onFilterChange, onPageChange },
  ] = useNews();
  return (
    <div className="container p-5 h-2">
      <h1 className="fw-bold">News search</h1>
      <AlertError error={searchError} />
      <Searchbar onSearch={onFilterChange} disabled={searchLoading} />
      <div className="row mt-4 g-3">
        {searchLoading
          ? [...Array(PAGE_SIZE_DEFAULT)].map((_, index) => (
              <CardSkeleton key={`card-skeleton-${index}`} />
            ))
          : (searchResponse?.value ?? []).map((news) => (
              <Card key={news.id} news={news} />
            ))}
        {hasNoResults && <h1 className="text-center">No results found</h1>}
      </div>
      <Pagination
        page={page}
        total={searchResponse?.totalCount ?? 0}
        disabled={searchLoading}
        onPageChange={onPageChange}
      />
    </div>
  );
};
