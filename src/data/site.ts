// Everything a shop owner may need to change lives here.

export const SITE = {
  name: "Gadget Cyclone",
  address: "Finlay Square, 4th floor, 2 No. Gate, Chattogram",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Finlay+Square+2+No+Gate+Chattogram",
  // Fill these in to turn on direct WhatsApp / Facebook links.
  // Until then the buttons open WhatsApp with the message ready, and you pick the chat.
  whatsappNumber: "", // e.g. "8801XXXXXXXXX" (country code first; spaces and + are fine)
  facebookUrl: "", // e.g. "https://www.facebook.com/your-page"
  // Round 6: shown on the page only when filled in (never guessed)
  phone: "", // e.g. "+8801XXXXXXXXX" -> adds a "Call us" button
  hours: "", // e.g. "Sa-Th 11:00-21:00" (this format also works for Google) -> shown in the Visit section
  // the live address of the site, used for share previews, canonical link and sitemap
  url: "https://gadget-cyclone-h.netlify.app",
}

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message)
  return SITE.whatsappNumber
    ? `https://wa.me/${SITE.whatsappNumber.replace(/[^0-9]/g, "")}?text=${text}`
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

// Hero showcase: the headline word and the photo change together.
// Photos: Unsplash (free Unsplash License), credited on the page.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70`

/** same photo at a given width (Unsplash resizes on the fly) */
export const sized = (photo: string, w: number) => `${photo}&w=${w}`
export const heroSrcSet = (photo: string) => [480, 720, 960, 1400].map((w) => `${sized(photo, w)} ${w}w`).join(", ")

export type HeroProduct = { word: string; photo: string; alt: string; note: string; credit: string }

export const HERO_PRODUCTS: HeroProduct[] = [
  {
    word: "Earbuds",
    photo: u("photo-1657532350710-d0becd0c680d"),
    alt: "A hand holding white wireless earbuds in their case",
    note: "TWS, ANC and neckbands",
    credit: "Klim Musalimov",
  },
  {
    word: "Chargers",
    photo: u("photo-1631037561126-0782ab7e666e"),
    alt: "A phone charging on a wireless charger with a green charging ring",
    note: "20W to 65W, matched to your phone",
    credit: "Lasse Jensen",
  },
  {
    word: "Power banks",
    photo: u("photo-1566554738544-d962991c3fee"),
    alt: "Hands holding a teal power bank next to a phone",
    note: "10,000 to 20,000 mAh",
    credit: "I'M ZION",
  },
  {
    word: "Covers",
    photo: u("photo-1592320402243-605cc3e935f7"),
    alt: "A hand holding a phone in a dark green case",
    note: "cut for your exact model",
    credit: "michael evins",
  },
  {
    word: "Watches",
    photo: u("photo-1764169604706-d19a7cfdf823"),
    alt: "A smartwatch on a wrist",
    note: "notifications + fitness",
    credit: "Barnaby Woodrow",
  },
  {
    word: "Speakers",
    photo: u("photo-1608043152269-423dbba4e7e1"),
    alt: "A black portable Bluetooth speaker on a wooden table",
    note: "pocket to party size",
    credit: "Nejc Soklič",
  },
]

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
  items: ShopItem[]
  /** small add-ons that only show on the kit shelf, not as shop cards */
  extras?: ShopItem[]
}

/** photo: real product photo from Unsplash (free Unsplash License), alt: what the photo shows */
// id: used by the kit box, unit: the name inside the box, price: example price in Tk (confirmed on WhatsApp)
export type ShopItem = { id: string; unit: string; price: number; name: string; note: string; photo: string; alt: string; credit: string }

/** product card photo, cropped to 4:3 by Unsplash */
export const cardPhoto = (photo: string, w: number) => `${photo}&w=${w}&h=${Math.round(w * 0.75)}`

// Shop rows (round 2: one swipe carousel per category, 6 item types each)
export const CATEGORIES: Category[] = [
  {
    id: "earbuds",
    label: "Earbuds & audio",
    line: "Wireless earbuds, neckbands and headphones.",
    items: [
      { id: "earbuds", unit: "Wireless earbuds", price: 1500, name: "TWS earbuds", note: "with charging case", photo: u("photo-1606220588913-b3aacb4d2f46"), alt: "Black wireless earbuds in an open charging case", credit: "TheRegisti" },
      { id: "anc", unit: "ANC earbuds", price: 3200, name: "ANC earbuds", note: "blocks outside noise", photo: u("photo-1611864583067-b002fdc4fa29"), alt: "White noise-cancelling earbuds on a dark cloth", credit: "Miguel Angel Avila" },
      { id: "neckband", unit: "Neckband", price: 1100, name: "Neckbands", note: "long battery, light", photo: u("photo-1589001879455-8427061ff67f"), alt: "A black Bluetooth neckband with earbuds", credit: "Habib Dadkhah" },
      { id: "overear", unit: "Over-ear headphones", price: 2800, name: "Over-ear headphones", note: "for long listening", photo: u("photo-1505740420928-5e560c06d30e"), alt: "Black over-ear headphones on a yellow background", credit: "C D-X" },
      { id: "gaming", unit: "Gaming headset", price: 2200, name: "Gaming headsets", note: "mic on a boom", photo: u("photo-1629429407756-4a7703614972"), alt: "A black and red gaming headset with a microphone", credit: "Rebekah Yip" },
      { id: "wired", unit: "Wired earphones", price: 350, name: "Wired earphones", note: "no charging needed", photo: u("photo-1742570922875-e5a60e950307"), alt: "White wired earphones with a 3.5 mm plug", credit: "Arturo Añez" },
    ],
    extras: [
      { id: "budcover", unit: "Earbud case cover", price: 200, name: "Earbud case covers", note: "protects the case", photo: u("photo-1591053438797-c3f868541406"), alt: "Earbuds in a black protective case cover", credit: "Michael Marais" },
      { id: "tips", unit: "Spare ear tips", price: 150, name: "Spare ear tips", note: "S / M / L", photo: u("photo-1611864583067-b002fdc4fa29"), alt: "Earbuds with silicone ear tips", credit: "Miguel Angel Avila" },
    ],
  },
  {
    id: "chargers",
    label: "Chargers & cables",
    line: "Matched to your phone's port and fast-charge type.",
    items: [
      { id: "charger", unit: "20W fast charger", price: 450, name: "20W fast chargers", note: "USB-C PD", photo: u("photo-1583863788434-e58a36330cf0"), alt: "A white wall charger with a white cable", credit: "Homemade Media" },
      { id: "charger65", unit: "33-65W charger", price: 1200, name: "33-65W chargers", note: "for phones that support it", photo: u("photo-1731616103600-3fe7ccdc5a59"), alt: "A white 67W fast charger and cable on a yellow background", credit: "Andrey Matveev" },
      { id: "cable", unit: "USB-C cable", price: 250, name: "USB-C cables", note: "1 m and 2 m", photo: u("photo-1572721546624-05bf65ad7679"), alt: "Orange USB-C cables on a blue background", credit: "Lucian Alexe" },
      { id: "lightning", unit: "Lightning cable", price: 300, name: "Lightning cables", note: "older iPhones", photo: u("photo-1595392029711-8a206145f976"), alt: "An iPhone with a white Lightning cable", credit: "James Lewis" },
      { id: "car", unit: "Car charger", price: 550, name: "Car chargers", note: "dual port", photo: u("photo-1746740403888-c16d387f65c6"), alt: "A dual-port USB car charger in a car socket", credit: "Abhishek Tirkey" },
      { id: "wireless", unit: "Wireless charger", price: 1100, name: "Wireless chargers", note: "pads and stands", photo: u("photo-1591290619618-904f6dd935e3"), alt: "A white round wireless charging pad on a wooden table", credit: "Matteo Grobberio" },
    ],
  },
  {
    id: "power",
    label: "Power banks",
    line: "Pocket to backpack size, for long days out.",
    items: [
      { id: "bank10", unit: "10,000 mAh power bank", price: 1450, name: "10,000 mAh", note: "pocket size", photo: u("photo-1706275399494-fb26bbc5da63"), alt: "A slim silver power bank", credit: "gomi" },
      { id: "bank20", unit: "20,000 mAh power bank", price: 2200, name: "20,000 mAh", note: "two phones, one day", photo: u("photo-1600577231598-31ea4cb50da3"), alt: "A black power bank charging a phone on a desk", credit: "I'M ZION" },
      { id: "magnetic", unit: "Magnetic power bank", price: 2500, name: "Magnetic packs", note: "snap on the back", photo: u("photo-1644571669391-c0b48363abed"), alt: "A white magnetic battery pack snapped to the back of an iPhone", credit: "Kamil Switalski" },
      { id: "bankfast", unit: "Fast-charge power bank", price: 1900, name: "Fast-charge banks", note: "PD output", photo: u("photo-1644571669401-9ab344866592"), alt: "The USB-C port of a power bank in pink and blue light", credit: "Kamil Switalski" },
      { id: "bankmini", unit: "Mini power bank", price: 1050, name: "Mini banks", note: "lipstick size", photo: u("photo-1736516434209-51ece1006788"), alt: "Two small power banks with a charging cable", credit: "Konstantinos Papadopoulos" },
      { id: "bankcable", unit: "Power bank with cables", price: 1600, name: "Banks with cables", note: "cable built in", photo: u("photo-1760708825913-65a50b3dc39b"), alt: "A white power bank with three built-in charging cables", credit: "Andrey Matveev" },
    ],
  },
  {
    id: "covers",
    label: "Covers & protection",
    line: "Cases and screen protectors for your exact model.",
    items: [
      { id: "clear", unit: "Clear case", price: 250, name: "Clear cases", note: "show the phone", photo: u("photo-1697008230027-5c6ebaf24801"), alt: "An iPhone in a clear case next to other cases", credit: "Sophia Stark" },
      { id: "rugged", unit: "Rugged case", price: 450, name: "Rugged cases", note: "for drops", photo: u("photo-1552872417-d448e75ff94c"), alt: "An orange and black rugged phone case on the ground", credit: "Abhishek Yadav" },
      { id: "silicone", unit: "Silicone case", price: 300, name: "Silicone cases", note: "soft grip", photo: u("photo-1535157412991-2ef801c1748b"), alt: "Silicone phone cases in pastel colors", credit: "Grysell Alvarez" },
      { id: "wallet", unit: "Wallet case", price: 550, name: "Wallet cases", note: "cards inside", photo: u("photo-1705041053194-5b98f24de187"), alt: "Hands opening a black wallet phone case", credit: "Mason Supply" },
      { id: "glass", unit: "Tempered glass", price: 200, name: "Tempered glass", note: "cut for your model", photo: u("photo-1772831902679-3f41c106d7a2"), alt: "Close-up of the curved glass edge of a phone", credit: "Alexandru Ant" },
      { id: "lens", unit: "Camera lens guard", price: 180, name: "Camera lens guards", note: "small, easy to miss", photo: u("photo-1747409864642-c7150b97bef9"), alt: "Close-up of a phone's triple camera lenses", credit: "Anuj Mhatre" },
    ],
  },
  {
    id: "more",
    label: "Watches & speakers",
    line: "Smart watches and Bluetooth speakers.",
    items: [
      { id: "watch", unit: "Smart watch", price: 2800, name: "Smart watches", note: "notifications + fitness", photo: u("photo-1579586337278-3befd40fd17a"), alt: "A smartwatch showing its app screen", credit: "Simon Daoudi" },
      { id: "band", unit: "Fitness band", price: 1600, name: "Fitness bands", note: "light, long battery", photo: u("photo-1576243345690-4e4b79b63288"), alt: "A black fitness band on a purple background", credit: "Nikita Kostrykin" },
      { id: "strap", unit: "Watch strap", price: 350, name: "Watch straps", note: "swap the look", photo: u("photo-1554116154-e733de92fe4b"), alt: "A smartwatch on a green strap", credit: "Daniel Korpai" },
      { id: "speakermini", unit: "Mini speaker", price: 1200, name: "Mini speakers", note: "fits a pocket", photo: u("photo-1582978571763-2d039e56f0c3"), alt: "A small white Bluetooth speaker on a wooden table", credit: "Nicolas J Leclercq" },
      { id: "speakerparty", unit: "Party speaker", price: 4500, name: "Party speakers", note: "loud, with lights", photo: u("photo-1589256469067-ea99122bbdc4"), alt: "A tall Bluetooth speaker glowing with colored lights", credit: "Habib Dadkhah" },
      { id: "holder", unit: "Phone holder", price: 400, name: "Phone holders", note: "desk and bike", photo: u("photo-1761721576781-baaf47945242"), alt: "A phone in a holder on bicycle handlebars", credit: "Viktor Khilchuk" },
    ],
  },
]

// Kit builder. Sample prices. 3 or more items = 15% off, rounded to the nearest Tk 10.
// photo: real product photo (Unsplash), mostly the same photos as the shop cards
export type KitItem = { id: string; name: string; price: number; group: string; photo: string }

/** square crop of a product photo, used on the kit shelf and inside the box */
export const squarePhoto = (photo: string, size: number) => `${photo}&w=${size}&h=${size}`

// every shop product (plus the extras) can go in the box, grouped like the shop
export const KIT_ITEMS: KitItem[] = CATEGORIES.flatMap((c) =>
  [...c.items, ...(c.extras ?? [])].map((i) => ({ id: i.id, name: i.unit, price: i.price, group: c.id, photo: i.photo }))
)

/** the kit shelf, one block per shop section */
export const KIT_SHELF = CATEGORIES.map((c) => ({ id: c.id, label: c.label, items: KIT_ITEMS.filter((i) => i.group === c.id) }))

export const KIT_DEAL = { minItems: 3, off: 0.15 }

export type KitPreset = { id: string; name: string; line: string; items: string[] }

export const KIT_PRESETS: KitPreset[] = [
  { id: "starter", name: "Starter kit", line: "The basics for a new phone.", items: ["charger", "cable", "clear", "glass"] },
  { id: "power", name: "Power kit", line: "For long days away from a plug.", items: ["bank20", "charger", "cable", "car", "rugged"] },
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
    a: "The prices on this page are examples. Prices change with stock, so we confirm today's price on WhatsApp before we pack your order.",
  },
]
