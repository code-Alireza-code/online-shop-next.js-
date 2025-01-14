import http from "./httpService";

export async function getOtpApi(data) {
  await new Promise((res) => setTimeout(res, 200));
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export async function checkotpApi(data) {
  await new Promise((res) => setTimeout(res, 1000));
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export async function completeProfile(data) {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export async function getUserProfileApi() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export async function updateUserProfileApi(data) {
  return http.patch("/user/update", data).then(({ data }) => data.data);
}

export async function logoutUserApi() {
  return http.post("/user/logout");
}
