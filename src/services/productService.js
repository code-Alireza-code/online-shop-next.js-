import http from "./httpService";

export async function getAllProducts(q = "", cookies = "") {
  return http
    .get(`/product/list?${q}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export async function getProductBySlug(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export async function getProductById(id) {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
}

export async function likeProductApi(productId) {
  return http.post(`/product/like/${productId}`).then(({ data }) => data.data);
}
