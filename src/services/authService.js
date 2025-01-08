import http from "./httpService";

export function getOtpApi(data) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}
