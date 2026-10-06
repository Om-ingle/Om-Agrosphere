# Media

All photography and video is declared in `src/content/media.ts`. Nothing on the
site points at an image that is not in that file, and nothing renders an image
that is not a real picture of this business.

## Layout

```
public/images/   photographs, plus one poster frame per video
public/videos/   8 clips
```

## How to publish a photograph

1. Save the optimised file in `public/images/` (long edge ≈ 2000px, compressed;
   Next.js converts it to AVIF/WebP automatically).
2. Set `src` on the slot in `src/content/media.ts` to `/images/<file-name>.jpeg`.
3. Rewrite `alt` so it describes what the photograph actually shows.

No component or page needs to change. The `<Photo>` component renders a
labelled "photograph to be added" panel while `src` is `null`.

## How to publish a clip

1. Save the file in `public/videos/`.
2. Extract a poster frame:
   `ffmpeg -ss <seconds> -i public/videos/<name>.mp4 -frames:v 1 -vf "scale=720:-2" -q:v 3 public/images/poster-<name>.jpeg`
3. Register the poster as a photo slot, then add a video slot referencing it.

Clips never autoplay and never load on page open. `<Video>` shows the poster
still and attaches the player only when the visitor presses play, so a page
carrying all eight clips still opens without downloading any video data.

The clips are portrait phone captures (478×850). They are the lowest-resolution
asset on the site and will look soft on a large display — worth re-shooting
landscape at 1080p or better when convenient.

## Outstanding — still on a placeholder

These slots have no real asset yet. None of them may be filled with stock
photography or with a picture of another plant.

| Slot | What is needed | Where it shows |
| --- | --- | --- |
| `hero-facility` | Wide view of the unit from the highway | Homepage hero |
| `service-cleaning` | The machine that performs cleaning | Service card + service page |
| `service-sorting` | The machine that performs sorting | Service card + service page |
| `service-grading` | The machine that performs grading | Service card + service page |
| `service-dal-milling` | The dal mill in operation | Service card + service page |
| `service-spice-grinding` | Spice grinding, at this unit | Service card + service page |
| `product-corn-grit` | Corn grit, close-up and packed | Products page |
| `product-spice-powders` | Spice powders | Products page |

### Why the five service slots are empty

The supplied photographs show the plant, but nothing in them is labelled with
the job it does. A machine will not be captioned with a service until the
business confirms which machine performs which operation. To close these five
slots, supply either:

- one photograph per service, of the specific machine doing that job, or
- confirmation of which of the existing machines does cleaning, which does
  sorting, which does grading, and which does dal milling.

Spice grinding and corn grit stay empty until a real picture of each exists —
there is currently no evidence either is produced at this unit.

## Notes on what was supplied

- `business-banner-grain-collage.jpeg` is a composite of photographs already in
  the gallery, so it is not published. It can be deleted.
- `grain-unloading.mp4` shows a combine harvester working in the field rather
  than grain being unloaded at the unit. It is captioned to match what it
  actually shows.
- `business-signboard-om-agrosphere.jpeg` and
  `business-banner-wheat-filter-machine.jpeg` are the business's own printed
  signage, not photographs of the plant. They are kept in a separate
  "Our signboard" group so they are not mistaken for pictures of the facility.
- The clips have no captions or transcript. If any visitor-facing claim is made
  in video only, a transcript is needed for accessibility.

## Rules

- Never fill a placeholder with a stock image or another plant's photograph.
- Never caption a machine or product with something the photograph does not
  show. Describe what is visible.
- Alt text is written per language in `media.ts` and describes the picture, not
  keywords.
