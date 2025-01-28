import http from "./httpService";

export async function getAllCoupons() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export async function AddCouponApi(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}
