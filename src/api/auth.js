import axios from "./axios";

export const registerFn = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const loginFn = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};
export const verifyTwoFactorFn = async (data) => {
  const response = await axios.post("/auth/verify2FA", data);
  return response.data;
};

export const resendOtpFn = async (data) => {
  const response = await axios.post("/auth/resend2FA", data);
  return response.data;
};

export const adminLoginFn = async (data) => {
  const response = await axios.post("/admin/login", data);
  return response.data;
};

export const verifyEmail = async (data) => {
  const response = await axios.post(
    `/auth/verify-email?token=${data.token}`,
    {}
  );
  return response.data;
};

export const forgotPasswordFn = async (data) => {
  const response = await axios.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPasswordFn = async (data) => {
  const response = await axios.post(
    `/auth/reset-password?token=${data.token}`,
    {
      password: data.password,
    }
  );
  return response.data;
};

export const getUser = async (axiosPrivate, id) => {
  const response = await axiosPrivate.get(`/users/${id}`);
  return response.data;
};

export const updateProfile = async (axiosPrivate, data, id) => {
  const response = await axiosPrivate.patch(`/users/${id}`, data);
  return response.data;
};

export const resendEmail = async (data) => {
  const response = await axios.post("/auth/send-verification-email", data);
  return response.data;
};
