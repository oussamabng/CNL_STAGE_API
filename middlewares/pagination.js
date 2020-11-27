exports.getPagingData = (data, page, limit) => {
    const { count, rows:results } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
  
    return { count, results, totalPages, currentPage };
  };


exports.getPagination = (page, size) => {
    const limit = size ? + size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  