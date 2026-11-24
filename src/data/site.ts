// Everything a shop owner may need to change lives here.

export const SITE = {
  name: "Gadget Cyclone",
  address: "Finlay Square, 4th floor, 2 No. Gate, Chattogram",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Finlay+Square+2+No+Gate+Chattogram",
  // Fill these in to turn on direct WhatsApp / Facebook links.
  // Until then the buttons open WhatsApp with the message ready, and you pick the chat.
  whatsappNumber: "", // e.g. "8801XXXXXXXXX" (country code, no +)
  facebookUrl: "", // e.g. "https://www.facebook.com/your-page"
}

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message)
  return SITE.whatsappNumber
    ? `https://wa.me/${SITE.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`
}

export const TICKER = [
  "Cash on delivery across Chattogram",
  "No advance payment",
  "We check the fit for your phone model",
  "Finlay Square, 4th floor, 2 No. Gate",
  "Order on WhatsApp or Facebook",
  "7-day replacement",
]

export const ROTATING_WORDS = ["Earbuds", "Chargers", "Power banks", "Covers", "Cables"]

export const BRANDS = ["Anker", "Soundcore", "Baseus", "UGREEN", "QCY", "Xiaomi", "JBL", "Joyroom"]

export const PHONE_MODELS = [
  "iPhone 13",
  "iPhone 15",
  "Galaxy A55",
  "Galaxy S23",
  "Redmi Note 13",
  "POCO X6",
  "realme 12",
  "vivo Y28",
  "OPPO A78",
  "Infinix Hot 40",
]

export type Category = {
  id: string
  label: string
  line: string
  items: { name: string; note: string }[]
}

export const CATEGORIES: Category[] = [
  {
    id: "earbuds",
    label: "Earbuds",
    line: "Wireless earbuds, neckbands and over-ear headphones.",
    items: [
      { name: "TWS earbuds", note: "with charging case" },
      { name: "Neckbands", note: "long battery, light" },
      { name: "Over-ear headphones", note: "for long listening" },
    ],
  },
  {
    id: "chargers",
    label: "Chargers",
    line: "Fast chargers and cables that match your phone's port.",
    items: [
      { name: "Fast wall chargers", note: "USB-C PD" },
      { name: "Cables", note: "USB-C, Lightning, micro-USB" },
      { name: "Car chargers", note: "dual port" },
    ],
  },
  {
    id: "power",
    label: "Power banks",
    line: "Pocket to backpack size, for long days out.",
    items: [
      { name: "10,000 mAh", note: "pocket size" },
      { name: "20,000 mAh", note: "two phones, one day" },
      { name: "Magnetic packs", note: "snap on the back" },
    ],
  },
  {
    id: "covers",
    label: "Covers",
    line: "Cases and screen protectors for your exact model.",
    items: [
      { name: "Clear cases", note: "show the phone" },
      { name: "Rugged cases", note: "for drops" },
      { name: "Screen protectors", note: "cut for your model" },
    ],
  },
  {
    id: "more",
    label: "Watches & speakers",
    line: "Smart watches and small Bluetooth speakers.",
    items: [
      { name: "Smart watches", note: "notifications + fitness" },
      { name: "Bluetooth speakers", note: "pocket to party" },
      { name: "Straps & docks", note: "extras" },
    ],
  },
]

export type Kit = {
  name: string
  price: number
  line: string
  items: string[]
  pick?: boolean
}

export const KITS: Kit[] = [
  {
    name: "Starter kit",
    price: 990,
    line: "The basics for a new phone.",
    items: ["Fast charger", "Matching cable", "Clear case", "Screen protector"],
  },
  {
    name: "Power kit",
    price: 3190,
    line: "For long days away from a plug.",
    items: ["20,000 mAh power bank", "Fast charger", "2 cables", "Rugged case"],
    pick: true,
  },
  {
    name: "Audio kit",
    price: 1849,
    line: "Music and calls, sorted.",
    items: ["Wireless earbuds", "Earbud case cover", "Cable", "Ear tips"],
  },
]

export const STEPS = [
  { title: "Message us", text: "Tell us your phone model on WhatsApp or Facebook, or walk in." },
  { title: "We check the fit", text: "We match the case, cable or charger to your exact model." },
  { title: "Pay the rider", text: "Cash on delivery inside Chattogram city. No advance." },
]

export const ASKS = [
  "Do you have a case for Galaxy A55?",
  "Is the 20,000 mAh one fast charging?",
  "Which earbuds are good for calls?",
  "Can you deliver to Agrabad today?",
  "Cable for iPhone 15? USB-C right?",
  "Do I pay before delivery?",
  "Clear case or rugged for a Redmi?",
  "Where exactly is the shop?",
]

export const FAQS = [
  {
    q: "Do I have to pay before delivery?",
    a: "No. Inside Chattogram city you pay the rider when the order arrives. No advance.",
  },
  {
    q: "Where is the shop?",
    a: "Finlay Square, 4th floor, near 2 No. Gate, Chattogram. You can walk in and check things before you buy.",
  },
  {
    q: "Do you sell phones?",
    a: "No. We only sell accessories: earbuds, chargers, cables, power banks, covers, watches and speakers.",
  },
  {
    q: "How do I know it fits my phone?",
    a: "Tell us your exact model when you order. We check the case, cable or charger against it before we pack it.",
  },
  {
    q: "Are the kit prices fixed?",
    a: "The prices on this page are samples. Message us for today's price and stock.",
  },
]
