export type PaginationProps = {
  page: number;
  pageSize?: number;
  pagesToShow?: number;
  total: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
};

export type PaginationConfig = {
  pages: number;
  pageStart: number;
  pageEnd: number;
  disableBack: boolean;
  disableNext: boolean;
};

export enum PaginationArrowValue {
  BACK = -1,
  NEXT = 1,
}
