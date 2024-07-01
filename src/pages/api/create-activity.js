import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, imageUrl, shortDescription, socialContactURL, city, tags } =
      req.body;

    if (
      !title ||
      !imageUrl ||
      !shortDescription ||
      !socialContactURL ||
      !city ||
      !tags
    ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    try {
      const client = await clientPromise;
      const db = client.db("Users");
      const collection = db.collection("Activities");

      const newActivity = {
        title,
        imageUrl,
        shortDescription,
        socialContactURL,
        city,
        tags,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newActivity);
      res.status(201).json({
        message: "Activity created successfully",
        activity: newActivity,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create activity" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
