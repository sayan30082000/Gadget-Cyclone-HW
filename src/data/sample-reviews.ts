// DESIGN SAMPLES, shown while REVIEWS in site.ts is empty. These are not real customers, and the
// page says so ("Sample reviews, not real customers yet", "Sample name" on every card).
// The first real review in REVIEWS replaces all of them.
import type { Review } from "./site"

export const SAMPLE_REVIEWS: Review[] = [
  {
    name: "Sample name 1",
    area: "Agrabad",
    stars: 5,
    text: "They checked the fit on my phone before I paid, and the case clicked on perfectly.",
    product: "rugged",
  },
  {
    name: "Sample name 2",
    area: "GEC",
    stars: 5,
    text: "The earbuds came the next day and I paid the rider. Battery easily lasts my whole commute.",
    product: "earbuds",
  },
  {
    name: "Sample name 3",
    area: "Halishahar",
    stars: 4,
    text: "The 20,000 mAh bank charges two phones on a long trip. A bit heavy, but worth it.",
    product: "bank20",
  },
  {
    name: "Sample name 4",
    area: "Nasirabad",
    stars: 5,
    text: "I packed charger, cable and glass in the box and got 15% off. Glass was cut for my model.",
    product: "charger",
  },
  {
    name: "Sample name 5",
    area: "Khulshi",
    stars: 5,
    text: "Over-ear headphones for online classes. Quiet inside, and the mic is clear on calls.",
    product: "overear",
  },
  {
    name: "Sample name 6",
    area: "Chawkbazar",
    stars: 4,
    text: "The smart watch shows my notifications and steps. Asked on WhatsApp first, quick answer.",
    product: "watch",
  },
]
