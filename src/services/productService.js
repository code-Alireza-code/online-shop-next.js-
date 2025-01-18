import http from "./httpService";

export async function getAllProducts(q = "") {
  return http.get(`/product/list?${q}`).then(({ data }) => data.data);
}

export async function getProductBySlug(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export async function getProductById(id) {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
}
