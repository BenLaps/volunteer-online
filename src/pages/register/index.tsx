import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookie } from "cookies-next";

export default function Register() {
  const router = useRouter();
  const { msg } = router.query;

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
            {msg ? <h3 className="text-red-500">{msg}</h3> : <></>}
          </div>
          <form action="/api/signup" method="POST" className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  required
                  minLength={3}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                minLength={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                required
                minLength={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordagain">Password again</Label>
              <Input
                id="passwordagain"
                name="passwordagain"
                type="password"
                placeholder="password again"
                required
                minLength={5}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/volunteer_dog.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const req = context.req;
  const res = context.res;
  let email = getCookie("email", { req, res });

  if (email !== undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: { email: false } };
}
