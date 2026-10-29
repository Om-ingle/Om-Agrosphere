import type { L } from '@/lib/i18n';

/**
 * Media registry — photographs and video.
 *
 * Every image and clip on the site is declared here. A slot is either:
 *
 *   • a REAL asset — `src` points at a file in `public/`, and `alt` describes
 *     what is actually visible in it. Slots holding real media are named after
 *     their file, so the registry maps one-to-one onto `public/images/`.
 *
 *   • a PENDING slot — `src` is `null`, and the <Photo> component renders a
 *     clearly labelled "photograph to be added" panel. Pending slots are named
 *     after the *need* (product-animal-feed-bharada, …) rather than a file,
 *     because no file exists yet.
 *
 * A pending slot is never filled with stock imagery or with a photograph of
 * somebody else's plant. Only the business can close a pending slot, by
 * supplying the picture. See `MEDIA.md` for the outstanding list.
 *
 * ── To publish a photograph ─────────────────────────────────────────────────
 *   1. Save the optimised file in `public/images/` (long edge ≈ 2000px).
 *   2. Set `src` below to `/images/<file-name>.jpeg`.
 *   3. Rewrite `alt` to describe what the photograph actually shows.
 * No other file needs to change.
 */
export type PhotoSlot = {
  /** Public path once supplied, e.g. `/images/facility-exterior.jpeg`. */
  src: string | null;
  /** What the photograph shows — rendered in the pending-photo panel. */
  subject: L;
  /** Alt text for screen readers and image search. Describe, don't keyword-stuff. */
  alt: L;
  /**
   * Crop anchor. Several of these photographs are tall phone portraits; a
   * centre crop of an entrance shot loses the signboard at the top. Defaults
   * to a centre crop.
   */
  focus?: 'top' | 'center' | 'bottom';
};

export type PhotoKey = keyof typeof photos;

export const photos = {
  /* ── Services and products ───────────────────────────────────────────────
   * These slots are keyed by need rather than by file, because the service and
   * product definitions in `services.ts` / `products.ts` reference them by name.
   * A `src` of `null` renders the pending panel. See MEDIA.md for what is
   * still outstanding and why.
   * ---------------------------------------------------------------------- */

  'hero-facility': {
    src: '/images/facility-highway-view.jpeg',
    subject: { en: 'Processing unit, wide view', mr: 'प्रक्रिया युनिटचे विस्तृत दृश्य' },
    alt: {
      en: 'The wide blue facade of the Om Agrosphere unit on the Dhule–Solapur Highway, with the business signboards above the entrances',
      mr: 'धुळे–सोलापूर महामार्गावरील ओम अ‍ॅग्रोस्फिअर युनिटचा निळा दर्शनी भाग, प्रवेशद्वारांवर व्यवसायाचे साइनबोर्ड',
    },
  },
  'service-cleaning': {
    src: '/images/machinery-detail.jpeg',
    subject: { en: 'Blower and cyclone separator', mr: 'ब्लोअर व सायक्लोन विभाजक' },
    alt: {
      en: 'The blower and cyclone separator on the cleaning line, with a sack tied at the top of the cone',
      mr: 'स्वच्छता रांगेतील ब्लोअर व सायक्लोन विभाजक, शंकूच्या वर बांधलेले पोते',
    },
  },
  'service-dal-milling': {
    src: '/images/bulk-processed-grain.jpeg',
    subject: { en: 'Split pulses in bulk', mr: 'मोठ्या प्रमाणातील फुटलेली डाळ' },
    alt: {
      en: 'Split pulses filling an open sack at the unit',
      mr: 'युनिटमध्ये उघड्या पोत्यात भरलेली फुटलेली डाळ',
    },
  },
  // No photograph of the finished bharada exists in the supplied media, so this
  // stays on the pending panel rather than borrowing an image of something else.
  'product-animal-feed-bharada': {
    src: null,
    subject: { en: 'Animal feed bharada', mr: 'पशुखाद्य भरडा' },
    alt: {
      en: 'Animal feed bharada prepared at the Om Agrosphere unit',
      mr: 'ओम अ‍ॅग्रोस्फिअर युनिटमध्ये तयार केलेला पशुखाद्य भरडा',
    },
  },

  /* ── The unit ──────────────────────────────────────────────────────────── */

  'facility-exterior': {
    src: '/images/facility-exterior.jpeg',
    // The signboard sits at the top of a tall frame — anchor the crop there.
    focus: 'top',
    subject: { en: 'Unit entrance under the signboard', mr: 'साइनबोर्डाखालील युनिटचे प्रवेशद्वार' },
    alt: {
      en: 'The entrance to the Om Agrosphere unit, with the signboard above and staff standing below it holding grain',
      mr: 'ओम अ‍ॅग्रोस्फिअर युनिटचे प्रवेशद्वार, वर साइनबोर्ड व खाली धान्य हातात धरून उभे असलेले कर्मचारी',
    },
  },
  'team-at-entrance': {
    src: '/images/team-at-entrance.jpeg',
    focus: 'top',
    subject: { en: 'Team at the unit entrance', mr: 'युनिटच्या प्रवेशद्वारावर मंडळी' },
    alt: {
      en: 'Two members of the team standing beneath the Om Agrosphere signboard at the unit entrance, holding grain',
      mr: 'युनिटच्या प्रवेशद्वारावर ओम अ‍ॅग्रोस्फिअर साइनबोर्डाखाली धान्य हातात धरून उभे असलेले दोन कर्मचारी',
    },
  },
  'facility-interior-with-equipment': {
    src: '/images/facility-interior-with-equipment.jpg',
    subject: { en: 'Inside the processing shed', mr: 'प्रक्रिया शेडच्या आत' },
    alt: {
      en: 'Inside the corrugated shed, with green and yellow processing machinery, a weighing scale and sacks of material',
      mr: 'पन्हाळी शेडच्या आत — हिरवे-पिवळे प्रक्रिया यंत्र, काटा व मालाची पोती',
    },
  },

  /* ── Machinery ─────────────────────────────────────────────────────────── */

  'machinery-processing-unit': {
    src: '/images/machinery-processing-unit.jpeg',
    subject: { en: 'The processing machine', mr: 'प्रक्रिया यंत्र' },
    alt: {
      en: 'The green and yellow processing machine, with bucket elevators, hoppers and ribbed hoses discharging into sacks',
      mr: 'हिरवे-पिवळे प्रक्रिया यंत्र — बादली लिफ्ट, हॉपर व पोत्यांमध्ये सोडणारे नालीदार नळ',
    },
  },
  'machinery-grain-processing': {
    src: '/images/machinery-grain-processing.jpeg',
    subject: { en: 'Machine side view', mr: 'यंत्राचे बाजूचे दृश्य' },
    alt: {
      en: 'Side view of the grain processing machine, showing its hoppers, elevators and drive units',
      mr: 'धान्य प्रक्रिया यंत्राचे बाजूचे दृश्य — हॉपर, लिफ्ट व चालक यंत्रणा',
    },
  },
  'machinery-detail': {
    src: '/images/machinery-detail.jpeg',
    subject: { en: 'Separator and blower unit', mr: 'विभाजक व ब्लोअर युनिट' },
    alt: {
      en: 'The orange blower and cyclone separator in the shed, with its ducting and a sack tied at the top of the cone',
      mr: 'शेडमधील नारिंगी ब्लोअर व सायक्लोन विभाजक, त्याचे नळ व शंकूच्या वर बांधलेले पोते',
    },
  },
  'machinery-with-output-bags': {
    src: '/images/machinery-with-output-bags.jpg',
    subject: { en: 'Outlets above waiting sacks', mr: 'आउटलेटखाली ठेवलेली पोती' },
    alt: {
      en: 'The green and yellow processing machine, with ribbed hoses feeding into sacks below its outlets',
      mr: 'हिरवे-पिवळे प्रक्रिया यंत्र, आउटलेटखाली पोत्यांमध्ये जाणारे नालीदार नळ',
    },
  },
  'machinery-conveyor-interior': {
    src: '/images/machinery-conveyor-interior.jpg',
    subject: { en: 'Conveying equipment inside the shed', mr: 'शेडमधील वाहक यंत्रणा' },
    alt: {
      en: 'A tall white bucket elevator and blue machine standing inside the shed, with ducting and sacks at the base',
      mr: 'शेडमध्ये उभे असलेले उंच पांढरे बादली लिफ्ट व निळे यंत्र, खाली नळ व पोती',
    },
  },

  /* ── The people ────────────────────────────────────────────────────────── */

  'operations-team': {
    src: '/images/operations-team.jpeg',
    subject: { en: 'The people who run the unit', mr: 'युनिट चालवणारी मंडळी' },
    alt: {
      en: 'Three members of the unit team standing at the processing machine, holding grain',
      mr: 'प्रक्रिया यंत्राजवळ धान्य हातात धरून उभे असलेले युनिटचे तीन कर्मचारी',
    },
  },
  'team-at-facility': {
    src: '/images/team-at-facility.jpeg',
    subject: { en: 'Team at the machine', mr: 'यंत्राजवळ मंडळी' },
    alt: {
      en: 'The unit team standing beside the processing machine and weighing scale inside the shed',
      mr: 'शेडमध्ये प्रक्रिया यंत्र व काट्याजवळ उभे असलेले युनिटचे कर्मचारी',
    },
  },
  'owner-founder': {
    src: '/images/owner-founder.jpeg',
    focus: 'top',
    subject: { en: 'The owner at the unit', mr: 'युनिटमध्ये मालक' },
    alt: {
      en: 'The owner of Om Agrosphere standing in front of the unit entrance, below the business signboard',
      mr: 'ओम अ‍ॅग्रोस्फिअरचे मालक युनिटच्या प्रवेशद्वारासमोर, व्यवसायाच्या साइनबोर्डाखाली उभे असताना',
    },
  },

  /* ── Processed material ────────────────────────────────────────────────── */

  'cleaned-grain-in-hand': {
    src: '/images/cleaned-grain-in-hand.jpeg',
    subject: { en: 'Cleaned grain in hand', mr: 'हातातील स्वच्छ केलेले धान्य' },
    alt: {
      en: 'A handful of cleaned grain held up to the camera at the unit',
      mr: 'युनिटमध्ये कॅमेऱ्यासमोर हातात धरलेले स्वच्छ केलेले धान्य',
    },
  },
  'pulse-green-in-hand': {
    src: '/images/pulse-green-in-hand.jpg',
    subject: { en: 'Green pulses in hand', mr: 'हातातील हिरवी डाळ' },
    alt: {
      en: 'A handful of green pulses held in an open palm',
      mr: 'उघड्या तळहातात धरलेली हिरवी डाळ',
    },
  },
  'pulse-yellow-split-in-hand': {
    src: '/images/pulse-yellow-split-in-hand.jpg',
    subject: { en: 'Yellow split pulses in hand', mr: 'हातातील पिवळी फुटलेली डाळ' },
    alt: {
      en: 'A handful of yellow split pulses held in the palm of a hand',
      mr: 'तळहातात धरलेली पिवळी फुटलेली डाळ',
    },
  },
  'grain-quality-closeup': {
    src: '/images/grain-quality-closeup.jpeg',
    subject: { en: 'Split pulses in an open sack', mr: 'उघड्या पोत्यातील फुटलेली डाळ' },
    alt: {
      en: 'Split pulses held in an open white sack, shown close up to display the grade',
      mr: 'प्रतीचे दर्शन घडवण्यासाठी उघड्या पांढऱ्या पोत्यात धरलेली फुटलेली डाळ, जवळून',
    },
  },
  'processed-grain-varieties': {
    src: '/images/processed-grain-varieties.jpeg',
    subject: { en: 'Different grains, side by side', mr: 'वेगवेगळे धान्य, शेजारी शेजारी' },
    alt: {
      en: 'Seven open sacks in a row, each holding a different grain or pulse processed at the unit',
      mr: 'रांगेत ठेवलेली सात उघडी पोती, प्रत्येकात युनिटमध्ये प्रक्रिया केलेले वेगळे धान्य किंवा डाळ',
    },
  },
  'processed-grain-bags': {
    src: '/images/processed-grain-bags.jpeg',
    subject: { en: 'Filled and tied sacks', mr: 'भरलेली व बांधलेली पोती' },
    alt: {
      en: 'Processed grain filled into woven sacks, tied and stacked ready for dispatch',
      mr: 'प्रक्रिया केलेले धान्य भरून बांधलेली व पाठवणीसाठी रचलेली पोती',
    },
  },
  'packaged-grain-bags': {
    src: '/images/packaged-grain-bags.jpeg',
    subject: { en: 'Packed for supply', mr: 'पुरवठ्यासाठी पॅक केलेले' },
    alt: {
      en: 'Two clear bags of processed grain packed and ready to be supplied',
      mr: 'पुरवठ्यासाठी पॅक केलेल्या प्रक्रिया केलेल्या धान्याच्या दोन पारदर्शक पिशव्या',
    },
  },
  'bulk-processed-grain': {
    src: '/images/bulk-processed-grain.jpeg',
    subject: { en: 'Bulk processed grain', mr: 'मोठ्या प्रमाणातील प्रक्रिया धान्य' },
    alt: {
      en: 'A bulk heap of processed split pulses at the unit',
      mr: 'युनिटमध्ये मोठ्या प्रमाणात असलेली प्रक्रिया केलेली फुटलेली डाळ',
    },
  },
  'processed-grain-closeup': {
    src: '/images/processed-grain-closeup.jpeg',
    subject: { en: 'Processed grain, close up', mr: 'प्रक्रिया धान्य, जवळून' },
    alt: {
      en: 'Close view of processed grain and split pulses at the unit',
      mr: 'युनिटमधील प्रक्रिया केलेले धान्य व फुटलेली डाळ, जवळून',
    },
  },
  'processed-pulse-mix': {
    src: '/images/processed-pulse-mix.jpeg',
    subject: { en: 'Mixed pulses, close up', mr: 'मिसळलेली डाळ, जवळून' },
    alt: {
      en: 'A mix of differently coloured split pulses, shown close up',
      mr: 'वेगवेगळ्या रंगांची मिसळलेली फुटलेली डाळ, जवळून',
    },
  },
  'pulse-grain-dark': {
    src: '/images/pulse-grain-dark.jpeg',
    subject: { en: 'Dark split pulses', mr: 'गडद रंगाची फुटलेली डाळ' },
    alt: {
      en: 'Dark-coloured split pulses, shown close up',
      mr: 'गडद रंगाची फुटलेली डाळ, जवळून',
    },
  },
  'processed-grain-light': {
    src: '/images/processed-grain-light.jpeg',
    subject: { en: 'Light split pulses', mr: 'फिकट रंगाची फुटलेली डाळ' },
    alt: {
      en: 'Light-coloured split pulses, shown close up',
      mr: 'फिकट रंगाची फुटलेली डाळ, जवळून',
    },
  },
  'grain-closeup-detail': {
    src: '/images/grain-closeup-detail.jpeg',
    subject: { en: 'Grain detail', mr: 'धान्याचा तपशील' },
    alt: {
      en: 'Detail view of processed grain and pulses at the unit',
      mr: 'युनिटमधील प्रक्रिया केलेले धान्य व डाळ यांचा तपशील',
    },
  },

  /* ── The business's own signage ────────────────────────────────────────── */

  'operations-bag-filling': {
    src: '/images/operations-bag-filling.jpg',
    subject: { en: 'Filling a sack at the outlet', mr: 'आउटलेटवर पोते भरणे' },
    alt: {
      en: 'A worker holding a sack open beneath the outlet of the green processing machine as material runs in',
      mr: 'हिरव्या प्रक्रिया यंत्राच्या आउटलेटखाली पोते उघडे धरून माल भरताना कामगार',
    },
  },
  'operations-sacks-and-machinery': {
    src: '/images/operations-sacks-and-machinery.jpg',
    subject: { en: 'Sacks stacked in the shed', mr: 'शेडमध्ये रचलेली पोती' },
    alt: {
      en: 'A large stack of empty woven sacks inside the shed, with processing machinery standing behind it',
      mr: 'शेडमध्ये रचलेल्या रिकाम्या विणलेल्या पोत्यांचा मोठा ढीग, मागे उभे प्रक्रिया यंत्र',
    },
  },

  /* ── The business's own signage ────────────────────────────────────────── */

  'business-signboard-om-agrosphere': {
    src: '/images/business-signboard-om-agrosphere.jpeg',
    subject: { en: 'Unit signboard', mr: 'युनिटचा साइनबोर्ड' },
    alt: {
      en: 'The Om Agrosphere signboard, showing the business name, its Marathi tagline and the contact numbers',
      mr: 'ओम अ‍ॅग्रोस्फिअर साइनबोर्ड — व्यवसायाचे नाव, मराठी घोषवाक्य व संपर्क क्रमांक',
    },
  },
  'business-banner-wheat-filter-machine': {
    src: '/images/business-banner-wheat-filter-machine.jpeg',
    subject: { en: 'Wheat filter machine banner', mr: 'गहू फिल्टर मशीन फलक' },
    alt: {
      en: "Om Agrosphere's banner advertising its wheat filter machine, naming the grains it cleans and the contact number",
      mr: 'ओम अ‍ॅग्रोस्फिअरचा गहू फिल्टर मशीनचा फलक — स्वच्छ केल्या जाणाऱ्या धान्यांची नावे व संपर्क क्रमांक',
    },
  },

  /* ── Video poster frames ──────────────────────────────────────────────────
   * Real frames lifted from the business's own clips, used as the still shown
   * before playback. They are not part of any gallery group.
   * ---------------------------------------------------------------------- */

  'poster-farm-harvesting': {
    src: '/images/poster-farm-harvesting.jpeg',
    subject: { en: 'Ripe crop before harvest', mr: 'कापणीपूर्वीचे पिकलेले पीक' },
    alt: {
      en: 'A field of ripe grain standing ready for harvest under a clear sky',
      mr: 'निरभ्र आकाशाखाली कापणीसाठी तयार उभे असलेले पिकलेले धान्याचे शेत',
    },
  },
  'poster-grain-unloading': {
    src: '/images/poster-grain-unloading.jpeg',
    subject: { en: 'Combine harvester at work', mr: 'कापणी यंत्र काम करताना' },
    alt: {
      en: 'A green combine harvester cutting through a ripe crop, with chaff blowing out behind it',
      mr: 'पिकलेल्या पिकातून जाणारे हिरवे कापणी यंत्र, मागे भुसा उडत असताना',
    },
  },
  'poster-grain-processing-machine': {
    src: '/images/poster-grain-processing-machine.jpeg',
    subject: { en: 'Worker at the machine', mr: 'यंत्राजवळ कामगार' },
    alt: {
      en: 'Inside the processing shed, with a worker in a white shirt at the green and yellow machinery',
      mr: 'प्रक्रिया शेडमध्ये, हिरव्या-पिवळ्या यंत्राजवळ पांढऱ्या शर्टातील कामगार',
    },
  },
  'poster-grain-processing-output': {
    src: '/images/poster-grain-processing-output.jpeg',
    subject: { en: 'Filling a sack at the outlet', mr: 'आउटलेटवर पोते भरताना' },
    alt: {
      en: "A worker crouching to fill a yellow sack from the machine's outlet",
      mr: 'यंत्राच्या आउटलेटवरून पिवळे पोते भरण्यासाठी खाली बसलेला कामगार',
    },
  },
  'poster-machine-operation': {
    src: '/images/poster-machine-operation.jpeg',
    subject: { en: 'The complete machine', mr: 'संपूर्ण यंत्र' },
    alt: {
      en: 'The complete processing machine inside the shed — two bucket elevators, hoppers, the main body and drive motors',
      mr: 'शेडमधील संपूर्ण प्रक्रिया यंत्र — दोन बादली लिफ्ट, हॉपर, मुख्य भाग व चालक मोटारी',
    },
  },
  'poster-grain-processing-closeup': {
    src: '/images/poster-grain-processing-closeup.jpeg',
    subject: { en: 'Grain leaving the machine', mr: 'यंत्रातून धान्य बाहेर पडताना' },
    alt: {
      en: 'Processed grain pouring from the machine outlet into a sack held open by a worker',
      mr: 'यंत्राच्या आउटलेटवरून, कामगाराने उघडे धरलेल्या पोत्यात प्रक्रिया केलेले धान्य पडताना',
    },
  },
  'poster-facility-operations': {
    src: '/images/poster-facility-operations.jpeg',
    subject: { en: 'Machine and ducting outside', mr: 'बाहेरील यंत्र व नळ' },
    alt: {
      en: 'The blue and white machine and its ducting mounted on a steel frame at the unit',
      mr: 'युनिटमध्ये लोखंडी चौकटीवर बसवलेले निळे-पांढरे यंत्र व त्याचे नळ',
    },
  },
  'poster-processing-line-interior': {
    src: '/images/poster-processing-line-interior.jpeg',
    subject: { en: 'Bulk grain on the shed floor', mr: 'शेडच्या जमिनीवरील मोठा धान्याचा ढीग' },
    alt: {
      en: 'A large heap of grain spread across the shed floor, with a rake standing in it',
      mr: 'शेडच्या जमिनीवर पसरलेला धान्याचा मोठा ढीग, त्यात उभी असलेली विळवण',
    },
  },
} satisfies Record<string, PhotoSlot>;

export function photo(key: PhotoKey): PhotoSlot {
  return photos[key];
}

/* ── Video ─────────────────────────────────────────────────────────────────
 * Clips are portrait phone captures (~478×850), so they are never upscaled
 * beyond the width they were shot at. Nothing here autoplays: <Video> shows
 * the poster frame and only attaches a player when the visitor asks for it,
 * so a page carrying eight clips still downloads no video data on load.
 * ---------------------------------------------------------------------- */

export type VideoSlot = {
  /** Public path, e.g. `/videos/farm-harvesting.mp4`. */
  src: string;
  /** Registry key of the poster frame — a real still from this clip. */
  poster: PhotoKey;
  /** Short label for the clip. */
  title: L;
  /** One line describing what the clip shows. */
  caption: L;
};

export type VideoKey = keyof typeof videos;

export const videos = {
  'farm-harvesting': {
    src: '/videos/farm-harvesting.mp4',
    poster: 'poster-farm-harvesting',
    title: { en: 'The crop before it is cut', mr: 'कापणीपूर्वीचे पीक' },
    caption: {
      en: 'A field of ripe grain standing in the sun, ready for harvest.',
      mr: 'ऊनात उभे असलेले पिकलेले धान्याचे शेत, कापणीसाठी तयार.',
    },
  },
  'grain-unloading': {
    src: '/videos/grain-unloading.mp4',
    poster: 'poster-grain-unloading',
    title: { en: 'Harvesting in the field', mr: 'शेतात कापणी' },
    caption: {
      en: 'A combine harvester moving through the crop, cutting and threshing as it goes.',
      mr: 'पिकातून जाणारे कापणी यंत्र, कापणी व मळणी एकाच वेळी करताना.',
    },
  },
  'machine-operation': {
    src: '/videos/machine-operation.mp4',
    poster: 'poster-machine-operation',
    title: { en: 'The machine line', mr: 'यंत्राची रांग' },
    caption: {
      en: 'The full processing machine inside the shed — bucket elevators, hoppers, main body and drive motors.',
      mr: 'शेडमधील संपूर्ण प्रक्रिया यंत्र — बादली लिफ्ट, हॉपर, मुख्य भाग व चालक मोटारी.',
    },
  },
  'grain-processing-machine': {
    src: '/videos/grain-processing-machine.mp4',
    poster: 'poster-grain-processing-machine',
    title: { en: 'Working at the machine', mr: 'यंत्रावर काम' },
    caption: {
      en: 'A worker at the machine inside the shed, with material moving through the line.',
      mr: 'शेडमधील यंत्रावर काम करणारा कामगार, रांगेतून माल जात असताना.',
    },
  },
  'grain-processing-output': {
    src: '/videos/grain-processing-output.mp4',
    poster: 'poster-grain-processing-output',
    title: { en: 'Filling at the outlet', mr: 'आउटलेटवर पोते भरणे' },
    caption: {
      en: 'A worker filling sacks from the machine outlet as the processed material comes through.',
      mr: 'प्रक्रिया केलेला माल येत असताना यंत्राच्या आउटलेटवरून पोती भरणारा कामगार.',
    },
  },
  'grain-processing-closeup': {
    src: '/videos/grain-processing-closeup.mp4',
    poster: 'poster-grain-processing-closeup',
    title: { en: 'Grain leaving the machine', mr: 'यंत्रातून धान्य बाहेर पडणे' },
    caption: {
      en: 'Processed grain running from the outlet while a worker holds the sack open beneath it.',
      mr: 'आउटलेटवरून प्रक्रिया केलेले धान्य पडत असताना खाली पोते उघडे धरणारा कामगार.',
    },
  },
  'processing-line-interior': {
    src: '/videos/processing-line-interior.mp4',
    poster: 'poster-processing-line-interior',
    title: { en: 'Bulk grain in the shed', mr: 'शेडमधील मोठ्या प्रमाणातील धान्य' },
    caption: {
      en: 'A large heap of grain on the shed floor, being turned over with a rake.',
      mr: 'शेडच्या जमिनीवरील धान्याचा मोठा ढीग, विळवणीने उलटून देताना.',
    },
  },
  'facility-operations': {
    src: '/videos/facility-operations.mp4',
    poster: 'poster-facility-operations',
    title: { en: 'Plant outside the shed', mr: 'शेडबाहेरील यंत्रणा' },
    caption: {
      en: 'The machine and ducting mounted on its steel frame at the unit.',
      mr: 'युनिटमध्ये लोखंडी चौकटीवर बसवलेले यंत्र व नळ.',
    },
  },
} satisfies Record<string, VideoSlot>;

export function video(key: VideoKey): VideoSlot {
  return videos[key];
}

/** Gallery grouping. */
export const galleryCategories = [
  {
    id: 'facility',
    title: { en: 'The unit', mr: 'युनिट' } satisfies L,
    items: [
      'hero-facility',
      'facility-exterior',
      'team-at-entrance',
      'facility-interior-with-equipment',
    ] as PhotoKey[],
  },
  {
    id: 'machinery',
    title: { en: 'Machinery', mr: 'यंत्रसामग्री' } satisfies L,
    items: [
      'machinery-processing-unit',
      'machinery-grain-processing',
      'machinery-detail',
      'machinery-with-output-bags',
      'machinery-conveyor-interior',
    ] as PhotoKey[],
  },
  {
    id: 'processing',
    title: { en: 'Processing', mr: 'प्रक्रिया' } satisfies L,
    items: [
      'operations-bag-filling',
      'operations-sacks-and-machinery',
      'grain-quality-closeup',
      'processed-grain-closeup',
      'processed-pulse-mix',
      'grain-closeup-detail',
    ] as PhotoKey[],
  },
  {
    id: 'products',
    title: { en: 'Processed material', mr: 'प्रक्रिया केलेला माल' } satisfies L,
    items: [
      'processed-grain-varieties',
      'packaged-grain-bags',
      'processed-grain-bags',
      'bulk-processed-grain',
    ] as PhotoKey[],
  },
  {
    id: 'grain',
    title: { en: 'Grain close-ups', mr: 'धान्य जवळून' } satisfies L,
    items: [
      'cleaned-grain-in-hand',
      'pulse-green-in-hand',
      'pulse-yellow-split-in-hand',
      'pulse-grain-dark',
      'processed-grain-light',
    ] as PhotoKey[],
  },
  {
    id: 'people',
    title: { en: 'The team', mr: 'कर्मचारी' } satisfies L,
    items: ['owner-founder', 'operations-team', 'team-at-facility'] as PhotoKey[],
  },
  {
    id: 'signage',
    title: { en: 'Our signboard', mr: 'आमचा साइनबोर्ड' } satisfies L,
    items: [
      'business-signboard-om-agrosphere',
      'business-banner-wheat-filter-machine',
    ] as PhotoKey[],
  },
] as const;

/** Every clip in the registry, in the order the gallery presents them. */
export const galleryVideos = [
  'machine-operation',
  'grain-processing-machine',
  'grain-processing-output',
  'grain-processing-closeup',
  'processing-line-interior',
  'facility-operations',
  'farm-harvesting',
  'grain-unloading',
] as VideoKey[];
