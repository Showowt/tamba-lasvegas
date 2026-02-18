"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ============================================
// TAMBA LAS VEGAS — ENHANCED KNOWLEDGE BASE
// With taste profiles, allergens, and mood matching
// ============================================

interface MenuItem {
  name: string;
  price: number | string;
  description: string;
  dietary: string[];
  chefFavorite?: boolean;
  addOns?: { name: string; price: number }[];
  // Enhanced attributes for recommendations
  taste: string[]; // sweet, savory, spicy, tangy, umami, smoky, rich, light, creamy, crispy
  protein?: string; // chicken, lamb, goat, beef, fish, seafood, vegetable, paneer
  allergens: string[]; // dairy, nuts, gluten, shellfish, eggs, soy, fish
  spiceLevel: number; // 0-3 (0=none, 1=mild, 2=medium, 3=hot)
  cookingMethod?: string; // tandoor, josper, wok, raw, braised
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
    },
    mixologist: {
      name: "Giuseppe Gonzalez",
      title: "Master Mixologist",
      venue: "Bar Jadu",
    },
  },
};

// ============================================
// ENHANCED MENU WITH TASTE PROFILES & ALLERGENS
// ============================================

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
        taste: ["savory", "umami", "light"],
        protein: "vegetable",
        allergens: ["soy"],
        spiceLevel: 0,
        cookingMethod: "tandoor",
      },
      {
        name: "Tamarind Spiced Hamachi",
        price: 28,
        description: "Asian Pear, Curry Emulsion, Tamarind Ponzu & Serrano",
        dietary: ["GF"],
        chefFavorite: true,
        taste: ["tangy", "sweet", "spicy", "light"],
        protein: "fish",
        allergens: ["fish", "soy"],
        spiceLevel: 2,
        cookingMethod: "raw",
      },
      {
        name: "Octopus Carpaccio",
        price: 28,
        description:
          "Octopus, Miso Dressing, Green Chutney Purée & Crispy Garlic",
        dietary: ["GF"],
        taste: ["umami", "savory", "light"],
        protein: "seafood",
        allergens: ["shellfish", "soy"],
        spiceLevel: 0,
        cookingMethod: "raw",
      },
      {
        name: "Caviar Puri",
        price: 64,
        description:
          "Puri Crisps Filled With Whipped Labneh, Egg White/Yolk, Shallots & Chives (4 bites)",
        dietary: [],
        taste: ["rich", "savory", "crispy", "creamy"],
        protein: "seafood",
        allergens: ["dairy", "eggs", "gluten", "fish"],
        spiceLevel: 0,
      },
      {
        name: "Madras Tuna Laap",
        price: 28,
        description:
          "Tuna, Madras Curry, Mint, Chili & Kaffir Lime Roasted Rice Powder",
        dietary: ["GF"],
        taste: ["spicy", "tangy", "light", "fresh"],
        protein: "fish",
        allergens: ["fish"],
        spiceLevel: 2,
        cookingMethod: "raw",
      },
      {
        name: "Seasonal Oysters",
        price: 34,
        description:
          "Chili-Infused Ponzu, Yuzu Mignonette & Apple Wasabi Granita",
        dietary: ["GF"],
        taste: ["tangy", "spicy", "light", "fresh"],
        protein: "seafood",
        allergens: ["shellfish", "soy"],
        spiceLevel: 1,
        cookingMethod: "raw",
      },
      {
        name: "Kimchi Butter Oysters",
        price: 36,
        description:
          "Grilled Oysters with Kimchi Butter, Smoked Sea Salt & Citrus Segments",
        dietary: ["GF"],
        chefFavorite: true,
        taste: ["umami", "savory", "tangy", "smoky"],
        protein: "seafood",
        allergens: ["shellfish", "dairy"],
        spiceLevel: 1,
        cookingMethod: "josper",
      },
      {
        name: "Oscietra Caviar 30g",
        price: 199,
        description: "Paired with Louis XVIII Cognac",
        dietary: [],
        taste: ["rich", "savory", "umami"],
        protein: "seafood",
        allergens: ["fish"],
        spiceLevel: 0,
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
        name: "Salmon Nigiri",
        price: 24,
        description:
          "Seared Salmon, Omakase Soy, Citrus Aioli, Yuzu & Micro Cilantro",
        dietary: [],
        taste: ["savory", "umami", "light"],
        protein: "fish",
        allergens: ["fish", "soy", "eggs"],
        spiceLevel: 0,
      },
      {
        name: "Tuna Nigiri",
        price: 26,
        description:
          "Tuna, Honey Truffle Glaze, Garlic Chive, Smoked Sea Salt, Kizami Wasabi & Shiso",
        dietary: ["GF"],
        chefFavorite: true,
        taste: ["umami", "sweet", "savory"],
        protein: "fish",
        allergens: ["fish"],
        spiceLevel: 1,
      },
      {
        name: "Wagyu Nigiri",
        price: 32,
        description:
          "Charred Margaret River Wagyu, Caviar, Tamarind Ponzu, Yuzu Kosho, Truffle Oil & Garlic Crisp",
        dietary: ["GF"],
        taste: ["rich", "umami", "savory", "smoky"],
        protein: "beef",
        allergens: ["fish", "soy"],
        spiceLevel: 0,
        cookingMethod: "josper",
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
        taste: ["sweet", "tangy", "light", "fresh"],
        protein: "vegetable",
        allergens: ["gluten"],
        spiceLevel: 0,
      },
      {
        name: "Green Papaya Salad",
        price: 24,
        description:
          "Chayote, Mint, Cherry Tomato, Long Beans, Lime Chili Dressing & Roasted Peanuts",
        dietary: ["GF"],
        chefFavorite: true,
        taste: ["tangy", "spicy", "fresh", "crispy"],
        protein: "vegetable",
        allergens: ["nuts"],
        spiceLevel: 2,
        addOns: [{ name: "Prawns", price: 5 }],
      },
      {
        name: "Broccoli Caesar",
        price: 24,
        description:
          "Mangal Charred Broccoli, Tamarind Caesar Dressing, Naan Croutons & 36-Month Aged Parmigiano",
        dietary: ["V"],
        taste: ["savory", "tangy", "smoky", "crispy"],
        protein: "vegetable",
        allergens: ["dairy", "gluten", "eggs"],
        spiceLevel: 0,
        cookingMethod: "tandoor",
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
        taste: ["savory", "tangy", "spicy", "crispy"],
        protein: "vegetable",
        allergens: ["gluten"],
        spiceLevel: 2,
      },
      {
        name: "Sea Bass Amritsari",
        price: 26,
        description:
          "Fried Seabass, Daikon Kimchi Salad, Garlic and Tomato Sambal with Mint Salsa",
        dietary: ["GF"],
        taste: ["savory", "crispy", "tangy", "spicy"],
        protein: "fish",
        allergens: ["fish"],
        spiceLevel: 2,
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
        taste: ["creamy", "savory", "smoky"],
        protein: "paneer",
        allergens: ["dairy"],
        spiceLevel: 1,
        cookingMethod: "tandoor",
      },
      {
        name: "Lemongrass Fish Tikka",
        price: 36,
        description:
          "Chilean Sea Bass, Ajwain, Madras Curry, Tomato Salsa, Kachumber Salad, Tamarind & Mint Chutney",
        dietary: ["GF"],
        taste: ["savory", "tangy", "spicy", "smoky"],
        protein: "fish",
        allergens: ["fish"],
        spiceLevel: 2,
        cookingMethod: "tandoor",
      },
      {
        name: "Methi Murgh",
        price: 32,
        description:
          "Fenugreek-Spiced Chicken Thigh Kebab, Butter Chat Masala, Kimchi, Garlic Hummus & Green Chutneys",
        dietary: ["GF"],
        taste: ["savory", "smoky", "spicy", "rich"],
        protein: "chicken",
        allergens: ["dairy", "soy"],
        spiceLevel: 2,
        cookingMethod: "tandoor",
      },
      {
        name: "Lasooni Lamb Chop",
        price: 54,
        description:
          "Lumina Farms, NZ — Dry Spice Rub, Cumin Spinach Potato Masala with Pickled Salad",
        dietary: ["GF"],
        chefFavorite: true,
        taste: ["rich", "smoky", "savory", "spicy"],
        protein: "lamb",
        allergens: [],
        spiceLevel: 2,
        cookingMethod: "tandoor",
      },
      {
        name: "Angithi Kefta",
        price: 49,
        description:
          "Filet Mignon & Ground Lamb, Mint Garlic Labneh, Pickled Onion, Grilled Tomato & Garlic Aioli",
        dietary: ["GF"],
        taste: ["rich", "savory", "smoky", "tangy"],
        protein: "lamb",
        allergens: ["dairy", "eggs"],
        spiceLevel: 1,
        cookingMethod: "tandoor",
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
        taste: ["savory", "smoky", "spicy", "umami"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 2,
        cookingMethod: "josper",
      },
      {
        name: "Tawa Charred Octopus",
        price: 39,
        description:
          "Cauliflower Purée, Beetroot, Fennel, Yuzu Lime Chaat Aioli, Orange Glaze, Rice Crunch with Eel Sauce",
        dietary: [],
        chefFavorite: true,
        taste: ["umami", "savory", "tangy", "smoky", "crispy"],
        protein: "seafood",
        allergens: ["shellfish", "eggs", "soy", "gluten"],
        spiceLevel: 1,
        cookingMethod: "josper",
      },
      {
        name: "Banana Leaf Seabass",
        price: 42,
        description:
          "Wrapped & Roasted Chilean Seabass, Truffle Celeriac Purée, Edamame, Kerala Sauce with Creamy Citric Lime",
        dietary: ["GF"],
        taste: ["rich", "savory", "creamy", "tangy"],
        protein: "fish",
        allergens: ["fish", "dairy"],
        spiceLevel: 1,
        cookingMethod: "josper",
      },
      {
        name: "Angara Wagyu",
        price: 120,
        description:
          "Margaret River New York 10 oz — Broccoli, Roast Carrot Purée, Saffron Porcini Mushroom Sauce & Balsamic Curry Glaze",
        dietary: [],
        taste: ["rich", "umami", "savory", "smoky"],
        protein: "beef",
        allergens: ["dairy"],
        spiceLevel: 0,
        cookingMethod: "josper",
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
        taste: ["savory", "tangy", "spicy"],
        protein: "vegetable",
        allergens: ["gluten", "soy"],
        spiceLevel: 2,
        cookingMethod: "wok",
      },
      {
        name: "Black Pepper Beef",
        price: 52,
        description:
          "Stir Fried Filet Mignon with Mushroom, Celery, Broccoli & Lemongrass",
        dietary: [],
        taste: ["savory", "spicy", "umami"],
        protein: "beef",
        allergens: ["soy"],
        spiceLevel: 2,
        cookingMethod: "wok",
      },
      {
        name: "Seafood Noodle Stir Fry",
        price: 40,
        description: "Lobster, Shrimp, Seabass, Egg & Lemongrass Sauce",
        dietary: [],
        taste: ["savory", "umami", "tangy"],
        protein: "seafood",
        allergens: ["shellfish", "fish", "eggs", "gluten", "soy"],
        spiceLevel: 1,
        cookingMethod: "wok",
      },
      {
        name: "Vegetarian Fried Rice",
        price: 28,
        description:
          "Basmati Rice, Kaffir Lime Leaves, Lemongrass, Thai Chili & Szechuan Sauce",
        dietary: ["V", "VG"],
        taste: ["savory", "spicy", "tangy"],
        protein: "vegetable",
        allergens: ["soy"],
        spiceLevel: 2,
        cookingMethod: "wok",
      },
      {
        name: "Lobster Fried Rice",
        price: 46,
        description:
          "Lobster Tail, Basmati Rice, Kaffir Lime Leaves, Lemongrass, Thai Chili & Szechuan Sauce",
        dietary: [],
        taste: ["savory", "rich", "spicy"],
        protein: "seafood",
        allergens: ["shellfish", "soy", "eggs"],
        spiceLevel: 2,
        cookingMethod: "wok",
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
        taste: ["savory", "creamy", "rich"],
        protein: "vegetable",
        allergens: ["dairy"],
        spiceLevel: 1,
        cookingMethod: "braised",
      },
      {
        name: "Pahadi Paneer",
        price: 28,
        description:
          "Pressed Milk Cheese, Exotic Spices, Rich Yogurt, Mint & Coriander Gravy",
        dietary: ["V", "GF"],
        chefFavorite: true,
        taste: ["creamy", "savory", "tangy", "fresh"],
        protein: "paneer",
        allergens: ["dairy"],
        spiceLevel: 1,
        cookingMethod: "braised",
      },
      {
        name: "Achari Bhindi Do Pyaza",
        price: 28,
        description:
          "Spiced Okra and Onion, Cumin, Chili, Pickled Mango Masala",
        dietary: ["V", "VG", "GF"],
        chefFavorite: true,
        taste: ["tangy", "spicy", "savory"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 2,
        cookingMethod: "braised",
      },
      {
        name: "Fire-Roasted Baby Baingan",
        price: 28,
        description:
          "Fire-Roasted Baby Indian Eggplant Stuffed with Smoky South Indian Masala with Whipped Lebne",
        dietary: ["V", "GF"],
        taste: ["smoky", "savory", "creamy"],
        protein: "vegetable",
        allergens: ["dairy"],
        spiceLevel: 1,
        cookingMethod: "tandoor",
      },
      {
        name: "Roasted Aloo Gobi Masala",
        price: 28,
        description:
          "Turmeric-Roasted Potatoes & Cauliflower, Green Chili, Onion & Ginger",
        dietary: ["V", "VG", "GF"],
        taste: ["savory", "spicy", "fresh"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 2,
        cookingMethod: "braised",
      },
      {
        name: "Butter Chicken",
        price: 34,
        description:
          "Chicken Thigh Tikka in a Cashew & Tomato Butter Sauce with Fenugreek",
        dietary: ["GF"],
        taste: ["creamy", "rich", "savory", "sweet"],
        protein: "chicken",
        allergens: ["dairy", "nuts"],
        spiceLevel: 1,
        cookingMethod: "braised",
      },
      {
        name: "Lobster Green Curry",
        price: 46,
        description:
          "Poached Lobster Tail, Green Coconut Masala, Mexican Chili, Coriander-Mint Purée & Hand-Ground Coastal Spices",
        dietary: ["GF"],
        chefFavorite: true,
        taste: ["rich", "creamy", "spicy", "fresh"],
        protein: "seafood",
        allergens: ["shellfish"],
        spiceLevel: 2,
        cookingMethod: "braised",
      },
      {
        name: "Fish Moilee Masala",
        price: 36,
        description:
          "Sea Bass, Turmeric & Mustard, Curry Leaves, Coconut Tamarind Sauce",
        dietary: ["GF"],
        taste: ["creamy", "tangy", "savory"],
        protein: "fish",
        allergens: ["fish"],
        spiceLevel: 1,
        cookingMethod: "braised",
      },
      {
        name: "Chicken Tariwala",
        price: 34,
        description: "Slow-Cooked Chicken Thigh in a Spiced Home-Style Curry",
        dietary: ["GF"],
        taste: ["savory", "spicy", "rich"],
        protein: "chicken",
        allergens: [],
        spiceLevel: 2,
        cookingMethod: "braised",
      },
      {
        name: "Nihari Gosht",
        price: 44,
        description:
          "Slow-Braised Goat in Bone Marrow Gravy, Finished with Whole Roasted Spices",
        dietary: ["GF"],
        chefFavorite: true,
        taste: ["rich", "savory", "umami", "spicy"],
        protein: "goat",
        allergens: [],
        spiceLevel: 2,
        cookingMethod: "braised",
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
        taste: ["savory", "fragrant", "rich"],
        protein: "vegetable",
        allergens: ["gluten", "dairy"],
        spiceLevel: 1,
        cookingMethod: "braised",
      },
      {
        name: "Tandoori Murgh Biryani",
        price: 36,
        description:
          "Tandoori Chicken, Saffron Basmati Rice, Biryani Masala & Toasted Nuts",
        dietary: ["GF"],
        taste: ["savory", "smoky", "fragrant", "rich"],
        protein: "chicken",
        allergens: ["nuts", "dairy"],
        spiceLevel: 1,
        cookingMethod: "braised",
      },
      {
        name: "Mutton Biryani",
        price: 42,
        description:
          "Marinated Goat, Saffron Basmati Rice, Indian Herbs & Spices",
        dietary: ["GF"],
        taste: ["rich", "savory", "fragrant", "spicy"],
        protein: "goat",
        allergens: ["dairy"],
        spiceLevel: 2,
        cookingMethod: "braised",
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
        taste: ["savory"],
        protein: "vegetable",
        allergens: ["gluten", "dairy"],
        spiceLevel: 0,
        cookingMethod: "tandoor",
      },
      {
        name: "Tandoori Roti",
        price: 6,
        description: "Whole wheat unleavened bread",
        dietary: [],
        taste: ["savory"],
        protein: "vegetable",
        allergens: ["gluten"],
        spiceLevel: 0,
        cookingMethod: "tandoor",
      },
      {
        name: "Garlic Cilantro Naan",
        price: 6,
        description: "Naan topped with garlic and fresh cilantro",
        dietary: [],
        taste: ["savory", "fresh"],
        protein: "vegetable",
        allergens: ["gluten", "dairy"],
        spiceLevel: 0,
        cookingMethod: "tandoor",
      },
      {
        name: "Goat Cheese & Togarashi Naan",
        price: 7,
        description: "Naan with creamy goat cheese and Japanese spice blend",
        dietary: [],
        taste: ["savory", "creamy", "spicy"],
        protein: "vegetable",
        allergens: ["gluten", "dairy"],
        spiceLevel: 1,
        cookingMethod: "tandoor",
      },
      {
        name: "Black Truffle & Fleur de Sel Naan",
        price: 8,
        description: "Luxurious naan with black truffle and sea salt",
        dietary: [],
        taste: ["rich", "umami", "savory"],
        protein: "vegetable",
        allergens: ["gluten", "dairy"],
        spiceLevel: 0,
        cookingMethod: "tandoor",
      },
      {
        name: "Exotic Bread Basket",
        price: 21,
        description: "A selection of our finest tandoori breads",
        dietary: [],
        taste: ["savory"],
        protein: "vegetable",
        allergens: ["gluten", "dairy"],
        spiceLevel: 0,
        cookingMethod: "tandoor",
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
        taste: ["creamy", "fresh", "tangy"],
        protein: "vegetable",
        allergens: ["dairy"],
        spiceLevel: 0,
      },
      {
        name: "Onion & Green Chili Salad",
        price: 8,
        description: "Fresh onions with spicy green chilies",
        dietary: [],
        taste: ["spicy", "fresh", "tangy"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 2,
      },
      {
        name: "Trio of Chutney",
        price: 6,
        description: "Three house-made chutneys",
        dietary: [],
        taste: ["tangy", "spicy", "sweet"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 1,
      },
      {
        name: "House Spiced Pickles",
        price: 10,
        description: "Traditional Indian pickles",
        dietary: [],
        taste: ["tangy", "spicy", "savory"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 2,
      },
      {
        name: "Basmati Rice",
        price: 6,
        description: "Steamed aromatic basmati rice",
        dietary: [],
        taste: ["savory", "fragrant"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 0,
      },
      {
        name: "Masala Papad",
        price: 5,
        description: "Crispy wafers with masala topping",
        dietary: [],
        taste: ["crispy", "spicy", "savory"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 1,
      },
      {
        name: "Persian Cucumber",
        price: 5,
        description: "Fresh Persian cucumbers",
        dietary: [],
        taste: ["fresh", "light"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 0,
      },
      {
        name: "Josper Grill Vegetables",
        price: 12,
        description: "Seasonal vegetables from our Josper oven",
        dietary: [],
        taste: ["smoky", "savory"],
        protein: "vegetable",
        allergens: [],
        spiceLevel: 0,
        cookingMethod: "josper",
      },
    ],
  },
];

// ============================================
// ALLERGEN MAPPING
// ============================================

const ALLERGEN_NAMES: Record<string, string> = {
  dairy: "Dairy",
  nuts: "Tree Nuts",
  gluten: "Gluten",
  shellfish: "Shellfish",
  eggs: "Eggs",
  soy: "Soy",
  fish: "Fish",
};

const COMMON_ALLERGENS = [
  "dairy",
  "nuts",
  "gluten",
  "shellfish",
  "eggs",
  "soy",
  "fish",
];

// ============================================
// TASTE/MOOD PROFILES
// ============================================

type MoodType =
  | "adventurous"
  | "comfort"
  | "light"
  | "indulgent"
  | "spicy"
  | "mild"
  | "seafood"
  | "meat"
  | "vegetarian";

const MOOD_RECOMMENDATIONS: Record<
  MoodType,
  {
    tastes?: string[];
    proteins?: string[];
    maxSpice?: number;
    minSpice?: number;
  }
> = {
  adventurous: {
    tastes: ["umami", "tangy", "spicy", "smoky"],
    proteins: ["seafood", "goat", "lamb"],
  },
  comfort: {
    tastes: ["creamy", "rich", "savory"],
    proteins: ["chicken", "paneer", "vegetable"],
  },
  light: { tastes: ["light", "fresh", "tangy"], maxSpice: 1 },
  indulgent: {
    tastes: ["rich", "creamy", "umami"],
    proteins: ["beef", "lamb", "seafood"],
  },
  spicy: { tastes: ["spicy"], minSpice: 2 },
  mild: { tastes: ["creamy", "savory", "sweet"], maxSpice: 1 },
  seafood: { proteins: ["fish", "seafood"] },
  meat: { proteins: ["chicken", "lamb", "beef", "goat"] },
  vegetarian: { proteins: ["vegetable", "paneer"] },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getAllItems(): MenuItem[] {
  const items: MenuItem[] = [];
  MENU.forEach((cat) => cat.items.forEach((item) => items.push(item)));
  return items;
}

function filterByAllergens(
  items: MenuItem[],
  avoidAllergens: string[],
): MenuItem[] {
  return items.filter(
    (item) => !item.allergens.some((a) => avoidAllergens.includes(a)),
  );
}

function filterByDietary(items: MenuItem[], dietary: string): MenuItem[] {
  return items.filter((item) => item.dietary.includes(dietary));
}

function filterBySpiceLevel(
  items: MenuItem[],
  maxSpice?: number,
  minSpice?: number,
): MenuItem[] {
  return items.filter((item) => {
    if (maxSpice !== undefined && item.spiceLevel > maxSpice) return false;
    if (minSpice !== undefined && item.spiceLevel < minSpice) return false;
    return true;
  });
}

function filterByProtein(items: MenuItem[], proteins: string[]): MenuItem[] {
  return items.filter(
    (item) => item.protein && proteins.includes(item.protein),
  );
}

function filterByTaste(items: MenuItem[], tastes: string[]): MenuItem[] {
  return items.filter((item) => item.taste.some((t) => tastes.includes(t)));
}

function scoreItemForMood(item: MenuItem, mood: MoodType): number {
  const prefs = MOOD_RECOMMENDATIONS[mood];
  let score = 0;
  if (prefs.tastes) {
    score += item.taste.filter((t) => prefs.tastes!.includes(t)).length * 2;
  }
  if (prefs.proteins && item.protein && prefs.proteins.includes(item.protein)) {
    score += 3;
  }
  if (item.chefFavorite) score += 2;
  if (prefs.maxSpice !== undefined && item.spiceLevel <= prefs.maxSpice)
    score += 1;
  if (prefs.minSpice !== undefined && item.spiceLevel >= prefs.minSpice)
    score += 2;
  return score;
}

function getRecommendationsForMood(
  mood: MoodType,
  avoidAllergens: string[] = [],
  count = 5,
): MenuItem[] {
  let items = getAllItems();
  items = filterByAllergens(items, avoidAllergens);
  const prefs = MOOD_RECOMMENDATIONS[mood];
  if (prefs.maxSpice !== undefined)
    items = filterBySpiceLevel(items, prefs.maxSpice, undefined);
  if (prefs.minSpice !== undefined)
    items = filterBySpiceLevel(items, undefined, prefs.minSpice);
  if (prefs.proteins)
    items = items.filter(
      (i) => !i.protein || prefs.proteins!.includes(i.protein),
    );
  const scored = items.map((item) => ({
    item,
    score: scoreItemForMood(item, mood),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.item);
}

function getSafeItemsForAllergens(allergens: string[]): MenuItem[] {
  return filterByAllergens(getAllItems(), allergens);
}

function getChefFavorites(): MenuItem[] {
  return getAllItems().filter((item) => item.chefFavorite);
}

function getItemsByDietary(dietary: string): MenuItem[] {
  return filterByDietary(getAllItems(), dietary);
}

function formatPrice(price: number | string): string {
  return typeof price === "number" ? `$${price}` : price;
}

function formatMenuItem(item: MenuItem): string {
  let line = `**${item.name}** — ${formatPrice(item.price)}`;
  if (item.chefFavorite) line = `◉ ${line}`;
  if (item.dietary.length > 0)
    line += ` ${item.dietary.map((d) => `(${d})`).join(" ")}`;
  line += `\n${item.description}`;
  if (item.spiceLevel >= 2) line += `\n🌶️ *Spicy*`;
  return line;
}

function formatItemCompact(item: MenuItem): string {
  let line = `• **${item.name}** — ${formatPrice(item.price)}`;
  if (item.chefFavorite)
    line = `• ◉ **${item.name}** — ${formatPrice(item.price)}`;
  if (item.dietary.length > 0)
    line += ` ${item.dietary.map((d) => `(${d})`).join(" ")}`;
  return line;
}

// ============================================
// INTENT DETECTION
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
  | "allergy_query"
  | "mood_adventurous"
  | "mood_comfort"
  | "mood_light"
  | "mood_indulgent"
  | "mood_spicy"
  | "mood_mild"
  | "mood_seafood"
  | "mood_meat"
  | "recommendation"
  | "default";

function detectAllergens(message: string): string[] {
  const lower = message.toLowerCase();
  const found: string[] = [];
  if (/dairy|milk|lactose|cheese|cream|butter/i.test(lower))
    found.push("dairy");
  if (/nut|peanut|almond|cashew|walnut|pecan/i.test(lower)) found.push("nuts");
  if (/gluten|wheat|bread|celiac/i.test(lower)) found.push("gluten");
  if (/shellfish|shrimp|lobster|crab|oyster|clam|mussel/i.test(lower))
    found.push("shellfish");
  if (/egg/i.test(lower)) found.push("eggs");
  if (/soy|soya|tofu/i.test(lower)) found.push("soy");
  if (/fish(?!.*shellfish)/i.test(lower) && !/jellyfish/i.test(lower))
    found.push("fish");
  return found;
}

function detectMood(message: string): MoodType | null {
  const lower = message.toLowerCase();
  if (
    /adventur|bold|unique|surprise|different|exotic|try something new/i.test(
      lower,
    )
  )
    return "adventurous";
  if (/comfort|cozy|warm|homey|classic|familiar|soul/i.test(lower))
    return "comfort";
  if (/light|fresh|healthy|not heavy|not too heavy|refreshing/i.test(lower))
    return "light";
  if (/indulg|splurge|treat|special|luxur|rich|decadent/i.test(lower))
    return "indulgent";
  if (/spicy|hot|heat|kick|fire|burn/i.test(lower)) return "spicy";
  if (/mild|not spicy|no spice|gentle|subtle|bland/i.test(lower)) return "mild";
  if (/seafood|fish|ocean|shrimp|lobster|oyster|crab/i.test(lower))
    return "seafood";
  if (/meat|protein|chicken|lamb|beef|goat|steak/i.test(lower)) return "meat";
  return null;
}

function detectIntent(message: string): IntentType {
  const lower = message.toLowerCase();

  // Allergy check first
  const allergens = detectAllergens(message);
  if (
    allergens.length > 0 &&
    /allerg|can.?t eat|avoid|intoleran|sensitiv|without|free from|no\s+\w+/i.test(
      lower,
    )
  ) {
    return "allergy_query";
  }

  // Mood/taste detection
  const mood = detectMood(message);
  if (mood) {
    if (
      /recommend|suggest|what should|mood|craving|feel like|in the mood/i.test(
        lower,
      )
    ) {
      switch (mood) {
        case "adventurous":
          return "mood_adventurous";
        case "comfort":
          return "mood_comfort";
        case "light":
          return "mood_light";
        case "indulgent":
          return "mood_indulgent";
        case "spicy":
          return "mood_spicy";
        case "mild":
          return "mood_mild";
        case "seafood":
          return "mood_seafood";
        case "meat":
          return "mood_meat";
      }
    }
  }

  // General recommendation request
  if (
    /recommend|suggest|what should i|what do you suggest|help.*choose|what's good|what.s popular/i.test(
      lower,
    )
  ) {
    return "recommendation";
  }

  // Standard intents
  if (
    /^(hi|hello|hey|good\s*(morning|evening|afternoon)|howdy|greetings)/i.test(
      lower,
    )
  )
    return "greeting";
  if (/hours|open|close|when.*open|time|schedule/i.test(lower)) return "hours";
  if (/where|location|address|directions|find you|how.*get/i.test(lower))
    return "location";
  if (/reserv|book|table|sevenrooms|availability/i.test(lower))
    return "reservations";
  if (/chef|anand|singh|michelin|who.*cook/i.test(lower)) return "chef";
  if (/bar\s*jadu|cocktail|drink|mixologist|giuseppe|hidden.*bar/i.test(lower))
    return "bar_jadu";
  if (
    /private|jadu.*room|event|corporate|vip|celebration|party|minimum.*spend/i.test(
      lower,
    )
  )
    return "private_dining";
  if (/vegetarian|veggie\s+options?/i.test(lower)) return "vegetarian";
  if (/vegan/i.test(lower)) return "vegan";
  if (/gluten\s*free|gf|celiac|no\s*gluten/i.test(lower)) return "gluten_free";
  if (/diet|restrict/i.test(lower)) return "dietary";
  if (/favorite|signature|must.*try|best.*dish|popular|special/i.test(lower))
    return "chef_favorites";
  if (/most.*expensive|splurge|luxury item/i.test(lower)) return "expensive";
  if (/price|cost|cheap|afford|budget/i.test(lower)) return "prices";
  if (/caviar/i.test(lower)) return "caviar";
  if (/wagyu/i.test(lower)) return "wagyu";
  if (/josper/i.test(lower)) return "josper";
  if (/tandoor/i.test(lower)) return "tandoor";
  if (/cook|technique|method|fire|charcoal|grill|wok|mangal/i.test(lower))
    return "cooking_methods";
  if (
    /raw|crudo|oyster|sashimi|sushi|tambazushi|nigiri|soup|salad|street|chaat|samosa|curry|curries|biryani|rice|bread|naan|roti/i.test(
      lower,
    )
  )
    return "menu_category";
  if (/menu|food|eat|dish|cuisine/i.test(lower)) return "menu_general";
  if (/phone|call|number/i.test(lower)) return "phone";
  if (/contact|email|reach/i.test(lower)) return "contact";
  if (/park/i.test(lower)) return "parking";
  if (/dress|wear|attire|code|formal/i.test(lower)) return "dress_code";
  if (/thank|appreciate|grateful/i.test(lower)) return "thanks";
  if (/bye|goodbye|see you|later/i.test(lower)) return "goodbye";
  if (/help|assist|support|what can you/i.test(lower)) return "help";

  return "default";
}

// ============================================
// RESPONSE GENERATION
// ============================================

function generateResponse(message: string, intent: IntentType): string {
  switch (intent) {
    case "greeting":
      return `Welcome to **Tamba Las Vegas** — where fire meets flavor. 🔥

*"Rooted in Tradition. It's Not Just a Restaurant; It's an Experience."*

I'm Agni, your guide to contemporary Indian fine dining. How may I assist you?

You can ask me about:
• Our menu & chef's favorites
• **Recommendations based on your mood** ("I'm craving something spicy")
• **Dietary needs & allergies** ("I have a nut allergy")
• Reservations, Bar Jadu, private dining`;

    case "allergy_query":
      const allergens = detectAllergens(message);
      const safeItems = getSafeItemsForAllergens(allergens);
      const allergenNames = allergens.map((a) => ALLERGEN_NAMES[a]).join(", ");
      const safeList = safeItems.slice(0, 8).map(formatItemCompact).join("\n");
      return `**Safe Options — No ${allergenNames}**

I've filtered our menu for items that don't contain ${allergenNames.toLowerCase()}:

${safeList}

...and **${safeItems.length} more items** available!

Many additional dishes can be modified. **Please inform your server** of your allergies — our kitchen takes dietary restrictions seriously.

Would you like me to narrow this down further by cuisine type or taste preference?`;

    case "mood_adventurous":
      const advItems = getRecommendationsForMood("adventurous", [], 5);
      const advList = advItems.map(formatItemCompact).join("\n");
      return `**Feeling Adventurous?** 🔥

For the bold explorer, I recommend:

${advList}

These dishes showcase unique flavors, unexpected combinations, and Tamba's innovative spirit.

◉ = Chef Anand's personal favorites

Any dietary restrictions I should consider?`;

    case "mood_comfort":
      const comfortItems = getRecommendationsForMood("comfort", [], 5);
      const comfortList = comfortItems.map(formatItemCompact).join("\n");
      return `**Comfort Food Cravings** 🍛

For warming, soul-satisfying dishes:

${comfortList}

Rich, creamy, and deeply satisfying — these are the dishes that feel like home.

Pair with **Garlic Cilantro Naan** ($6) to complete the experience.`;

    case "mood_light":
      const lightItems = getRecommendationsForMood("light", [], 5);
      const lightList = lightItems.map(formatItemCompact).join("\n");
      return `**Light & Fresh** 🥗

For something refreshing and not too heavy:

${lightList}

These dishes bring brightness, tang, and freshness to the table.

The **Green Papaya Salad** is a Chef's favorite — vibrant and energizing!`;

    case "mood_indulgent":
      const indItems = getRecommendationsForMood("indulgent", [], 5);
      const indList = indItems.map(formatItemCompact).join("\n");
      return `**Time to Indulge** ✨

For a truly luxurious experience:

${indList}

These are our most decadent offerings — rich, complex, and unforgettable.

Consider starting with **Oscietra Caviar** ($199) paired with Louis XVIII Cognac for the ultimate indulgence.`;

    case "mood_spicy":
      const spicyItems = getRecommendationsForMood("spicy", [], 6);
      const spicyList = spicyItems.map(formatItemCompact).join("\n");
      return `**Bring the Heat!** 🌶️

For those who love bold spice:

${spicyList}

All these dishes have medium to high heat levels. We use fresh chilies, Madras curry, and traditional spice blends.

*Want even more heat? Ask your server for extra chili oil or our house pickles.*`;

    case "mood_mild":
      const mildItems = getRecommendationsForMood("mild", [], 6);
      const mildList = mildItems.map(formatItemCompact).join("\n");
      return `**Gentle Flavors**

For those who prefer milder dishes:

${mildList}

These dishes showcase our technique without overwhelming heat. Rich, flavorful, but gentle on the palate.

The **Butter Chicken** ($34) is a crowd favorite — creamy and comforting.`;

    case "mood_seafood":
      const seaItems = getRecommendationsForMood("seafood", [], 6);
      const seaList = seaItems.map(formatItemCompact).join("\n");
      return `**From the Sea** 🦪

Our finest seafood selections:

${seaList}

We source premium seafood including Chilean Sea Bass, Australian oysters, and fresh lobster.

The ◉ **Lobster Green Curry** and ◉ **Kimchi Butter Oysters** are Chef Anand's personal favorites!`;

    case "mood_meat":
      const meatItems = getRecommendationsForMood("meat", [], 6);
      const meatList = meatItems.map(formatItemCompact).join("\n");
      return `**For Meat Lovers** 🔥

Our finest proteins:

${meatList}

From New Zealand lamb to Margaret River Wagyu to slow-braised goat — all prepared with our signature live-fire techniques.

The ◉ **Lasooni Lamb Chop** ($54) is a must-try!`;

    case "recommendation":
      return `**Let Me Help You Choose!**

Tell me more about what you're in the mood for:

🔥 **"Something adventurous"** — Bold, unique flavors
🍛 **"Comfort food"** — Rich, warming dishes
🥗 **"Something light"** — Fresh and refreshing
✨ **"Treat myself"** — Luxurious indulgence
🌶️ **"I like spicy"** — Bring the heat
🦪 **"Seafood lover"** — Ocean's finest
🥩 **"Meat dishes"** — Premium proteins

Or tell me about any **allergies** (e.g., "I'm allergic to nuts") and I'll find safe options!`;

    case "chef_favorites":
      const favorites = getChefFavorites();
      const favList = favorites.map(formatMenuItem).join("\n\n");
      return `**◉ Chef Anand's Favorites**

These dishes represent the soul of Tamba:

${favList}

Each marked with ◉ — a personal recommendation from our Michelin-recognized chef.`;

    case "vegetarian":
      const vegItems = getItemsByDietary("V");
      const vegList = vegItems.slice(0, 10).map(formatItemCompact).join("\n");
      return `**Vegetarian Options** 🌱

${vegList}

We have **${vegItems.length} vegetarian dishes** — from street food classics to refined curries.

Try the ◉ **Pahadi Paneer** ($28) or ◉ **Samosa Chaat** ($20) — both Chef's favorites!`;

    case "vegan":
      const veganItems = getItemsByDietary("VG");
      const veganList = veganItems.map(formatItemCompact).join("\n");
      return `**Vegan Options** 🌿

${veganList}

Many dishes can be modified to be vegan. Our kitchen is happy to accommodate!`;

    case "gluten_free":
      const gfItems = getItemsByDietary("GF");
      const gfList = gfItems.slice(0, 12).map(formatItemCompact).join("\n");
      return `**Gluten-Free Options**

We have **${gfItems.length}** naturally gluten-free dishes:

${gfList}

*...and many more!*

Items can be prepared gluten-free upon request. Please inform your server.`;

    case "dietary":
      return `**Dietary Accommodations**

Our menu uses these icons:
• **(V)** — Vegetarian
• **(VG)** — Vegan
• **(GF)** — Gluten Free
• **◉** — Chef's Favorite

**Common Allergens We Track:**
Dairy, Nuts, Gluten, Shellfish, Eggs, Soy, Fish

Many items can be prepared **gluten- or nut-free** upon request.

**Tell me your specific needs** (e.g., "I'm allergic to shellfish and dairy") and I'll find perfect options for you!`;

    case "hours":
      return `**Hours of Operation**

We're open **7 days a week**:
📍 **Monday - Sunday**: 5:00 PM - 10:00 PM

🔥 [Book on SevenRooms](https://sevenrooms.com/explore/tambalasvegas)
📞 **(702) 798-7889**`;

    case "location":
      return `**Find Us**

📍 **6671 Las Vegas Blvd South, Suite A-117**
Las Vegas, NV 89119 (Town Square)

🗺️ [Get Directions](https://maps.google.com/?q=6671+Las+Vegas+Blvd+South+Las+Vegas+NV)
📞 **(702) 798-7889**`;

    case "reservations":
      return `**Reserve Your Experience**

🔥 [Book Online](https://sevenrooms.com/explore/tambalasvegas)
📞 **(702) 798-7889**

For **private events** (Jadu Room), minimum $3,000.
📧 info@tambalasvegas.com`;

    case "chef":
      return `**Chef Anand Singh**
*Executive Chef, Michelin-Recognized*

Chef Anand leads Tamba's kitchen with dishes marked ◉ on our menu — masterpieces of live-fire cooking.

Signatures: **Lasooni Lamb Chop**, **Lobster Green Curry**, **Angara Wagyu**

*"Every Bite Is a Chronicle."*`;

    case "bar_jadu":
      return `**Bar Jadu** 🍸

A hidden cocktail sanctuary led by **Giuseppe Gonzalez**.

Cocktails crafted to *delight, surprise, and transport*.

"Jadu" means *magic* in Hindi.

📞 **(702) 798-7889** for reservations`;

    case "private_dining":
      return `**Jadu Private Dining Room** ✨

• Custom menus with Chef Anand
• Complete privacy
• Dedicated team

**Perfect for:** VIP gatherings, corporate dinners, celebrations

**Minimum:** $3,000

📧 info@tambalasvegas.com
📞 **(702) 798-7889**`;

    case "prices":
      return `**Price Range**

• **Starters:** $20 - $36
• **Breads:** $5 - $21
• **Mains:** $28 - $52
• **Premium:** $54 - $120
• **Caviar:** $100 - $199

*Menu is family-style — 2-3 dishes per person recommended.*`;

    case "expensive":
      return `**Luxurious Offerings**

◉ **Angara Wagyu** — $120
◉ **Oscietra Caviar 30g** — $199
◉ **Lasooni Lamb Chop** — $54
• **Black Pepper Beef** — $52

The pinnacle of our craft.`;

    case "caviar":
      return `**The Only Caviar**

• **30g** — $199
• **½ oz** — $100
• **1 oz** — $180

Paired with **Louis XVIII Cognac**.

Also try **Caviar Puri** ($64) and **Wagyu Nigiri** ($32) with caviar.`;

    case "wagyu":
      return `**Wagyu at Tamba**

**Angara Wagyu** — $120
*10 oz Margaret River NY Strip from Josper*

**Wagyu Nigiri** — $32
*Charred with Caviar & Truffle*`;

    case "josper":
      return `**The Josper** 🪵

Our crown jewel — enclosed charcoal oven.

• **Bhuna Gobi** — $28
• ◉ **Tawa Charred Octopus** — $39
• **Banana Leaf Seabass** — $42
• **Angara Wagyu** — $120`;

    case "tandoor":
      return `**The Tandoor** 🔥

Traditional clay oven (900°F+)

**Proteins:** Paneer, Fish Tikka, Chicken, Lamb
**Breads:** Naan ($5-$8), Roti ($6)`;

    case "cooking_methods":
      return `**Live-Fire Cooking** 🔥

1. **Tandoor** — Clay oven (900°F+)
2. **Josper** — Enclosed charcoal oven
3. **Charcoal Mangal** — Direct flame grill
4. **Wok** — High-heat stir fry
5. **Tawa** — Iron griddle`;

    case "phone":
      return `📞 **(702) 798-7889**
Mon-Sun, 5-10 PM`;

    case "contact":
      return `**Contact**

📞 (702) 798-7889
📧 info@tambalasvegas.com
📸 @tambalasvegas
🔥 [SevenRooms](https://sevenrooms.com/explore/tambalasvegas)`;

    case "parking":
      return `**Parking**

Town Square offers **free parking** throughout the center.
📍 6671 Las Vegas Blvd South`;

    case "dress_code":
      return `**Dress Code**

Smart casual to elegant. Elevated, refined, comfortable.`;

    case "thanks":
      return `You're welcome! 🔥

Anything else about Tamba?`;

    case "goodbye":
      return `Thank you! We look forward to welcoming you. 🔥

📞 (702) 798-7889
🔥 [Book Your Table](https://sevenrooms.com/explore/tambalasvegas)`;

    case "help":
      return `**I Can Help With:**

🔥 **Menu** — Dishes, prices, categories
🎯 **Recommendations** — Based on mood & taste
⚠️ **Allergies** — Safe options for you
📅 **Reservations** — Booking info
🍸 **Bar Jadu** — Hidden cocktail bar
✨ **Private Events** — Jadu Room

Try: *"I'm allergic to nuts and want something spicy"*`;

    case "menu_general":
      return `**Tamba Menu**

🦪 **Raw & Refined** — Crudo, oysters, caviar
🍣 **Tambazushi** — Fire-kissed nigiri
🥗 **Soup & Salad** — Fresh starters
🫘 **Street Classics** — Chaats & classics
🔥 **Charcoal & Live Fire** — Tandoor dishes
🪵 **Josper** — Our crown jewel
🥢 **Wok** — Stir fry
🍛 **Curries** — Soul of the table
🍚 **Biryani** — Fragrant rice
🫓 **Breads** — Tandoori naan

What interests you? Or tell me your mood!`;

    case "menu_category":
      const lower = message.toLowerCase();
      let cat = MENU.find(
        (c) =>
          c.name.toLowerCase().includes(lower.split(" ")[0]) ||
          lower.includes(c.name.toLowerCase().split(" ")[0]),
      );
      if (!cat) {
        if (/raw|crudo|oyster|sashimi/i.test(lower)) cat = MENU[0];
        else if (/sushi|nigiri|tambazushi/i.test(lower)) cat = MENU[1];
        else if (/soup|salad/i.test(lower)) cat = MENU[2];
        else if (/street|chaat|samosa/i.test(lower)) cat = MENU[3];
        else if (/charcoal|fire|tandoor/i.test(lower)) cat = MENU[4];
        else if (/josper/i.test(lower)) cat = MENU[5];
        else if (/wok|stir/i.test(lower)) cat = MENU[6];
        else if (/curry|curries/i.test(lower)) cat = MENU[7];
        else if (/biryani|rice/i.test(lower)) cat = MENU[8];
        else if (/bread|naan|roti/i.test(lower)) cat = MENU[9];
      }
      if (cat) {
        const items = cat.items.map(formatMenuItem).join("\n\n");
        return `**${cat.emoji} ${cat.name}**\n\n*${cat.tagline}*\n\n${items}`;
      }
      return generateResponse(message, "menu_general");

    default:
      return `I'd love to help you explore Tamba!

Try asking:
• "What do you recommend for someone who likes spicy food?"
• "I'm allergic to shellfish — what can I eat?"
• "Show me the curries"
• "I'm in the mood for something light"

📞 **(702) 798-7889**`;
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
  { label: "Get Recommendations", message: "Help me choose what to order" },
  {
    label: "Chef's Favorites",
    message: "What are Chef Anand's favorite dishes?",
  },
  { label: "I Have Allergies", message: "I have food allergies" },
];

const SECONDARY_QUICK_ACTIONS: QuickAction[] = [
  { label: "Something Spicy", message: "I'm in the mood for something spicy" },
  { label: "Seafood Options", message: "What seafood dishes do you have?" },
  { label: "Vegetarian", message: "What vegetarian options do you have?" },
  { label: "Make Reservation", message: "How do I make a reservation?" },
];

// ============================================
// CHAT MESSAGE TYPE
// ============================================

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current)
      setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: generateResponse("hello", "greeting"),
          timestamp: new Date(),
        },
      ]);
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

    try {
      // Build conversation history for AI
      const conversationHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch {
      // Fallback to local response if API fails
      setIsTyping(false);
      const intent = detectIntent(userMessage.content);
      const response = generateResponse(userMessage.content, intent);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
    }
  }, [input, messages]);

  const handleQuickAction = useCallback(
    async (message: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      try {
        // Build conversation history for AI
        const conversationHistory = [...messages, userMessage].map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: conversationHistory }),
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.message,
            timestamp: new Date(),
          },
        ]);
      } catch {
        // Fallback to local response if API fails
        setIsTyping(false);
        const intent = detectIntent(message);
        const response = generateResponse(message, intent);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: response,
            timestamp: new Date(),
          },
        ]);
      }
    },
    [messages],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions =
    messages.length <= 1 ? INITIAL_QUICK_ACTIONS : SECONDARY_QUICK_ACTIONS;

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-tamba-gold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-tamba-cream/80">$1</em>')
      .replace(/◉/g, '<span class="chef-favorite">◉</span>')
      .replace(/🌶️/g, '<span class="text-red-400">🌶️</span>')
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-tamba-ember hover:text-tamba-gold underline transition-colors">$1</a>',
      )
      .replace(/\n/g, "<br />");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center sofia-glass fire-glow ember-pulse float-hover transition-all duration-300 group"
          style={{ borderRadius: "4px" }}
          aria-label="Open chat with Agni"
        >
          <div
            className="absolute inset-0 fire-ring"
            style={{ borderRadius: "4px" }}
          />
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
          <div className="absolute top-2 right-2 online-indicator" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-full max-w-[420px] h-[650px] flex flex-col sofia-glass fire-glow chat-open sm:bottom-6 sm:right-6 chat-mobile-full sm:chat-mobile-reset"
          style={{ borderRadius: "8px" }}
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Agni"
        >
          <div
            className="relative flex items-center justify-between px-5 py-4 border-b border-tamba-ember/20 tandoor-gradient safe-top"
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            <div
              className="absolute inset-0 header-shimmer pointer-events-none"
              style={{ borderRadius: "8px 8px 0 0" }}
            />
            <div className="relative flex items-center gap-3">
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

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chat-scroll">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} message-enter`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-tamba-ember/20 border border-tamba-ember/30 text-tamba-cream" : "bg-tamba-charcoal/80 border border-tamba-cream/10 text-tamba-cream/90"}`}
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

          <div className="px-4 pb-4 pt-2 safe-bottom">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Try: I'm allergic to nuts and want spicy..."
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
