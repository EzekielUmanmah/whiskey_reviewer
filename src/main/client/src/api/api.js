import axios from 'axios';

axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';

const baseURL = 'http://localhost:4000';

export const login = (data) => axios.post(`${baseURL}/api/users/login`, data);
export const signup = (data) =>
  axios.post(`${baseURL}/api/users/register`, data);

export const getAllWhiskies = () => axios.get(`${baseURL}/api/whiskey`);
export const addWhiskey = (data) => axios.post(`${baseURL}/api/whiskey`, data);

export const addReview = (data) => axios.post(`${baseURL}/api/review`, data);
export const getAllReviewsByUser = (userId) =>
  axios.get(`${baseURL}/api/review/user?userId=${userId}`);
export const deleteReviewByReviewId = (reviewId) =>
  axios.delete(`${baseURL}/api/review/${reviewId}`);
export const updateReview = (updateReview) =>
  axios.put(`${baseURL}/api/review`, updateReview);
