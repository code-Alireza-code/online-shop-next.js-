import http from "./httpService";

export async function getOtpApi(data) {
  await new Promise((res) => setTimeout(res, 2000));
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}
