import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.flutterwave.com/v3`
});

instance.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
    },
  };
});



instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Do something with response data
    return Promise.reject(error);
  }
);

export default instance;
