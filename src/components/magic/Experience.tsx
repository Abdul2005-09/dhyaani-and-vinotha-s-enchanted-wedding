import { useEffect, useState } from "react";
import { InvitationScene, PlatformScene, JourneyScene, CastleScene, HallScene } from "./Scenes";
import { WeddingSite } from "./WeddingSite";

type Scene = "invite" | "platform" | "journey" | "castle" | "hall" | "site";

export function Experience() {
  const [scene, setScene] = useState<Scene>("invite");
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const journeyMs = reduced ? 1500 : 7500;
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (scene === "journey") t = setTimeout(() => setScene("castle"), journeyMs);
    if (scene === "castle") t = setTimeout(() => setScene("hall"), reduced ? 1500 : 7000);
    if (scene === "hall") t = setTimeout(() => setScene("site"), reduced ? 1200 : 4200);
    if (scene === "site") window.scrollTo(0, 0);
    return () => clearTimeout(t);
  }, [scene, reduced, journeyMs]);

  return (
    <>
      {scene === "invite" && <InvitationScene onDone={() => setScene("platform")} />}
      {scene === "platform" && <PlatformScene onBoard={() => setScene("journey")} />}
      {scene === "journey" && <JourneyScene duration={journeyMs} />}
      {scene === "castle" && <CastleScene />}
      {scene === "hall" && <HallScene />}
      {scene === "site" && <WeddingSite />}
      {scene !== "site" && (
        <button onClick={() => setScene("site")} className="btn-ghost-gold fixed right-4 top-4 z-50 rounded-full px-4 py-2 text-[0.6rem]">
          SKIP INTRO
        </button>
      )}
    </>
  );
}
