import Cookies from "cookies";
import { setIsRegistered } from "@/constants/navBar";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const cookies = new Cookies(req, res);
    cookies.set("email");
    setIsRegistered(false);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
}
