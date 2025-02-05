import { AppError } from "src/errors/app.error";

const SIZE = 10;
const PAGE = 1;

export function handlePagination(page = 1, size = 10) {
  let skip = 0;
  let take = size;

  if (!size || size === 0) take = SIZE;

  if (page > PAGE) skip = page * take - take;

  return {
    skip,
    take,
  };
}

interface FormatGetPaginationResponseParams {
  data: any[];
  page?: number;
  size?: number;
  total: number;
}

export function replyGetRequestWithPagination({
  data,
  page = 1,
  size,
  total,
}: FormatGetPaginationResponseParams) {
  if (!size || size === 0) size = SIZE;

  let maxPage = Math.ceil(total / size);

  if (maxPage === 0) maxPage = PAGE;

  if (page > maxPage && maxPage !== 0) {
    throw new AppError("Página não encontrada.", 404);
  }

  return {
    data,
    pagination: {
      size,
      total,
      page: `${page ?? PAGE}/${maxPage}`,
    },
  };
}
