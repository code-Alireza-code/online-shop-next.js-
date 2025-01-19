import http from "./httpService";

export async function createPaymentApi() {
  return http.post("/payment/create").then(({ data }) => data.data);
}
