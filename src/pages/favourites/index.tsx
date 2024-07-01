import { ActivityCard } from "@/components/ActivityCard";
import { activities } from "@/constants/activities";

export default function Favourites() {
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
