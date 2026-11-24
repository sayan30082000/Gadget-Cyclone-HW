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

// Shop rows (round 2: one swipe carousel per category, 6 item types each)
export const CATEGORIES: Category[] = [
  {
    id: "earbuds",
    label: "Earbuds & audio",
    line: "Wireless earbuds, neckbands and headphones.",
    items: [
      { name: "TWS earbuds", note: "with charging case" },
      { name: "ANC earbuds", note: "blocks outside noise" },
      { name: "Neckbands", note: "long battery, light" },
      { name: "Over-ear headphones", note: "for long listening" },
      { name: "Gaming headsets", note: "mic on a boom" },
      { name: "Wired earphones", note: "no charging needed" },
    ],
  },
  {
    id: "chargers",
    label: "Chargers & cables",
    line: "Matched to your phone's port and fast-charge type.",
    items: [
      { name: "20W fast chargers", note: "USB-C PD" },
      { name: "33-65W chargers", note: "for phones that support it" },
      { name: "USB-C cables", note: "1 m and 2 m" },
      { name: "Lightning cables", note: "older iPhones" },
      { name: "Car chargers", note: "dual port" },
      { name: "Wireless chargers", note: "pads and stands" },
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
      { name: "Fast-charge banks", note: "PD output" },
      { name: "Mini banks", note: "lipstick size" },
      { name: "Banks with cables", note: "cable built in" },
    ],
  },
  {
    id: "covers",
    label: "Covers & protection",
    line: "Cases and screen protectors for your exact model.",
    items: [
      { name: "Clear cases", note: "show the phone" },
      { name: "Rugged cases", note: "for drops" },
      { name: "Silicone cases", note: "soft grip" },
      { name: "Wallet cases", note: "cards inside" },
      { name: "Tempered glass", note: "cut for your model" },
      { name: "Camera lens guards", note: "small, easy to miss" },
    ],
  },
  {
    id: "more",
    label: "Watches & speakers",
    line: "Smart watches and Bluetooth speakers.",
    items: [
      { name: "Smart watches", note: "notifications + fitness" },
      { name: "Fitness bands", note: "light, long battery" },
      { name: "Watch straps", note: "swap the look" },
      { name: "Mini speakers", note: "fits a pocket" },
      { name: "Party speakers", note: "loud, with lights" },
      { name: "Phone holders", note: "desk and bike" },
    ],
  },
]

// Kit builder (round 2). Sample prices. 3 or more items = 15% off, rounded to the nearest Tk 10.
export type KitItem = { id: string; name: string; price: number; group: string }

export const KIT_ITEMS: KitItem[] = [
  { id: "charger", name: "20W fast charger", price: 450, group: "Charging" },
  { id: "cable", name: "USB-C cable", price: 250, group: "Charging" },
  { id: "cable2", name: "Second cable", price: 250, group: "Charging" },
  { id: "car", name: "Car charger", price: 550, group: "Charging" },
  { id: "bank10", name: "10,000 mAh power bank", price: 1450, group: "Power" },
  { id: "bank20", name: "20,000 mAh power bank", price: 2200, group: "Power" },
  { id: "earbuds", name: "Wireless earbuds", price: 1500, group: "Audio" },
  { id: "budcover", name: "Earbud case cover", price: 200, group: "Audio" },
  { id: "tips", name: "Spare ear tips", price: 150, group: "Audio" },
  { id: "clear", name: "Clear case", price: 250, group: "Protection" },
  { id: "rugged", name: "Rugged case", price: 450, group: "Protection" },
  { id: "glass", name: "Screen protector", price: 200, group: "Protection" },
]

export const KIT_DEAL = { minItems: 3, off: 0.15 }

export type KitPreset = { id: string; name: string; line: string; items: string[] }

export const KIT_PRESETS: KitPreset[] = [
  { id: "starter", name: "Starter kit", line: "The basics for a new phone.", items: ["charger", "cable", "clear", "glass"] },
  { id: "power", name: "Power kit", line: "For long days away from a plug.", items: ["bank20", "charger", "cable", "cable2", "rugged"] },
  { id: "audio", name: "Audio kit", line: "Music and calls, sorted.", items: ["earbuds", "budcover", "cable", "tips"] },
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
