import { ActivityCard } from "@/components/ActivityCard";
import { MongoClient } from "mongodb";

export default function Home({ activities }) {
  return (
    <div
      className={"p-10 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6"}
    >
      {activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} />
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("Users");
  const collection = db.collection("Activities");
  const activities = await collection.find({}).toArray();

  return {
    props: {
      activities: JSON.parse(JSON.stringify(activities)),
    },
  };
}
