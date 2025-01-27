import http from "./httpService";

export async function getAllCoupons() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}
