import http from "./httpService";

export async function getAllProducts(q = "") {
  return http.get(`/product/list?${q}`).then(({ data }) => data.data);
}
