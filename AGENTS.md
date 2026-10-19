<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Wedding content lives in `src/lib/wedding.ts`; the cinematic intro is a scene state machine in `src/components/magic/Experience.tsx` — edit details in the config, not in scenes, so all scenes stay in sync.
- Optional videos/music (`/videos/*.mp4`, `/audio/wedding-music.mp3` in `public/`) render only when the file loads — the CSS/SVG fallback must keep working without them.
- Sound effects (`public/audio/sfx/*.mp3`) and background music are played through `src/lib/sfx.ts` only; scene-transition effects are triggered in `Experience.tsx`, and music must start on a user gesture (the seal tap).
- Text animated letter-by-letter via the `Letters` component must use a solid gold fill (`text-gold-crisp`), never a `background-clip: text` gradient utility — a filter on a letter breaks the parent's text clip and the glyphs then paint transparent over the backdrop.
- The opening invitation is a two-sided 3D envelope: `.invite-panel-l` / `.invite-panel-r` rotate outward (±168°) on `is-open`, opened by tap or a >70px horizontal drag — don't revert it to a single hinged cover or a plain button.
- The castle SVG is a flex child; keep `shrink-0` on it or the flex container collapses it to screen width and the castle renders tiny.
