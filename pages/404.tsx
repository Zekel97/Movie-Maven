import Header from "@/components/Header/header"
import Link from "next/link";

export default function Page404() {
  return (
    <div className="pageNotFound">
      <Header />
      <h1>404 - Page Not Found</h1>

      <Link href={"/"} className={"homepageLink"}>
        Go back to the homepage
      </Link>
    </div>
  );
}