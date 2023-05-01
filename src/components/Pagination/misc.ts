import { PaginationConfig } from "./types";

export const getIntervalPages = (
  total: number,
  pageSize: number,
  page: number,
  pagesToShow: number
): PaginationConfig => {
  const pages = Math.ceil(total / pageSize);
  let pageStart = 1;
  let pageEnd = pages;

  if (pagesToShow < pageEnd) {
    if (page === pageStart) pageStart = page;
    else if (page === pageEnd) pageStart = page - pagesToShow + 1;
    else {
      pageStart = page - (pagesToShow - (pagesToShow % 2)) / 2;
      if (pageStart < 1) pageStart = 1;
    }

    pageEnd = pageStart + pagesToShow - 1;
    if (pageEnd > pages) {
      const dif = pageEnd - pages;
      pageEnd = pages;
      pageStart -= dif;
    }
  }

  return {
    pages,
    pageStart,
    pageEnd,
    disableBack: pageStart === page,
    disableNext: pageEnd === page,
  };
};
