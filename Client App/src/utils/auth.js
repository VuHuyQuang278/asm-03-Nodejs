import { getFromStorage } from "../storage";

export function checkIsAuth() {
  const token = getFromStorage("token");
  if (!token) {
    return false;
  } else {
    return true;
  }
}
