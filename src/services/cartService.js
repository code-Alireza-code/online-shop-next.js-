import http from "./httpService";

export async function addToCartApi(productId) {
  return http.post("/cart/add", { productId }).then(({ data }) => data.data);
}
