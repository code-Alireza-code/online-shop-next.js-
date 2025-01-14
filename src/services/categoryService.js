import http from "./httpService";

export async function getAllCategories() {
  return http.get("/category/list").then(({ data }) => data.data);
}
