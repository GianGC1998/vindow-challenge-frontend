export type SearchbarProps = {
  disabled: boolean;
  onSearch: (value: string) => void;
};

export type FormikValues = {
  query: string;
};
