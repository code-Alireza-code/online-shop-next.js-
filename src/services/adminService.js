import http from "./httpService";

export async function getAllUsersApi() {
  return http.get("/admin/user/list").then(({ data }) => data.data);
}
