import { useContext } from "react";

import { UseNews } from "./types";
import { NewsContext } from "./news.provider";

export const useNews = (): UseNews => {
  const [state, dispatch] = useContext(NewsContext);
  return [state, dispatch];
};
