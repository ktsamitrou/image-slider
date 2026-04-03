import { redirect } from "next/navigation";
import { images } from "./data/images";

export default function Home() {
  redirect(`/${images[0].id}`);
}
