export const getCustomers = async (axiosPrivate, params) => {
  const { page, search, startDate, endDate } = params;

  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (search) queryParams.append("search", search);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const query = queryParams.toString();  
  const response = await axiosPrivate.get(
    `/users?${query}&role=user&sortBy=createdAt:desc`
  );
  return response.data;
};

export const getCustomerStat = async (axiosPrivate, userId) => {
  const response = await axiosPrivate.get(`/admin/stats/${userId}`);
  return response.data;
};

export const getInvoices = async (axiosPrivate, params) => {
  const { page, search, startDate, endDate } = params;

  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (search) queryParams.append("search", search);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const query = queryParams.toString();
  const response = await axiosPrivate.get(`/admin/transactions?${query}&sortBy=createdAt:desc`);
  return response.data;
};
