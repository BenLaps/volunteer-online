import Cookies from "cookies";
import clientPromise from "../../lib/mongodb";
const { createHash } = require("node:crypto");

export default async function handler(req, res) {
  if (req.method == "POST") {
    const email = req.body["email"];
    const password = req.body["password"];
    const passwordagain = req.body["passwordagain"];
    if (password != passwordagain) {
      res.redirect("/register?msg=The two passwords don't match");
      return;
    }
    const client = await clientPromise;
    const db = client.db("Users");
    const users = await db
      .collection("Profiles")
      .find({ email: email })
      .toArray();
    if (users.length > 0) {
      res.redirect("/register?msg=A user already has this email");
      return;
    }
    const password_hash = createHash("sha256").update(password).digest("hex");
    const currentDate = new Date().toUTCString();
    const bodyObject = {
      email: email,
      Password: password_hash,
      Created: currentDate,
    };
    await db.collection("Profiles").insertOne(bodyObject);
    const cookies = new Cookies(req, res);
    cookies.set("email", email);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
}
