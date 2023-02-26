import axios from 'axios';

const baseURL = 'http://localhost:4000';

export const login = (data) => axios.post(`${baseURL}/api/users/login`, data);
export const signup = (data) =>
  axios.post(`${baseURL}/api/users/register`, data);

export const getAllWhiskies = () => axios.get(`${baseURL}/api/whiskey`);
export const addWhiskey = (data) => axios.post(`${baseURL}/api/whiskey`, data);
