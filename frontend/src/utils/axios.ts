import axios, { AxiosError, AxiosResponse } from "axios";

const AUTHENTICATION_ERROR = "UNAUTHENTICATED";
const NETWORK_ERROR = "NETWORK_ERROR";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true, // to keep cross origin cookies
  //   headers: { Authorization: `Bearer ${token}`,
});

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data.errors) {
      const hasUnauthenticatedError = response.data.errors.find(
        (error: any) => error.message === AUTHENTICATION_ERROR
      );
      const isRetry = response.config.params?.retry;
      // Refreshing token if unauthenticated error
      // and not a retry (prevent infinite loops if refresh token is invalid)
      if (hasUnauthenticatedError && !isRetry) {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, {
          withCredentials: true, // to keep cross origin cookies
        });

        // Relaunching original request
        return axiosInstance({ ...response.config, params: { retry: true } });
      }
    }
    return response;
  },
  (err: AxiosError) => {
    // Detect Axios network errors: https://github.com/axios/axios/issues/383
    if (axios.isAxiosError(err) && !err.response) {
      throw new Error(NETWORK_ERROR);
    }

    throw err;
  }
);
