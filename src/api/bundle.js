import axios from "./axios";

export const getAllBundles = async () => {
    const response = await axios.get("/bundles");
    return response.data.data;
}

export const getSingleBundle = async (id) => {
    const response = await axios.get(`/bundles/${id}`);
    return response.data.data;
}

export const purchaseBundle = async (data, id, axiosPrivate) => {
    const response = await axiosPrivate.post(`/subscriptions/${id}`, data);
    return response.data;
}

export const getBundlesforUser = async (axiosPrivate, userId) => {
    const response = await axiosPrivate.get(`/subscriptions?userId=${userId}&sortBy=createdAt%3Adesc`);
    return response.data;
}

export const checkActiveBundle = async (axiosPrivate) => {
    const response = await axiosPrivate.get("/subscriptions/user");
    return response.data;
}