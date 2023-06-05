import axios from "axios";

export function getNews(category="General") {
  const API_Key = `ffad97f390c94d7790f3b81989a2ec78`;
  const API_Endpoint = `https://newsapi.org/v2/top-headlines?country=in&category=${category}`;

  return axios.get(`${API_Endpoint}&apiKey=${API_Key}`)
}
