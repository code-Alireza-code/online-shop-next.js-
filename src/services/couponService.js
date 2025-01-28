import http from "./httpService";

export async function getAllCoupons() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export async function AddCouponApi(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export async function getCouponByIdApi(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export async function editCouponApi({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({ data }) => data.data);
}

export async function removeCouponApi(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}
