import { getFromStorage } from "../storage";

export function checkIsRole() {
  const user = getFromStorage("currentUser");
  if (user.roll === "admin") {
    return true;
  } else {
    return false;
  }
}
