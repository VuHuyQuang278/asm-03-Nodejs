import { redirect } from "react-router-dom";
import { getFromStorage } from "../storage";

export function checkAuthLoader() {
  const token = getFromStorage("token");
  if (!token) {
    return redirect("/login");
  }
}
