import { FC } from "react";
import { AlertErrorProps } from "./types";

export const AlertError: FC<AlertErrorProps> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
};
