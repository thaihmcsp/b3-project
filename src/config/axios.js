import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://shope-b3.thaihm.site/api/',
});
