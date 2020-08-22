import { punkApiUrl } from "../config.json";
import http from "./httpService";

export function getAllBeers() {
   const apiUrl = punkApiUrl + "/beers";
   return http.get(apiUrl);
}

export function getFoodBeers(food) {
   if (food === "all") return getAllBeers();
   const apiUrl = punkApiUrl + "/beers?food=" + food;
   return http.get(apiUrl);
}

export default {
   getAllBeers,
   getFoodBeers,
};
