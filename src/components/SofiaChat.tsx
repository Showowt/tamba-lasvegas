"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ============================================
// TAMBA LAS VEGAS — COMPLETE KNOWLEDGE BASE
// ============================================

interface MenuItem {
  name: string;
  price: number | string;
  description: string;
  dietary: string[];
  chefFavorite?: boolean;
  addOns?: { name: string; price: number }[];
}

interface MenuCategory {
  name: string;
  emoji: string;
  tagline: string;
  items: MenuItem[];
}

const TAMBA_KNOWLEDGE = {
  business: {
    name: "Tamba Las Vegas",
    type: "Contemporary Indian Fine Dining Restaurant & Cocktail Bar",
    tagline: "Rooted in Tradition",
    motto: "It's Not Just a Restaurant; It's an Experience",
    concept:
      "Tamba reimagines contemporary Indian dining with bold flavors, innovative techniques, and the vibrant spirit of India. The menu celebrates the art of live-fire cooking through the tandoor, charcoal mangal, Josper oven, and Chinese wok.",
    philosophy: "Every Bite Is a Chronicle / Every Meal, a Journey",
    recognition: "Michelin-recognized Chef Anand Singh leads the kitchen",
  },

  location: {
    address: "6671 Las Vegas Blvd South, Suite A-117",
    city: "Las Vegas, NV 89119",
    neighborhood: "Town Square",
    phone: "+1 (702) 798-7889",
    email: "info@tambalasvegas.com",
    website: "www.tambalasvegas.com",
    instagram: "@tambalasvegas",
    reservations: "sevenrooms.com/explore/tambalasvegas",
  },

  hours: {
    days: "Monday - Sunday",
    time: "5:00 PM - 10:00 PM",
    note: "Open 7 days a week for dinner service only",
  },

  team: {
    chef: {
      name: "Chef Anand Singh",
      title: "Executive Chef",
      recognition: "Michelin-recognized",
      signature: "His signature dishes are marked with ◉",
    },
    mixologist: {
      name: "Giuseppe Gonzalez",
      title: "Master Mixologist",
      venue: "Bar Jadu",
    },
  },

  venues: {
    mainDining: {
      name: "Main Dining Room",
      description:
        "A limited-seating, upscale dining environment featuring warm terracotta tones, plush bouclé chairs, rich wood tables, banquette booths, and a library-style bookshelf wall. The ambiance is refined and intimate.",
    },
    barJadu: {
      name: "Bar Jadu",
      description:
        "A hidden, enchanting cocktail bar within the restaurant. Master mixologist Giuseppe Gonzalez crafts cocktails designed to delight, surprise, and transport guests.",
      reservations: true,
    },
    privateRoom: {
      name: "Jadu Private Dining Room",
      description:
        "An exclusive, tucked-away private dining space within Tamba designed for intimate and luxurious events.",
      features: [
        "Elegant Ambiance: Contemporary design blended with rich cultural influences",
        "Exclusive Privacy: Separated from the main dining area",
        "Customized Menus: Work directly with Chef Anand Singh",
        "Seamless Service: Dedicated hospitality team",
      ],
      perfectFor:
        "VIP gatherings, corporate dinners, intimate celebrations, exclusive tasting experiences",
      minimumSpend: 3000,
    },
  },

  cookingMethods: [
    {
      name: "Tandoor",
      description:
        "Traditional clay oven cooking for breads and tandoori items",
    },
    {
      name: "Charcoal Mangal",
      description:
        "Traditional South Asian charcoal grill for live-fire cooking",
    },
    {
      name: "Josper Oven",
      description:
        "Enclosed charcoal oven combining intense grill + oven heat — Tamba's crown jewel",
    },
    { name: "Wok", description: "Chinese-style high-heat stir fry cooking" },
    { name: "Tawa", description: "Flat iron griddle used for charring" },
  ],

  dietaryKey: {
    V: "Vegetarian",
    VG: "Vegan",
    GF: "Gluten Free",
    chef: "Anand's Favorite (◉)",
  },
};

const MENU: MenuCategory[] = [
  {
    name: "RAW & REFINED",
    emoji: "🦪",
    tagline:
      "An ode to oceanic purity, from delicately layered crudo to flame-kissed oysters and caviar.",
    items: [
      {
        name: "Artichoke Sashimi",
        price: 24,
        description:
          "Tandoori Roasted Artichoke Hearts, Passion Fruit, Truffle Sesame Dressing, Garlic Aioli",
        dietary: ["V", "VG", "GF"],
      },
      {
        name: "Tamarind Spiced Hamachi",
        price: 28,
        description: "Asian Pear, Curry Emulsion, Tamarind Ponzu & Serrano",
        dietary: ["GF"],
        chefFavorite: true,
      },
      {
        name: "Octopus Carpaccio",
        price: 28,
        description:
          "Octopus, Miso Dressing, Green Chutney Purée & Crispy Garlic",
        dietary: ["GF"],
      },
      {
        name: "Caviar Puri (4 bites)",
        price: 64,
        description:
          "Puri Crisps Filled With Whipped Labneh, Egg White/Yolk, Shallots & Chives",
        dietary: [],
      },
      {
        name: "Madras Tuna Laap",
        price: 28,
        description:
          "Tuna, Madras Curry, Mint, Chili & Kaffir Lime Roasted Rice Powder",
        dietary: ["GF"],
      },
      {
        name: "Seasonal Oysters",
        price: 34,
        description:
          "Chili-Infused Ponzu, Yuzu Mignonette & Apple Wasabi Granita",
        dietary: ["GF"],
      },
      {
        name: "Kimchi Butter Oysters",
        price: 36,
        description:
          "Grilled Oysters with Kimchi Butter, Smoked Sea Salt & Citrus Segments",
        dietary: ["GF"],
        chefFavorite: true,
      },
      {
        name: "Oscietra Caviar 30g",
        price: 199,
        description: "Paired with Louis XVIII Cognac",
        dietary: [],
      },
    ],
  },
  {
    name: "TAMBAZUSHI",
    emoji: "🍣",
    tagline:
      "Hand-formed, fire-kissed nigirizushi. A nod to Edomae tradition, reimagined through Indian coastal flavor.",
    items: [
      {
        name: "Salmon",
        price: 24,
        description:
          "Seared Salmon, Omakase Soy, Citrus Aioli, Yuzu & Micro Cilantro",
        dietary: [],
      },
      {
        name: "Tuna",
        price: 26,
        description:
          "Tuna, Honey Truffle Glaze, Garlic Chive, Smoked Sea Salt, Kizami Wasabi & Shiso",
        dietary: ["GF"],
        chefFavorite: true,
      },
      {
        name: "Wagyu",
        price: 32,
        description:
          "Charred Margaret River Wagyu, Caviar, Tamarind Ponzu, Yuzu Kosho, Truffle Oil & Garlic Crisp",
        dietary: ["GF"],
      },
    ],
  },
  {
    name: "SOUP & SALAD",
    emoji: "🥗",
    tagline:
      "From sea to soil, freshness awakens. Chilled, charred, and crushed.",
    items: [
      {
        name: "Chilled Beetroot Soup",
        price: 24,
        description:
          "Roasted Beet, Cucumber, Lime Foam & Rosemary Garlic Crostini",
        dietary: ["V", "VG"],
      },
      {
        name: "Green Papaya",
        price: 24,
        description:
          "Chayote, Mint, Cherry Tomato, Long Beans, Lime Chili Dressing & Roasted Peanuts",
        dietary: ["GF"],
        chefFavorite: true,
        addOns: [{ name: "Prawns", price: 5 }],
      },
      {
        name: "Broccoli Caesar",
        price: 24,
        description:
          "Mangal Charred Broccoli, Tamarind Caesar Dressing, Naan Croutons & 36-Month Aged Parmigiano",
        dietary: ["V", "VG"],
        addOns: [{ name: "Boquerones", price: 5 }],
      },
    ],
  },
  {
    name: "STREET CLASSICS",
    emoji: "🫘",
    tagline:
      "The heart of the homeland, plated. Inspired by India's street corners and home kitchens.",
    items: [
      {
        name: "Samosa Chaat",
        price: 20,
        description:
          "Crisp Hand-Folded Samosa, Masala Potatoes, Green Peas, Pomegranate, Sev & Curry-Spiced Chickpeas",
        dietary: ["V", "VG"],
        chefFavorite: true,
      },
      {
        name: "Sea Bass Amritsari",
        price: 26,
        description:
          "Fried Seabass, Daikon Kimchi Salad, Garlic and Tomato Sambal with Mint Salsa",
        dietary: ["GF"],
      },
    ],
  },
  {
    name: "CHARCOAL & LIVE FIRE",
    emoji: "🔥",
    tagline:
      "Where centuries-old techniques meet bold new expression — meats, seafood, and vegetables kissed by live flame.",
    items: [
      {
        name: "Saffron Afghani Paneer",
        price: 28,
        description:
          "House-Made Cottage Cheese, Bell Pepper, Cauliflower Masala Purée, Mint & Garlic Chutney",
        dietary: ["GF"],
      },
      {
        name: "Lemongrass Fish Tikka",
        price: 36,
        description:
          "Chilean Sea Bass, Ajwain, Madras Curry, Tomato Salsa, Kachumber Salad, Tamarind & Mint Chutney",
        dietary: ["GF"],
      },
      {
        name: "Methi Murgh",
        price: 32,
        description:
          "Fenugreek-Spiced Chicken Thigh Kebab, Butter Chat Masala, Kimchi, Garlic Hummus & Green Chutneys",
        dietary: ["GF"],
      },
      {
        name: "Lasooni Lamb Chop",
        price: 54,
        description:
          "Lumina Farms, NZ — Dry Spice Rub, Cumin Spinach Potato Masala with Pickled Salad",
        dietary: ["GF"],
        chefFavorite: true,
      },
      {
        name: "Angithi Kefta",
        price: 49,
        description:
          "Filet Mignon & Ground Lamb, Mint Garlic Labneh, Pickled Onion, Grilled Tomato & Garlic Aioli",
        dietary: ["GF"],
      },
    ],
  },
  {
    name: "JOSPER",
    emoji: "🪵",
    tagline:
      "Within the heart of the flame lies our crown jewel — the Josper, a master of intensity and finesse.",
    items: [
      {
        name: "Bhuna Gobi",
        price: 28,
        description:
          "Purple Cauliflower, Roasted Cherry Tomato, Green Coconut Curry, Broccoli Purée with Japanese Chili Oil",
        dietary: ["GF"],
      },
      {
        name: "Tawa Charred Octopus",
        price: 39,
        description:
          "Cauliflower Purée, Beetroot, Fennel, Yuzu Lime Chaat Aioli, Orange Glaze, Rice Crunch with Eel Sauce",
        dietary: [],
        chefFavorite: true,
      },
      {
        name: "Banana Leaf Seabass",
        price: 42,
        description:
          "Wrapped & Roasted Chilean Seabass, Truffle Celeriac Purée, Edamame, Kerala Sauce with Creamy Citric Lime",
        dietary: ["GF"],
      },
      {
        name: "Angara Wagyu",
        price: 120,
        description:
          "Margaret River New York 10 oz — Broccoli, Roast Carrot Purée, Saffron Porcini Mushroom Sauce & Balsamic Curry Glaze",
        dietary: [],
      },
    ],
  },
  {
    name: "WOK",
    emoji: "🥢",
    tagline:
      "The dance of the flame continues as we move from slow embers to the quick fury of the wok.",
    items: [
      {
        name: "Hakka Noodle Stir Fry",
        price: 28,
        description:
          "Seasonal Vegetables, Kaffir Lime Leaves, Citrus Soy & Chili Garlic",
        dietary: ["V", "VG"],
      },
      {
        name: "Black Pepper Beef",
        price: 52,
        description:
          "Stir Fried Filet Mignon with Mushroom, Celery, Broccoli & Lemongrass",
        dietary: [],
      },
      {
        name: "Seafood Noodle Stir Fry",
        price: 40,
        description: "Lobster, Shrimp, Seabass, Egg & Lemongrass Sauce",
        dietary: [],
      },
      {
        name: "Lobster Fried Rice",
        price: 46,
        description:
          "Lobster Tail, Basmati Rice, Kaffir Lime Leaves, Lemongrass, Thai Chili & Szechuan Sauce",
        dietary: [],
      },
    ],
  },
  {
    name: "CURRIES",
    emoji: "🍛",
    tagline:
      "The soul of the table — dishes that simmer, sear, and steep across land and sea.",
    items: [
      {
        name: "Dal Tadka",
        price: 22,
        description:
          "Yellow Toor & Chana Lentils, Onion Masala, Tempered with Butter, Garlic & Cumin",
        dietary: ["V", "VG"],
      },
      {
        name: "Pahadi Paneer",
        price: 28,
        description:
          "Pressed Milk Cheese, Exotic Spices, Rich Yogurt, Mint & Coriander Gravy",
        dietary: ["V", "GF"],
        chefFavorite: true,
      },
      {
        name: "Achari Bhindi Do Pyaza",
        price: 28,
        description:
          "Spiced Okra and Onion, Cumin, Chili, Pickled Mango Masala",
        dietary: ["V", "VG", "GF"],
        chefFavorite: true,
      },
      {
        name: "Fire-Roasted Baby Baingan",
        price: 28,
        description:
          "Fire-Roasted Baby Indian Eggplant Stuffed with Smoky South Indian Masala with Whipped Lebne",
        dietary: ["V", "GF"],
      },
      {
        name: "Roasted Aloo Gobi Masala",
        price: 28,
        description:
          "Turmeric-Roasted Potatoes & Cauliflower, Green Chili, Onion & Ginger",
        dietary: ["V", "VG", "GF"],
      },
      {
        name: "Butter Chicken",
        price: 34,
        description:
          "Chicken Thigh Tikka in a Cashew & Tomato Butter Sauce with Fenugreek",
        dietary: ["GF"],
      },
      {
        name: "Lobster Green Curry",
        price: 46,
        description:
          "Poached Lobster Tail, Green Coconut Masala, Mexican Chili, Coriander-Mint Purée & Hand-Ground Coastal Spices",
        dietary: ["GF"],
        chefFavorite: true,
      },
      {
        name: "Fish Moilee Masala",
        price: 36,
        description:
          "Sea Bass, Turmeric & Mustard, Curry Leaves, Coconut Tamarind Sauce",
        dietary: ["GF"],
      },
      {
        name: "Chicken Tariwala",
        price: 34,
        description: "Slow-Cooked Chicken Thigh in a Spiced Home-Style Curry",
        dietary: ["GF"],
      },
      {
        name: "Nihari Gosht",
        price: 44,
        description:
          "Slow-Braised Goat in Bone Marrow Gravy, Finished with Whole Roasted Spices",
        dietary: ["GF"],
        chefFavorite: true,
      },
    ],
  },
  {
    name: "BIRYANI",
    emoji: "🍚",
    tagline:
      "From the richness of the curry pot to the fragrant depths of layered rice — where aroma and memory meet.",
    items: [
      {
        name: "Subz Kebab Biryani",
        price: 28,
        description:
          "Vegetable Tikki, Saffron Basmati Rice, Indian Herbs & Spices",
        dietary: ["V"],
      },
      {
        name: "Tandoori Murgh Biryani",
        price: 36,
        description:
          "Tandoori Chicken, Saffron Basmati Rice, Biryani Masala & Toasted Nuts",
        dietary: ["GF"],
      },
      {
        name: "Mutton Biryani",
        price: 42,
        description:
          "Marinated Goat, Saffron Basmati Rice, Indian Herbs & Spices",
        dietary: ["GF"],
      },
    ],
  },
  {
    name: "TANDOORI BREADS",
    emoji: "🫓",
    tagline:
      "To cradle the gravies and deepen the warmth, our flame-kissed breads.",
    items: [
      {
        name: "Plain Naan",
        price: 5,
        description: "Classic leavened bread from the tandoor",
        dietary: [],
      },
      {
        name: "Tandoori Roti",
        price: 6,
        description: "Whole wheat unleavened bread",
        dietary: [],
      },
      {
        name: "Garlic Cilantro",
        price: 6,
        description: "Naan topped with garlic and fresh cilantro",
        dietary: [],
      },
      {
        name: "Goat Cheese & Togarashi",
        price: 7,
        description: "Naan with creamy goat cheese and Japanese spice blend",
        dietary: [],
      },
      {
        name: "Black Truffle & Fleur de Sel",
        price: 8,
        description: "Luxurious naan with black truffle and sea salt",
        dietary: [],
      },
      {
        name: "Exotic Bread Basket",
        price: 21,
        description: "A selection of our finest tandoori breads",
        dietary: [],
      },
    ],
  },
  {
    name: "ACCOMPANIMENTS",
    emoji: "🥒",
    tagline:
      "The supporting cast and vibrant accents that complete every plate.",
    items: [
      {
        name: "Cucumber Raita",
        price: 5,
        description: "Cooling yogurt with cucumber",
        dietary: [],
      },
      {
        name: "Onion & Green Chili Salad",
        price: 8,
        description: "Fresh onions with spicy green chilies",
        dietary: [],
      },
      {
        name: "Trio of Chutney",
        price: 6,
        description: "Three house-made chutneys",
        dietary: [],
      },
      {
        name: "House Spiced Pickles",
        price: 10,
        description: "Traditional Indian pickles",
        dietary: [],
      },
      {
        name: "Basmati Rice",
        price: 6,
        description: "Steamed aromatic basmati rice",
        dietary: [],
      },
      {
        name: "Masala Papad",
        price: 5,
        description: "Crispy wafers with masala topping",
        dietary: [],
      },
      {
        name: "Josper Grill Vegetables",
        price: 12,
        description: "Seasonal vegetables from our Josper oven",
        dietary: [],
      },
    ],
  },
];

// ============================================
// CHAT MESSAGE TYPES
// ============================================

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ============================================
// INTENT DETECTION & RESPONSE GENERATION
// ============================================

type IntentType =
  | "greeting"
  | "hours"
  | "location"
  | "reservations"
  | "menu_general"
  | "menu_category"
  | "chef"
  | "bar_jadu"
  | "private_dining"
  | "dietary"
  | "vegetarian"
  | "vegan"
  | "gluten_free"
  | "chef_favorites"
  | "prices"
  | "expensive"
  | "caviar"
  | "wagyu"
  | "cooking_methods"
  | "josper"
  | "tandoor"
  | "phone"
  | "contact"
  | "parking"
  | "dress_code"
  | "thanks"
  | "goodbye"
  | "help"
  | "default";

function detectIntent(message: string): IntentType {
  const lower = message.toLowerCase();

  // Greetings
  if (
    /^(hi|hello|hey|good\s*(morning|evening|afternoon)|howdy|greetings)/i.test(
      lower,
    )
  ) {
    return "greeting";
  }

  // Hours
  if (/hours|open|close|when.*open|time|schedule/i.test(lower)) {
    return "hours";
  }

  // Location
  if (/where|location|address|directions|find you|how.*get/i.test(lower)) {
    return "location";
  }

  // Reservations
  if (/reserv|book|table|sevenrooms|availability/i.test(lower)) {
    return "reservations";
  }

  // Chef
  if (/chef|anand|singh|michelin|who.*cook/i.test(lower)) {
    return "chef";
  }

  // Bar Jadu
  if (
    /bar\s*jadu|cocktail|drink|mixologist|giuseppe|hidden.*bar/i.test(lower)
  ) {
    return "bar_jadu";
  }

  // Private Dining
  if (
    /private|jadu.*room|event|corporate|vip|celebration|party|minimum.*spend/i.test(
      lower,
    )
  ) {
    return "private_dining";
  }

  // Dietary - specific
  if (/vegetarian|veggie\s+options?/i.test(lower)) {
    return "vegetarian";
  }
  if (/vegan/i.test(lower)) {
    return "vegan";
  }
  if (/gluten\s*free|gf|celiac|no\s*gluten/i.test(lower)) {
    return "gluten_free";
  }
  if (/diet|allerg|restrict/i.test(lower)) {
    return "dietary";
  }

  // Chef favorites
  if (
    /favorite|signature|recommend|must.*try|best.*dish|popular|special/i.test(
      lower,
    )
  ) {
    return "chef_favorites";
  }

  // Prices
  if (/price|cost|expensive|cheap|afford|budget/i.test(lower)) {
    return "prices";
  }
  if (/most.*expensive|splurge|luxury|high.*end/i.test(lower)) {
    return "expensive";
  }

  // Specific items
  if (/caviar/i.test(lower)) {
    return "caviar";
  }
  if (/wagyu/i.test(lower)) {
    return "wagyu";
  }

  // Cooking methods
  if (/josper/i.test(lower)) {
    return "josper";
  }
  if (/tandoor/i.test(lower)) {
    return "tandoor";
  }
  if (/cook|technique|method|fire|charcoal|grill|wok|mangal/i.test(lower)) {
    return "cooking_methods";
  }

  // Menu categories
  if (/raw|crudo|oyster|sashimi/i.test(lower)) {
    return "menu_category";
  }
  if (/sushi|tambazushi|nigiri/i.test(lower)) {
    return "menu_category";
  }
  if (/soup|salad/i.test(lower)) {
    return "menu_category";
  }
  if (/street|chaat|samosa/i.test(lower)) {
    return "menu_category";
  }
  if (/curry|curries/i.test(lower)) {
    return "menu_category";
  }
  if (/biryani|rice/i.test(lower)) {
    return "menu_category";
  }
  if (/bread|naan|roti/i.test(lower)) {
    return "menu_category";
  }
  if (/menu|food|eat|dish|cuisine/i.test(lower)) {
    return "menu_general";
  }

  // Contact
  if (/phone|call|number/i.test(lower)) {
    return "phone";
  }
  if (/contact|email|reach/i.test(lower)) {
    return "contact";
  }

  // Parking
  if (/park/i.test(lower)) {
    return "parking";
  }

  // Dress code
  if (/dress|wear|attire|code|formal/i.test(lower)) {
    return "dress_code";
  }

  // Thanks
  if (/thank|appreciate|grateful/i.test(lower)) {
    return "thanks";
  }

  // Goodbye
  if (/bye|goodbye|see you|later/i.test(lower)) {
    return "goodbye";
  }

  // Help
  if (/help|assist|support|what can you/i.test(lower)) {
    return "help";
  }

  return "default";
}

function formatPrice(price: number | string): string {
  if (typeof price === "number") {
    return `$${price}`;
  }
  return price;
}

function formatMenuItem(item: MenuItem, showCategory = false): string {
  let line = `**${item.name}** — ${formatPrice(item.price)}`;
  if (item.chefFavorite) {
    line = `◉ ${line}`;
  }
  if (item.dietary.length > 0) {
    const tags = item.dietary.map((d) => `(${d})`).join(" ");
    line += ` ${tags}`;
  }
  line += `\n${item.description}`;
  return line;
}

function getMenuItemsByDietary(dietaryCode: string): MenuItem[] {
  const items: MenuItem[] = [];
  MENU.forEach((category) => {
    category.items.forEach((item) => {
      if (item.dietary.includes(dietaryCode)) {
        items.push(item);
      }
    });
  });
  return items;
}

function getChefFavorites(): MenuItem[] {
  const items: MenuItem[] = [];
  MENU.forEach((category) => {
    category.items.forEach((item) => {
      if (item.chefFavorite) {
        items.push(item);
      }
    });
  });
  return items;
}

function findCategory(query: string): MenuCategory | null {
  const lower = query.toLowerCase();
  return (
    MENU.find((cat) => {
      const catLower = cat.name.toLowerCase();
      if (
        catLower.includes(lower) ||
        lower.includes(catLower.split(" ")[0].toLowerCase())
      ) {
        return true;
      }
      // Check specific keywords
      if (lower.includes("raw") && catLower.includes("raw")) return true;
      if (lower.includes("sushi") && catLower.includes("sushi")) return true;
      if (lower.includes("soup") && catLower.includes("soup")) return true;
      if (lower.includes("salad") && catLower.includes("salad")) return true;
      if (lower.includes("street") && catLower.includes("street")) return true;
      if (lower.includes("fire") && catLower.includes("fire")) return true;
      if (lower.includes("josper") && catLower.includes("josper")) return true;
      if (lower.includes("wok") && catLower.includes("wok")) return true;
      if (lower.includes("curry") && catLower.includes("curry")) return true;
      if (lower.includes("biryani") && catLower.includes("biryani"))
        return true;
      if (lower.includes("bread") && catLower.includes("bread")) return true;
      if (lower.includes("naan") && catLower.includes("bread")) return true;
      return false;
    }) || null
  );
}

function generateResponse(message: string, intent: IntentType): string {
  switch (intent) {
    case "greeting":
      return `Welcome to **Tamba Las Vegas** — where fire meets flavor. 🔥

*"Rooted in Tradition. It's Not Just a Restaurant; It's an Experience."*

I'm Agni, your guide to our contemporary Indian fine dining experience. How may I assist you today?

You can ask me about:
• Our menu & chef's favorites
• Reservations & hours
• Bar Jadu (our hidden cocktail bar)
• Private dining for special events
• Dietary accommodations`;

    case "hours":
      return `**Hours of Operation**

We're open **7 days a week** for dinner service:

📍 **Monday - Sunday**: 5:00 PM - 10:00 PM

Ready to reserve your table?
→ [Book on SevenRooms](https://sevenrooms.com/explore/tambalasvegas)
→ Or call us: **(702) 798-7889**`;

    case "location":
      return `**Find Us**

📍 **6671 Las Vegas Blvd South, Suite A-117**
Las Vegas, NV 89119

We're located in **Town Square** — with plenty of parking available throughout the shopping center.

🗺️ [Get Directions](https://maps.google.com/?q=6671+Las+Vegas+Blvd+South+Las+Vegas+NV)

📞 **(702) 798-7889**`;

    case "reservations":
      return `**Reserve Your Experience**

Tamba offers a limited-seating, intimate dining experience. We recommend reservations, especially for weekends.

🔥 **Book Online**: [SevenRooms](https://sevenrooms.com/explore/tambalasvegas)
📞 **Call**: (702) 798-7889

For **private events** (Jadu Room), minimum spend starts at $3,000. Contact us at **info@tambalasvegas.com** to begin planning.

How many guests will be joining you?`;

    case "chef":
      return `**Chef Anand Singh**
*Executive Chef, Michelin-Recognized*

Chef Anand leads Tamba's kitchen with a vision that honors tradition while embracing innovation. His dishes are marked with ◉ on our menu — each one a testament to his mastery of live-fire cooking.

His specialties include the **Lasooni Lamb Chop**, **Lobster Green Curry**, and the showstopping **Angara Wagyu**.

*"Every Bite Is a Chronicle. Every Meal, a Journey."*

Would you like to see Chef Anand's favorite dishes?`;

    case "bar_jadu":
      return `**Bar Jadu** 🍸
*The Hidden Enchantment*

Tucked within Tamba lies Bar Jadu — a hidden cocktail sanctuary led by **Master Mixologist Giuseppe Gonzalez**.

His cocktails are crafted to *delight, surprise, and transport* you. Each drink tells a story, blending Indian spices with classic technique.

✨ Reservations available for Bar Jadu
📞 **(702) 798-7889**

The name "Jadu" means *magic* in Hindi — and that's exactly what awaits.`;

    case "private_dining":
      return `**Jadu Private Dining Room** ✨
*For Moments That Matter*

An exclusive, tucked-away space designed for intimate and luxurious events.

**Features:**
• Contemporary design with rich cultural influences
• Complete privacy from main dining
• Custom menus crafted with Chef Anand Singh
• Dedicated hospitality team

**Perfect For:**
VIP gatherings • Corporate dinners • Intimate celebrations
Exclusive tastings • Cocktail pairings

**Minimum Spend:** Starting at $3,000

📧 **info@tambalasvegas.com**
📞 **(702) 798-7889**

When would you like to host your event?`;

    case "vegetarian":
      const vegItems = getMenuItemsByDietary("V");
      const vegList = vegItems
        .slice(0, 8)
        .map((item) => `• **${item.name}** — ${formatPrice(item.price)}`)
        .join("\n");
      return `**Vegetarian Options** 🌱

Tamba celebrates vegetable-forward cuisine with the same fire-kissed mastery as our proteins.

${vegList}

...and more! We have **${vegItems.length} vegetarian dishes** on our menu.

Most items can also be adapted. Please inform your server of any specific needs.`;

    case "vegan":
      const veganItems = getMenuItemsByDietary("VG");
      const veganList = veganItems
        .map((item) => `• **${item.name}** — ${formatPrice(item.price)}`)
        .join("\n");
      return `**Vegan Options** 🌿

${veganList}

Many dishes can be modified to be vegan. Our kitchen is happy to accommodate — just let your server know!`;

    case "gluten_free":
      const gfItems = getMenuItemsByDietary("GF");
      const gfList = gfItems
        .slice(0, 10)
        .map((item) => `• **${item.name}** — ${formatPrice(item.price)}`)
        .join("\n");
      return `**Gluten-Free Options** 🌾

We have **${gfItems.length} naturally gluten-free dishes**.

${gfList}

*...and many more!*

Many additional items can be prepared gluten-free upon request. Please inform your server about any allergies.`;

    case "dietary":
      return `**Dietary Accommodations**

Our menu uses these icons:
• **(V)** — Vegetarian
• **(VG)** — Vegan
• **(GF)** — Gluten Free
• **◉** — Chef Anand's Favorite

Many items can be prepared **gluten- or nut-free** upon request.

**Please inform your server** of any dietary restrictions or allergies — our kitchen will accommodate you.

Would you like me to show you specific options?`;

    case "chef_favorites":
      const favorites = getChefFavorites();
      const favList = favorites
        .map((item) => formatMenuItem(item))
        .join("\n\n");
      return `**◉ Chef Anand's Favorites**

These dishes represent the soul of Tamba:

${favList}

Each marked with ◉ — a personal recommendation from our Michelin-recognized chef.

Which one calls to you?`;

    case "prices":
      return `**Menu Price Range**

Our menu spans a range of experiences:

**Starters & Small Plates:** $20 - $36
**Breads:** $5 - $21
**Main Dishes:** $28 - $52
**Premium:** $54 - $120 (Wagyu, Lamb Chop)
**Caviar:** $100 - $199

*The menu is crafted for family-style sharing — we recommend 2-3 dishes per person.*

Would you like recommendations based on your budget?`;

    case "expensive":
      return `**Our Most Luxurious Offerings**

For the ultimate indulgence:

◉ **Angara Wagyu** — $120
*Margaret River New York 10 oz with Saffron Porcini Sauce*

◉ **Oscietra Caviar (30g)** — $199
*Paired with Louis XVIII Cognac*

◉ **Lasooni Lamb Chop** — $54
*Lumina Farms NZ, Dry Spice Rub*

◉ **Black Pepper Beef** — $52
*Filet Mignon, Wok-Fired*

These dishes showcase the pinnacle of our craft.`;

    case "caviar":
      return `**The Only Caviar**

*Oscietra Caviar* — The crown jewel of our Raw & Refined section.

• **30g** — $199
• **½ oz** — $100
• **1 oz** — $180

Paired beautifully with **Louis XVIII Cognac**.

Also try our **Caviar Puri** ($64) — puri crisps filled with whipped labneh, egg white/yolk, shallots & chives.

And the **Wagyu Tambazushi** ($32) comes topped with caviar as well.`;

    case "wagyu":
      return `**Wagyu at Tamba**

We source premium **Margaret River Wagyu** from Australia:

**Angara Wagyu** — $120
*10 oz New York Strip from our Josper oven*
Broccoli, Roast Carrot Purée, Saffron Porcini Mushroom Sauce & Balsamic Curry Glaze

**Wagyu Tambazushi** — $32
*Charred Wagyu nigiri with Caviar, Tamarind Ponzu, Yuzu Kosho, Truffle Oil & Garlic Crisp*

Both are prepared with our signature live-fire technique.`;

    case "josper":
      return `**The Josper Oven** 🪵

*"Within the heart of the flame lies our crown jewel."*

The Josper is a specialized enclosed charcoal oven that combines the intense heat of a grill with the precision of an oven — reaching temperatures that create an unmatched char and seal in flavor.

**From the Josper:**
• **Bhuna Gobi** — $28 (GF)
• ◉ **Tawa Charred Octopus** — $39
• **Banana Leaf Seabass** — $42 (GF)
• **Angara Wagyu** — $120

This is Tamba's secret weapon.`;

    case "tandoor":
      return `**The Tandoor** 🔥

Our traditional clay oven reaches over 900°F, creating that signature char and smoky depth.

**Tandoori Specialties:**
• Saffron Afghani Paneer — $28
• Methi Murgh — $32
• Lasooni Lamb Chop — $54

**Tandoori Breads:**
• Plain Naan — $5
• Garlic Cilantro — $6
• Black Truffle & Fleur de Sel — $8

The tandoor has been central to Indian cooking for centuries.`;

    case "cooking_methods":
      return `**Live-Fire Cooking at Tamba** 🔥

We celebrate the art of flame through five techniques:

**1. Tandoor**
Traditional clay oven for breads and tandoori items (900°F+)

**2. Charcoal Mangal**
South Asian charcoal grill for direct flame cooking

**3. Josper Oven** *(Our Crown Jewel)*
Enclosed charcoal oven — grill + oven in one

**4. Wok**
Chinese-style high-heat stir fry

**5. Tawa**
Flat iron griddle for charring

*"Every Bite Is a Chronicle."*`;

    case "phone":
      return `**Call Us**

📞 **(702) 798-7889**

We're available during service hours:
Monday - Sunday, 5:00 PM - 10:00 PM`;

    case "contact":
      return `**Contact Tamba**

📞 **Phone:** (702) 798-7889
📧 **Email:** info@tambalasvegas.com
🌐 **Website:** www.tambalasvegas.com
📸 **Instagram:** @tambalasvegas

📍 **Address:**
6671 Las Vegas Blvd South, Suite A-117
Town Square, Las Vegas, NV 89119

For reservations: [SevenRooms](https://sevenrooms.com/explore/tambalasvegas)`;

    case "parking":
      return `**Parking**

We're located at **Town Square Las Vegas**, which offers ample free parking throughout the shopping center.

📍 6671 Las Vegas Blvd South, Suite A-117

There's plenty of space close to the restaurant — you won't have trouble finding a spot.`;

    case "dress_code":
      return `**Dress Code**

Tamba is an upscale fine dining experience. We suggest **smart casual to elegant** attire.

Think: elevated, refined, comfortable.

Our dining room features warm terracotta tones, plush chairs, and an intimate atmosphere — dress to match the occasion.`;

    case "thanks":
      return `You're most welcome. 🔥

If you have any other questions about Tamba, I'm here to help.

*"It's Not Just a Restaurant; It's an Experience."*`;

    case "goodbye":
      return `Thank you for your interest in **Tamba Las Vegas**.

We look forward to welcoming you soon. 🔥

📞 (702) 798-7889
🔥 [Book Your Table](https://sevenrooms.com/explore/tambalasvegas)

*"Every Meal, a Journey."*`;

    case "help":
      return `**How Can I Help?**

I'm Agni, your guide to Tamba Las Vegas. I can assist with:

🔥 **Menu & Dishes**
Recommendations, dietary options, chef's favorites

📅 **Reservations**
Booking information, availability

🍸 **Bar Jadu**
Our hidden cocktail bar experience

✨ **Private Events**
Jadu Room for VIP gatherings

📍 **Practical Info**
Hours, location, parking, contact

Just ask naturally — I'm here to help!`;

    case "menu_general":
      return `**Tamba Menu Overview**

Our menu celebrates live-fire cooking through:

🦪 **Raw & Refined** — Crudo, oysters, caviar
🍣 **Tambazushi** — Fire-kissed nigiri
🥗 **Soup & Salad** — Fresh beginnings
🫘 **Street Classics** — India's heart, plated
🔥 **Charcoal & Live Fire** — Tandoor & Mangal
🪵 **Josper** — Our crown jewel
🥢 **Wok** — Quick fury of flame
🍛 **Curries** — The soul of the table
🍚 **Biryani** — Fragrant layered rice
🫓 **Breads** — Flame-kissed tandoori
🥒 **Accompaniments** — Perfect accents

*"Every Bite Is a Chronicle."*

What section interests you?`;

    case "menu_category":
      const category = findCategory(message);
      if (category) {
        const items = category.items
          .map((item) => formatMenuItem(item))
          .join("\n\n");
        return `**${category.emoji} ${category.name}**

*${category.tagline}*

${items}`;
      }
      return generateResponse(message, "menu_general");

    default:
      return `Thank you for your question.

I'm here to help with information about **Tamba Las Vegas** — our menu, reservations, private dining, Bar Jadu, and more.

Could you tell me more about what you're looking for?

📞 For immediate assistance: **(702) 798-7889**`;
  }
}

// ============================================
// QUICK ACTIONS
// ============================================

interface QuickAction {
  label: string;
  message: string;
}

const INITIAL_QUICK_ACTIONS: QuickAction[] = [
  { label: "View Menu", message: "Show me the menu" },
  { label: "Make Reservation", message: "How do I make a reservation?" },
  {
    label: "Chef's Favorites",
    message: "What are Chef Anand's favorite dishes?",
  },
  { label: "Bar Jadu", message: "Tell me about Bar Jadu" },
];

const SECONDARY_QUICK_ACTIONS: QuickAction[] = [
  { label: "Private Dining", message: "Tell me about private dining" },
  { label: "Hours & Location", message: "What are your hours?" },
  {
    label: "Vegetarian Options",
    message: "What vegetarian dishes do you have?",
  },
  { label: "Contact Info", message: "How can I contact you?" },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function SofiaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Send welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content: generateResponse("hello", "greeting"),
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay for natural feel
    await new Promise((resolve) =>
      setTimeout(resolve, 600 + Math.random() * 800),
    );

    const intent = detectIntent(userMessage.content);
    const response = generateResponse(userMessage.content, intent);

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  }, [input]);

  const handleQuickAction = useCallback((message: string) => {
    setInput(message);
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      setTimeout(
        () => {
          const intent = detectIntent(message);
          const response = generateResponse(message, intent);

          const assistantMessage: ChatMessage = {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: response,
            timestamp: new Date(),
          };

          setIsTyping(false);
          setMessages((prev) => [...prev, assistantMessage]);
        },
        600 + Math.random() * 800,
      );
    }, 50);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions =
    messages.length <= 1 ? INITIAL_QUICK_ACTIONS : SECONDARY_QUICK_ACTIONS;

  // Format message with markdown-like styling
  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-tamba-gold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-tamba-cream/80">$1</em>')
      .replace(/◉/g, '<span class="chef-favorite">◉</span>')
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-tamba-ember hover:text-tamba-gold underline transition-colors">$1</a>',
      )
      .replace(/\n/g, "<br />");
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center sofia-glass fire-glow ember-pulse float-hover transition-all duration-300 group"
          style={{ borderRadius: "4px" }}
          aria-label="Open chat with Agni"
        >
          {/* Fire Ring Effect */}
          <div
            className="absolute inset-0 fire-ring"
            style={{ borderRadius: "4px" }}
          />

          {/* Icon */}
          <div className="relative">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-tamba-ember group-hover:text-tamba-gold transition-colors"
            >
              <path
                d="M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 7 12 2 12 2Z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M12 6C12 6 10 9 10 11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11C14 9 12 6 12 6Z"
                fill="#f5f0e8"
              />
              <path
                d="M12 17V22M8 20H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Online Indicator */}
          <div className="absolute top-2 right-2 online-indicator" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-full max-w-[420px] h-[650px] flex flex-col sofia-glass fire-glow chat-open sm:bottom-6 sm:right-6 chat-mobile-full sm:chat-mobile-reset"
          style={{ borderRadius: "8px" }}
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Agni"
        >
          {/* Header */}
          <div
            className="relative flex items-center justify-between px-5 py-4 border-b border-tamba-ember/20 tandoor-gradient safe-top"
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            {/* Shimmer Effect */}
            <div
              className="absolute inset-0 header-shimmer pointer-events-none"
              style={{ borderRadius: "8px 8px 0 0" }}
            />

            <div className="relative flex items-center gap-3">
              {/* Avatar */}
              <div
                className="w-10 h-10 flex items-center justify-center bg-tamba-ember/20 border border-tamba-ember/30"
                style={{ borderRadius: "4px" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-tamba-ember"
                >
                  <path
                    d="M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 7 12 2 12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 6C12 6 10 9 10 11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11C14 9 12 6 12 6Z"
                    fill="#f5f0e8"
                  />
                </svg>
              </div>

              <div>
                <h3
                  className="text-base font-semibold text-tamba-cream tracking-wide"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Agni
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-tamba-cream/60">
                  <span
                    className="online-indicator"
                    style={{ width: "6px", height: "6px" }}
                  />
                  <span>Tamba Concierge</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center text-tamba-cream/60 hover:text-tamba-cream hover:bg-tamba-ember/10 transition-all"
              style={{ borderRadius: "4px" }}
              aria-label="Close chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chat-scroll">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} message-enter`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-tamba-ember/20 border border-tamba-ember/30 text-tamba-cream"
                      : "bg-tamba-charcoal/80 border border-tamba-cream/10 text-tamba-cream/90"
                  }`}
                  style={{ borderRadius: "4px" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.content),
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start message-enter">
                <div
                  className="px-4 py-3 bg-tamba-charcoal/80 border border-tamba-cream/10"
                  style={{ borderRadius: "4px" }}
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-tamba-ember rounded-full typing-dot" />
                    <span className="w-2 h-2 bg-tamba-ember rounded-full typing-dot" />
                    <span className="w-2 h-2 bg-tamba-ember rounded-full typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {!isTyping && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.message)}
                    className="px-3 py-1.5 text-xs text-tamba-cream/70 border border-tamba-cream/20 bg-tamba-charcoal/50 quick-action"
                    style={{ borderRadius: "3px" }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 safe-bottom">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our menu, reservations..."
                className="flex-1 h-12 px-4 bg-tamba-charcoal border border-tamba-cream/15 text-tamba-cream placeholder:text-tamba-cream/40 text-sm input-fire"
                style={{ borderRadius: "4px" }}
                aria-label="Type your message"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 flex items-center justify-center send-button text-tamba-cream"
                style={{ borderRadius: "4px" }}
                aria-label="Send message"
              >
                {isTyping ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="animate-spin"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
