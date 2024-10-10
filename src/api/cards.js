// src/api/cards.js
import axios from "./axios";
import he from "he";

/**
 * Retrieves all card categories from the server.
 *
 * @return {Promise<Array>} A promise that resolves to an array of card categories.
 */
export const getAllCardCategories = async () => {
  const response = await axios.get("/cards/category");
  return response.data;
};

/**
 * Retrieves all cards from the server with optional filters.
 *
 * @param {Object} params - The parameters for filtering cards.
 * @param {string} [params.categoryId] - The ID of the category to filter by.
 * @param {number} [params.limit=5] - The number of cards to retrieve per page.
 * @param {number} [params.page=1] - The page number to retrieve.
 * @param {string} [params.sortBy='popularity:desc'] - The sorting order.
 * @return {Promise<Object>} A promise that resolves to the card data.
 */
export const getAllCard = async ({
  categoryId = "",
  limit,
  page = 1,
  sortBy = "popularity:desc",
} = {}) => {
  const params = new URLSearchParams({
    limit,
    page,
    sortBy,
  });

  if (categoryId === "all") {
    categoryId = "";
  }

  if (categoryId) {
    params.append("categoryId", categoryId);
  }
  const response = await axios.get(`/cards?${params.toString()}`);
  return response.data;
};

export const getCardById = async (cardId) => {
  const response = await axios.get(`/cards/${cardId}`);
  return response.data;
};

export const getCardForUser = async (axiosPrivate) => {
  const response = await axiosPrivate.get(
    "/cards/my-cards?limit=20&sortBy=createdAt%3Adesc"
  );
  return response.data;
};

export const createCard = async (data, cardId, axiosPrivate) => {
  const response = await axiosPrivate.post(`/cards/${cardId}/create`, data);
  return response.data;
};

export const updateCard = async (data, cardId, axiosPrivate) => {
  const response = await axiosPrivate.patch(`/cards/my-cards/${cardId}`, data);
  return response.data;
};

export const purchaseCard = async (data, cardId, axiosPrivate) => {
  const response = await axiosPrivate.post(`/cards/${cardId}/pay`, data);
  return response.data;
};

export const getPurchasedCard = async (cardId, axiosPrivate) => {
  const response = await axiosPrivate.get(`/cards/my-cards/${cardId}`);
  const { data } = response;
  const card = {
    ...data,
    meta: data.meta
      ? {
          ...data.meta,
          name: data.meta.name ? he.decode(data.meta.name) : data.meta.name,
        }
      : {},
  };
  return card;
};

export const getPriceForCard = async (cardId, axiosPrivate) => {
  const response = await axiosPrivate.get(`bundles/price/${cardId}`);
  return response.data;
};

export const viewCard = async (cardToken) => {
  const response = await axios.get(`/cards/view/${cardToken}`);
  return response.data;
};

export const getSignatures = async (cardId, userToken) => {
  const { data } = await axios.get(
    `/cards/${cardId}/sign?userToken=${userToken}`
  );
  const signatures = [...data.signatures, ...data.userSignatures];

  return signatures.map((signature) => ({
    ...signature,
    content: he.decode(signature.content),
  }));
};

export const uploadFile = async (data) => {
  const response = await axios.post("/cards/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const signCard = async (data, cardId, userToken, userId) => {
  const response = await axios.post(
    `/cards/${cardId}/sign?userToken=${userToken}${
      userId ? `&userId=${userId}` : ""
    }`,
    data
  );
  return response.data;
};

export const updateSignature = async (
  data,
  signatureId,
  cardId,
  userToken,
  userId
) => {
  const response = await axios.patch(
    `/cards/${cardId}/sign/${signatureId}?userToken=${userToken}${
      userId ? `&userId=${userId}` : ""
    }`,
    data
  );
  return response.data;
};

export const deleteSignature = async (
  signatureId,
  cardId,
  userToken,
  userId
) => {
  await axios.delete(
    `/cards/${cardId}/sign/${signatureId}?userToken=${userToken}${
      userId ? `&userId=${userId}` : ""
    }`
  );
};

export const deleteCard = async (cardId, axiosPrivate) => {
  const response = await axiosPrivate.delete(`/cards/my-cards/${cardId}`);
  return response.data;
};

export const sendThankYouMessage = async (data) => {
  const response = await axios.post("/cards/respond", data);
  return response.data;
};
