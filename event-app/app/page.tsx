import { redirect } from "next/navigation";

export default function Home() {
  redirect("25-spring")

  // 一旦無視
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">

    </div>
  );
}
