import { useEffect, useRef, useState } from "react";
import { InvitationScene, PlatformScene, JourneyScene, CastleScene, HallScene } from "./Scenes";
import { WeddingSite } from "./WeddingSite";
import { playSfx } from "@/lib/sfx";

type Scene = "invite" | "platform" | "journey" | "castle" | "hall" | "site";

export function Experience() {
  const [scene, setScene] = useState<Scene>("invite");
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pause all CSS animations while the tab is hidden (performance)
  useEffect(() => {
    const onVis = () => document.documentElement.classList.toggle("page-hidden", document.hidden);
    document.addEventListener("visibilitychange", onVis);
    onVis();
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Scene transition sound effects (one per scene entry)
  const lastSfx = useRef<Scene | null>(null);
  useEffect(() => {
    if (scene === lastSfx.current) return;
    lastSfx.current = scene;
    if (scene === "platform") playSfx("whoosh");
    if (scene === "journey") playSfx("whistle");
    if (scene === "castle") playSfx("chime");
    if (scene === "hall") playSfx("whoosh", 0.4);
  }, [scene]);

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
    </>
  );
}
