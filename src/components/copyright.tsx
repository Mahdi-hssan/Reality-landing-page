import { cacheLife } from "next/cache";

/** Footer copyright line. Swaps `{year}` for the current year; the cache refreshes daily. */
export async function Copyright({ text }: { text: string }) {
  "use cache";
  cacheLife("days");
  return <p>{text.replace("{year}", String(new Date().getFullYear()))}</p>;
}
