import { Loading } from "@/ui/components/shared/Loading";
import VoteClient from "@/ui/components/Vote/VoteClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function VotePage() {
  return (
    <main className="container py-10">
      <Suspense fallback={<Loading />}>
        <VoteClient />
      </Suspense>
    </main>
  );
}
