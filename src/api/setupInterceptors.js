export const setupInterceptors = (api, logout, getToken) => {
  // ✅ Attach JWT to every request
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // ❌ Handle expired token globally
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
        alert("Session expired. Please login again.");
      }
      return Promise.reject(error);
    }
  );
};
