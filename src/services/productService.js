import http from "./httpService";

export async function getAllProducts(q = "", cookies = "") {
  return http
    .get(
      `/product/list?${q}`,
      cookies && {
        headers: {
          Cookie: cookies,
        },
      }
    )
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

//# admin related functions

export async function addNewProductApi(data) {
  return http.post("/admin/product/add", data).then(({ data }) => data.data);
}

export async function updateProductApi({ id, formData }) {
  return http
    .patch(`/admin/product/update/${id}`, formData)
    .then(({ data }) => data.data);
}

export async function removeProductApi(id) {
  return http
    .delete(`/admin/product/remove/${id}`)
    .then(({ data }) => data.data);
}
