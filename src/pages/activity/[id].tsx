import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { Globe } from "lucide-react";
import { ActivityItem } from "@/constants/activities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getActivityById } from "@/pages/api/activityApi";

interface ActivityProps {
  activity: ActivityItem;
}

export default function ActivityPage({ activity }: ActivityProps) {
  const router = useRouter();

  if (!activity) {
    // router?.push("/404");
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5 p-10">
      <div className="flex-auto">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{activity.title}</CardTitle>
            <CardDescription>{activity.shortDescription}</CardDescription>
            <div className={"flex gap-x-1.5"}>
              <Badge variant="outline">{activity.tags}</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <Carousel className="w-full" opts={{ dragFree: true }}>
              <CarouselContent className="-ml-1">
                <CarouselItem className="pl-1 sm:basis-full md:basis-1/2 xl:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <img
                          alt={`${activity.title}`}
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={activity.imageUrl}
                          width="300"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:max-w-80 lg:min-w-80">
        <Card className="overflow-hidden">
          <CardContent className="mt-8">
            <div className="grid gap-3">
              <div className="font-semibold">Activity Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">City</dt>
                  <dd>{activity.city}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Created</dt>
                  <dd>{moment(activity.createdAt).format("DD.MM.YYYY")}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Updated</dt>
                  <dd>{moment(activity.updatedAt).format("DD.MM.YYYY")}</dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Socials</div>
              <dl className="flex items-center gap-x-6">
                <a href={activity.socialContactURL} target={"_blank"} >
                  <Globe className="h-6 w-6" />
                </a>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <Button className={"rounded-xl bg-green-700 hover:bg-green-900"}>
                Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  console.log("Fetching activity with ID in getServerSideProps:", id);
  try {
    const activity = await getActivityById(id as string);

    if (!activity) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        activity,
      },
    };
  } catch (error) {
    console.error("getServerSideProps Error:", error);
    return {
      notFound: true,
    };
  }
};
