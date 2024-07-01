import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res);
  const email = cookies.get("email");

  if (email) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
}
