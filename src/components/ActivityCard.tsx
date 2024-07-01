import { ActivityItem } from "@/constants/activities";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ActivityCard({ activity }: { activity: ActivityItem }) {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/activity/${activity._id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <Card className="md:max-w-sm overflow-hidden shadow-card hover:cursor-pointer hover:shadow-xl">
        <CardHeader className="p-0 pb-1">
          <div className="overflow-hidden">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="aspect-[3/4] h-fit w-fit object-cover"
              width={300}
              height={400}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle>{activity.title}</CardTitle>
          <CardDescription>{activity.shortDescription}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
