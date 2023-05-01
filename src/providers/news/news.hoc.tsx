import { FC } from "react";
import { NewsProvider } from "./news.provider";

export const withNewsProvider = (Component: FC) => () =>
  (
    <NewsProvider>
      <Component />
    </NewsProvider>
  );
