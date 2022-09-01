import axios from "axios";

const API = axios.create({
  baseURL: "https://ig-food-menus.herokuapp.com/",
});

// API.interceptors.request.use(
//   (config) => {
//     config.headers[
//       "X-RapidAPI-Key"
//     ] = `98ea00642bmsh6b1567b73c1f53dp1dc9d9jsnf7b711aedb27`;
//     config.headers[
//       "X-RapidAPI-Host"
//     ] = `apidojo-hm-hennes-mauritz-v1.p.rapidapi.com`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const getData = () => {
//   return API.get("/", {
//     params: {
//       country: "us",
//       lang: "en",
//       currentpage: "0",
//       pagesize: "50",
//       categories: "men_all",
//       concepts: "H&M MAN",
//     },
//   });
// };

export const getData = (search) => {
  return API.get("/"+search);
};