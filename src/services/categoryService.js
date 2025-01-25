import http from "./httpService";

export async function getAllCategories() {
  return http.get("/category/list").then(({ data }) => data.data);
}

//# admin related requests :

export async function getCategoryById(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}
