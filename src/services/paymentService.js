import http from "./httpService";

export async function createPaymentApi() {
  return http.post("/payment/create").then(({ data }) => data.data);
}

export async function getAllPaymentsApi() {
  return http.get("/admin/payment/list").then(({ data }) => data.data);
}
