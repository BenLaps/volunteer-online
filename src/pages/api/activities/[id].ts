import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  console.log("API Request ID:", id); 

  if (req.method !== "GET") {
    return res.status(405).end(); 
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("Users");
    const collection = db.collection("Activities");

    console.log("Looking for activity with ID:", id);

    const activity = await collection.findOne({
      _id: new ObjectId(id as string),
    });

    console.log("Activity found:", activity);

    client.close();

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    return res.status(200).json(activity);
  } catch (error) {
    console.error("API Error:", error); // Логування помилки
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
