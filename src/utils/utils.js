import axios from "axios";
import { BASE_URL } from "./BaseURL";


export const getCards = () => {
  return axios.get(BASE_URL);
}
