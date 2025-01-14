import http from "./httpService";

export async function getAllProducts() {
  return http.get("/product/list").then(({ data }) => data.data);
}
