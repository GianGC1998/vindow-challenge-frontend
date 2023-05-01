import { SearchResponse } from "../../providers/news/types";
import { apiUrls } from "../constants/apiUrls.constants";
import { PAGE_SIZE_DEFAULT } from "../constants/pagination.constants";
import { apiManager } from "../utils/apiManager.utils";

export const searchNews = async (
  query: string,
  page: number
): Promise<SearchResponse> => {
  const { data } = await apiManager.get<
    {
      q: string;
      pageNumber: number;
      pageSize: number;
      withThumbnails: boolean;
    },
    SearchResponse
  >(`${apiUrls.SEARCH_URL}/NewsSearchAPI`, {
    params: {
      q: query,
      pageNumber: page,
      pageSize: PAGE_SIZE_DEFAULT,
      withThumbnails: true,
    },
  });
  return data;
};
