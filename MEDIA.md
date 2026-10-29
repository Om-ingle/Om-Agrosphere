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

## Later additions (supplied October 2026)

| File | What it shows | Where it is used |
| --- | --- | --- |
| `facility-highway-view.jpeg` | Wide view of the blue unit facade from the highway, with both signboards above the entrances | Homepage hero, Gallery → The unit |
| `owner-founder.jpeg` | The owner standing outside the entrance beneath the signboard | About page owner card, Gallery → The team |
| `pulse-green-in-hand.jpg` | Green pulses held in a hand | Gallery → Grain close-ups |
| `pulse-yellow-split-in-hand.jpg` | Yellow split pulses held in a hand | Gallery → Grain close-ups |
| `operations-bag-filling.jpg` | A worker holding a sack open beneath a machine outlet | Gallery → Processing |
| `operations-sacks-and-machinery.jpg` | A large stack of empty sacks inside the shed, machinery behind | Gallery → Processing |
| `machinery-with-output-bags.jpg` | Machine outlets with ribbed hoses feeding sacks below | Gallery → Machinery |
| `machinery-conveyor-interior.jpg` | Bucket elevator and machine inside the shed | Gallery → Machinery |
| `facility-interior-with-equipment.jpg` | Shed interior with machinery, scale and sacks | Gallery → The unit |

The two pulse stills are captioned by colour and form only. The exact pulse
variety is not named until the business confirms it.

`facility-signboard-video-still.jpg` is a darker, low-resolution exterior frame.
The existing `business-signboard-om-agrosphere.jpeg` is clearer, so the video
still is not published.

## Outstanding — still on a placeholder

These slots have no real asset yet. None of them may be filled with stock
photography or with a picture of another plant.

| Slot | What is needed | Where it shows |
| --- | --- | --- |
| `product-animal-feed-bharada` | The finished bharada, close-up and in its sack, at this unit | Product section on the Products page |

The four dal product cards reuse the genuine pulse photographs already in the
gallery (`grain-quality-closeup`, `pulse-green-in-hand`, `pulse-grain-dark`,
`bulk-processed-grain`). Those photographs are captioned by colour and form
only. No photograph has been labelled as tur, moong, urad or chana dal, because
the business has not confirmed which pulse each frame shows.

### Service cards: what was assigned, and how confident to be

The four service cards below were filled from the supplied media, but these are
inferences from what the photographs show — no machine in them is labelled with
the job it does. Swap any of them the moment the business confirms otherwise.

| Service | Image | Basis |
| --- | --- | --- |
| Grain Cleaning | `machinery-detail.jpeg` | Blower plus cyclone separator — the dust and chaff extraction stage. The business's own signboard banner advertises a "गहू फिल्टर मशीन" for धान्य स्वच्छता, which this matches. |
| Agricultural Commodity Buying & Selling | `processed-grain-varieties.jpeg` | Seven sacks of clean grain and pulses, each lot kept separate. Shows material handled by the business, not a buying or selling transaction. |
| Dal Processing | `bulk-processed-grain.jpeg` | Split pulses in bulk in a sack. This is the processed output, not the mill itself. |
| Animal Feed Bharada Preparation | `machinery-with-output-bags.jpg` | Machine outlets feeding sacks below. Used as a picture of the unit's machinery, not as evidence that bharada is shown. |

`machinery-processing-unit.jpeg` appears in the Services page's "Inside the
unit" band. Sorting and grading are no longer offered as separate services, so
their old card assignments were removed.

### Closing the remaining slots

- One photograph of the finished animal feed bharada, close-up and packed.
- Photographs that tie each processing service to the specific machine doing
  that job, or confirmation of which machine does which operation.
- If the business confirms which pulse each existing close-up shows, the dal
  product cards can be relabelled with confidence.

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
