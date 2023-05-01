import { FC, useCallback, useMemo } from "react";
import { getIntervalPages } from "./misc";
import {
  PaginationArrowValue,
  PaginationConfig,
  PaginationProps,
} from "./types";
import {
  PAGE_LIMIT_DEFAULT,
  PAGE_SIZE_DEFAULT,
} from "../../common/constants/pagination.constants";

export const Pagination: FC<PaginationProps> = ({
  page,
  pageSize = PAGE_SIZE_DEFAULT,
  pagesToShow = PAGE_LIMIT_DEFAULT,
  total,
  disabled,
  onPageChange,
}) => {
  const { pages, pageStart, pageEnd } = useMemo<PaginationConfig>(
    () => getIntervalPages(total, pageSize, page, pagesToShow),
    [total, pageSize, page, pagesToShow]
  );
  const disabledArrows = useMemo(() => pages === 0, [pages]);

  const renderPages = () => {
    if (!pages) return;

    const pageItems = [];

    for (let i = pageStart - 1; i < pageEnd; i++) {
      const currentPage = i + 1;
      let className = "page-item ml-1";
      if (currentPage === page) className += " active";
      if (disabled) className += " disabled";

      pageItems.push(
        <li key={currentPage} className={className}>
          <button
            className="page-link"
            onClick={() => {
              if (currentPage === page) return;

              onPageChange(currentPage);
            }}
          >
            {currentPage}
          </button>
        </li>
      );
    }

    return pageItems;
  };

  const onClickArrow = useCallback(
    (toAdd: PaginationArrowValue) => {
      onPageChange(page + toAdd);
    },
    [page, onPageChange]
  );

  return (
    <>
      <nav className="mt-5">
        <ul className="pagination pagination-lg justify-content-center">
          <li
            className={`page-item ${
              pageStart === page || disabled || disabledArrows ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onClickArrow(PaginationArrowValue.BACK)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {renderPages()}
          <li
            className={`page-item ${
              pageEnd === page || disabled || disabledArrows ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onClickArrow(PaginationArrowValue.NEXT)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      {pages > 0 && (
        <h6 className="text-center text-primary">
          {page}/{pages}
        </h6>
      )}
    </>
  );
};
