import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Category from "./src/models/Category.js";
import Product from "./src/models/Product.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_ecommerce";

const categoriesData = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Electronic gadgets and devices",
  },
  {
    name: "Mobiles & Accessories",
    slug: "mobiles-accessories",
    description: "Smartphones and mobile accessories",
  },
  {
    name: "Laptops",
    slug: "laptops",
    description: "Laptops and computing devices",
  },
  {
    name: "Clothes",
    slug: "clothes",
    description: "Fashion and clothing",
  },
  {
    name: "Footwear",
    slug: "footwear",
    description: "Shoes and footwear",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Home and kitchen essentials",
  },
  {
    name: "Groceries",
    slug: "groceries",
    description: "Day to day grocery products",
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    description: "Beauty and personal care products",
  },
  {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    description: "Sports and fitness equipment",
  },
  {
    name: "Books",
    slug: "books",
    description: "Books and reading materials",
  },
];

const productsData = {
  "Mobiles & Accessories": [
    {
      name: "iPhone 15 Pro",
      slug: "iphone-15-pro",
      brand: "Apple",
      price: 99999,
      stock: 50,
      description:
        "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
      images: [
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500",
      ],
      specs: { Storage: "256GB", RAM: "8GB", Display: "6.1 inch" },
    },
    {
      name: "Redmi Note 13 Pro",
      slug: "redmi-note-13-pro",
      brand: "Xiaomi",
      price: 24999,
      stock: 100,
      description:
        "Powerful mid-range smartphone with 120Hz AMOLED display and 200MP camera.",
      images: ["http://localhost:5000/images/RedmiNote13Pro.jpeg"],
      specs: { Storage: "128GB", RAM: "8GB", Display: "6.67 inch" },
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-galaxy-s24-ultra",
      brand: "Samsung",
      price: 124999,
      stock: 30,
      description:
        "Flagship Samsung phone with S Pen, 200MP camera, and Snapdragon 8 Gen 3.",
      images: ["http://localhost:5000/images/SamsungGalaxyS24Ultra.jpeg"],
      specs: { Storage: "512GB", RAM: "12GB", Display: "6.8 inch" },
    },
    {
      name: "OnePlus 12",
      slug: "oneplus-12",
      brand: "OnePlus",
      price: 64999,
      stock: 75,
      description:
        "Premium Android phone with Snapdragon 8 Gen 3 and fast charging.",
      images: ["http://localhost:5000/images/OnePlus12.jpeg"],
      specs: { Storage: "256GB", RAM: "12GB", Display: "6.82 inch" },
    },
    {
      name: "Realme GT 5 Pro",
      slug: "realme-gt-5-pro",
      brand: "Realme",
      price: 44999,
      stock: 60,
      description:
        "Gaming-focused smartphone with flagship performance and fast charging.",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
      ],
      specs: { Storage: "256GB", RAM: "16GB", Display: "6.78 inch" },
    },
    {
      name: "Vivo X100 Pro",
      slug: "vivo-x100-pro",
      brand: "Vivo",
      price: 89999,
      stock: 40,
      description:
        "Camera-focused flagship with Zeiss optics and MediaTek Dimensity 9300.",
      images: ["http://localhost:5000/images/VivoX100Pro.png"],
      specs: { Storage: "512GB", RAM: "12GB", Display: "6.78 inch" },
    },
  ],
  Clothes: [
    {
      name: "Men's Cotton Hoodie",
      slug: "mens-cotton-hoodie",
      brand: "Fashion Brand",
      price: 1999,
      stock: 150,
      description:
        "Comfortable cotton hoodie perfect for casual wear. Available in multiple colors.",
      images: ["http://localhost:5000/images/Men'sCottonHoodie.jpeg"],
      specs: { Material: "100% Cotton", Size: "M, L, XL", Color: "Multiple" },
    },
    {
      name: "Women's Casual Shirt",
      slug: "womens-casual-shirt",
      brand: "Style Co",
      price: 1499,
      stock: 200,
      description:
        "Elegant casual shirt for women, perfect for office and everyday wear.",
      images: [
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&auto=format&fit=crop",
      ],
      specs: { Material: "Cotton Blend", Size: "S, M, L", Color: "Multiple" },
    },
    {
      name: "Kids' Denim Jeans",
      slug: "kids-denim-jeans",
      brand: "Kids Fashion",
      price: 899,
      stock: 180,
      description:
        "Durable and comfortable denim jeans for kids. Stretchable fabric.",
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
      ],
      specs: { Material: "Denim", Size: "4-14 Years", Color: "Blue, Black" },
    },
    {
      name: "Men's Formal Shirt",
      slug: "mens-formal-shirt",
      brand: "Formal Wear",
      price: 1799,
      stock: 120,
      description:
        "Classic formal shirt for men, perfect for business and formal occasions.",
      images: [
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop",
      ],
      specs: {
        Material: "Cotton",
        Size: "M, L, XL, XXL",
        Color: "White, Blue",
      },
    },
    {
      name: "Women's Summer Dress",
      slug: "womens-summer-dress",
      brand: "Summer Style",
      price: 2499,
      stock: 100,
      description:
        "Light and breezy summer dress, perfect for hot weather and casual outings.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop",
      ],
      specs: { Material: "Polyester", Size: "S, M, L", Color: "Multiple" },
    },
    {
      name: "Men's Cargo Pants",
      slug: "mens-cargo-pants",
      brand: "Outdoor Gear",
      price: 2199,
      stock: 90,
      description:
        "Durable cargo pants with multiple pockets, ideal for outdoor activities.",
      images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop",
      ],
      specs: {
        Material: "Cotton Canvas",
        Size: "M, L, XL",
        Color: "Khaki, Black",
      },
    },
  ],
  Electronics: [
    {
      name: "Wireless Bluetooth Headphones",
      slug: "wireless-bluetooth-headphones",
      brand: "AudioTech",
      price: 2999,
      stock: 200,
      description:
        "Premium wireless headphones with noise cancellation and 30-hour battery.",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
      ],
      specs: {
        Battery: "30 hours",
        Connectivity: "Bluetooth 5.0",
        NoiseCancellation: "Yes",
      },
    },
    {
      name: "Smart Watch Pro",
      slug: "smart-watch-pro",
      brand: "TechWear",
      price: 8999,
      stock: 150,
      description:
        "Feature-rich smartwatch with health tracking, GPS, and 7-day battery life.",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
      ],
      specs: { Display: "1.4 inch AMOLED", Battery: "7 days", GPS: "Yes" },
    },
    {
      name: "Portable Power Bank 20000mAh",
      slug: "power-bank-20000mah",
      brand: "PowerUp",
      price: 1499,
      stock: 300,
      description:
        "High capacity power bank with fast charging support for all devices.",
      images: ["http://localhost:5000/images/PortablePowerBank20000mAh.webp"],
      specs: { Capacity: "20000mAh", Output: "18W", Ports: "2 USB-A, 1 USB-C" },
    },
    {
      name: "4K Ultra HD TV 55 inch",
      slug: "4k-tv-55inch",
      brand: "ScreenMax",
      price: 49999,
      stock: 50,
      description:
        "55-inch 4K UHD Smart TV with HDR10+ and built-in streaming apps.",
      images: [
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop",
      ],
      specs: { Size: "55 inch", Resolution: "4K UHD", SmartTV: "Yes" },
    },
    {
      name: "Gaming Mouse RGB",
      slug: "gaming-mouse-rgb",
      brand: "GameGear",
      price: 2499,
      stock: 180,
      description:
        "Precision gaming mouse with RGB lighting and customizable buttons.",
      images: [
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop",
      ],
      specs: { DPI: "16000", Buttons: "8", RGB: "Yes" },
    },
    {
      name: "Mechanical Keyboard",
      slug: "mechanical-keyboard",
      brand: "KeyTech",
      price: 4499,
      stock: 120,
      description:
        "RGB mechanical keyboard with Cherry MX switches and aluminum frame.",
      images: [
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&auto=format&fit=crop",
      ],
      specs: { Switches: "Cherry MX", RGB: "Yes", Layout: "Full Size" },
    },
  ],
  Laptops: [
    {
      name: "MacBook Pro 14 inch",
      slug: "macbook-pro-14",
      brand: "Apple",
      price: 199999,
      stock: 25,
      description:
        "Powerful MacBook Pro with M3 chip, 14-inch Liquid Retina display.",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
      ],
      specs: { Processor: "M3", RAM: "16GB", Storage: "512GB SSD" },
    },
    {
      name: "Dell XPS 15",
      slug: "dell-xps-15",
      brand: "Dell",
      price: 149999,
      stock: 40,
      description:
        "Premium Windows laptop with Intel i7, 15.6-inch 4K display.",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
      ],
      specs: { Processor: "Intel i7-13700H", RAM: "16GB", Storage: "1TB SSD" },
    },
    {
      name: "HP Pavilion 15",
      slug: "hp-pavilion-15",
      brand: "HP",
      price: 54999,
      stock: 80,
      description:
        "Affordable laptop for everyday use with AMD Ryzen 5 processor.",
      images: [
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop",
      ],
      specs: { Processor: "AMD Ryzen 5", RAM: "8GB", Storage: "512GB SSD" },
    },
    {
      name: "Lenovo ThinkPad X1",
      slug: "lenovo-thinkpad-x1",
      brand: "Lenovo",
      price: 129999,
      stock: 35,
      description:
        "Business laptop with Intel i7, 14-inch display, and premium build quality.",
      images: ["http://localhost:5000/images/LenovoThinkPadX1.jpeg"],
      specs: { Processor: "Intel i7-1355U", RAM: "16GB", Storage: "512GB SSD" },
    },
    {
      name: "ASUS ROG Strix G15",
      slug: "asus-rog-strix-g15",
      brand: "ASUS",
      price: 99999,
      stock: 30,
      description:
        "Gaming laptop with RTX 4060, AMD Ryzen 7, and 144Hz display.",
      images: ["http://localhost:5000/images/ASUSROGStrixG15.jpeg"],
      specs: { Processor: "AMD Ryzen 7", GPU: "RTX 4060", RAM: "16GB" },
    },
    {
      name: "Acer Aspire 5",
      slug: "acer-aspire-5",
      brand: "Acer",
      price: 44999,
      stock: 100,
      description:
        "Budget-friendly laptop with Intel i5 and 15.6-inch display.",
      images: ["http://localhost:5000/images/AcerAspire5.jpeg"],
      specs: { Processor: "Intel i5-1235U", RAM: "8GB", Storage: "256GB SSD" },
    },
  ],
  Footwear: [
    {
      name: "Men's Running Shoes",
      slug: "mens-running-shoes",
      brand: "RunFast",
      price: 3999,
      stock: 150,
      description:
        "Comfortable running shoes with cushioned sole and breathable mesh upper.",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
      ],
      specs: { Size: "7-12", Material: "Mesh & Rubber", Type: "Running" },
    },
    {
      name: "Women's Casual Sneakers",
      slug: "womens-casual-sneakers",
      brand: "ComfortWalk",
      price: 2999,
      stock: 200,
      description:
        "Stylish casual sneakers perfect for everyday wear and light activities.",
      images: [
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&auto=format&fit=crop",
      ],
      specs: { Size: "5-10", Material: "Canvas", Type: "Casual" },
    },
    {
      name: "Men's Formal Leather Shoes",
      slug: "mens-formal-leather-shoes",
      brand: "FormalStep",
      price: 4999,
      stock: 80,
      description:
        "Premium leather formal shoes for business and formal occasions.",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop",
      ],
      specs: { Size: "7-12", Material: "Genuine Leather", Type: "Formal" },
    },
    {
      name: "Women's High Heels",
      slug: "womens-high-heels",
      brand: "ElegantStep",
      price: 3499,
      stock: 120,
      description: "Elegant high heels perfect for parties and formal events.",
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop",
      ],
      specs: { Size: "5-9", Material: "Synthetic Leather", Heel: "4 inch" },
    },
    {
      name: "Kids' Sports Shoes",
      slug: "kids-sports-shoes",
      brand: "KidsActive",
      price: 1999,
      stock: 180,
      description: "Durable sports shoes for kids with good grip and support.",
      images: ["http://localhost:5000/images/Kids'SportsShoes.jpeg"],
      specs: { Size: "UK 1-6", Material: "Synthetic", Type: "Sports" },
    },
    {
      name: "Men's Sandals",
      slug: "mens-sandals",
      brand: "SummerWalk",
      price: 1499,
      stock: 160,
      description:
        "Comfortable sandals for summer, perfect for casual outings.",
      images: [
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop",
      ],
      specs: { Size: "7-12", Material: "Rubber & EVA", Type: "Sandals" },
    },
  ],
  "Home & Kitchen": [
    {
      name: "Non-Stick Cookware Set",
      slug: "non-stick-cookware-set",
      brand: "KitchenPro",
      price: 4999,
      stock: 100,
      description:
        "10-piece non-stick cookware set with glass lids and ergonomic handles.",
      images: ["http://localhost:5000/images/Non-StickCookwareSet.jpeg"],
      specs: {
        Pieces: "10",
        Material: "Non-Stick Coating",
        Compatible: "All Stoves",
      },
    },
    {
      name: "Coffee Maker",
      slug: "coffee-maker",
      brand: "BrewMaster",
      price: 3499,
      stock: 80,
      description:
        "Automatic coffee maker with programmable timer and thermal carafe.",
      images: ["http://localhost:5000/images/CoffeeMaker.jpeg"],
      specs: { Capacity: "12 cups", Type: "Drip Coffee", Timer: "Yes" },
    },
    {
      name: "Air Fryer 5.5L",
      slug: "air-fryer-55l",
      brand: "FryHealthy",
      price: 5999,
      stock: 60,
      description:
        "Large capacity air fryer with digital display and multiple cooking modes.",
      images: ["http://localhost:5000/images/AirFryer5.5L.jpeg"],
      specs: { Capacity: "5.5L", Power: "1500W", Presets: "8" },
    },
    {
      name: "Vacuum Cleaner",
      slug: "vacuum-cleaner",
      brand: "CleanHome",
      price: 8999,
      stock: 70,
      description:
        "Powerful cordless vacuum cleaner with HEPA filter and long battery life.",
      images: ["http://localhost:5000/images/VacuumCleaner.jpeg"],
      specs: { Type: "Cordless", Battery: "60 min", Filter: "HEPA" },
    },
    {
      name: "Bedding Set",
      slug: "bedding-set",
      brand: "ComfortSleep",
      price: 2999,
      stock: 150,
      description:
        "Premium cotton bedding set including sheets, pillowcases, and duvet cover.",
      images: [
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&auto=format&fit=crop",
      ],
      specs: { Material: "100% Cotton", Size: "King", Pieces: "4" },
    },
    {
      name: "Dining Table Set",
      slug: "dining-table-set",
      brand: "HomeStyle",
      price: 24999,
      stock: 20,
      description: "6-seater dining table with chairs, made from solid wood.",
      images: ["http://localhost:5000/images/DiningTableSet.jpeg"],
      specs: { Seating: "6", Material: "Solid Wood", Style: "Modern" },
    },
  ],
  Groceries: [
    {
      name: "Organic Rice 5kg",
      slug: "organic-rice-5kg",
      brand: "FarmFresh",
      price: 499,
      stock: 500,
      description:
        "Premium organic basmati rice, 5kg pack. Long grain and aromatic.",
      images: [
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop",
      ],
      specs: { Weight: "5kg", Type: "Basmati", Organic: "Yes" },
    },
    {
      name: "Extra Virgin Olive Oil 1L",
      slug: "olive-oil-1l",
      brand: "PureOil",
      price: 899,
      stock: 300,
      description:
        "Premium extra virgin olive oil, cold-pressed and unrefined.",
      images: [
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop",
      ],
      specs: { Volume: "1L", Type: "Extra Virgin", Origin: "Mediterranean" },
    },
    {
      name: "Honey 500g",
      slug: "honey-500g",
      brand: "NatureSweet",
      price: 399,
      stock: 400,
      description:
        "Pure natural honey, 500g jar. No additives or preservatives.",
      images: [
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop",
      ],
      specs: { Weight: "500g", Type: "Natural", Organic: "Yes" },
    },
    {
      name: "Whole Wheat Flour 2kg",
      slug: "wheat-flour-2kg",
      brand: "GrainGood",
      price: 199,
      stock: 600,
      description:
        "Fresh whole wheat flour, 2kg pack. Perfect for baking and cooking.",
      images: ["http://localhost:5000/images/WholeWheatFlour2kg.jpeg"],
      specs: { Weight: "2kg", Type: "Whole Wheat", GlutenFree: "No" },
    },
    {
      name: "Black Tea 250g",
      slug: "black-tea-250g",
      brand: "TeaTime",
      price: 299,
      stock: 350,
      description: "Premium black tea leaves, 250g pack. Rich and aromatic.",
      images: ["http://localhost:5000/images/BlackTea250g.jpeg"],
      specs: { Weight: "250g", Type: "Black Tea", Caffeine: "Yes" },
    },
    {
      name: "Spice Mix Set",
      slug: "spice-mix-set",
      brand: "SpiceMaster",
      price: 599,
      stock: 250,
      description:
        "Assorted spice mix set with 10 essential spices in individual containers.",
      images: [
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop",
      ],
      specs: { Pieces: "10", Type: "Mixed Spices", Organic: "No" },
    },
  ],
  "Beauty & Personal Care": [
    {
      name: "Face Moisturizer",
      slug: "face-moisturizer",
      brand: "GlowSkin",
      price: 899,
      stock: 200,
      description:
        "Hydrating face moisturizer with SPF 30, suitable for all skin types.",
      images: [
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop",
      ],
      specs: { Volume: "50ml", SPF: "30", SkinType: "All" },
    },
    {
      name: "Shampoo & Conditioner Set",
      slug: "shampoo-conditioner-set",
      brand: "HairCare",
      price: 699,
      stock: 300,
      description:
        "2-in-1 shampoo and conditioner set for smooth and shiny hair.",
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop",
      ],
      specs: { Volume: "400ml each", Type: "2-in-1", HairType: "All" },
    },
    {
      name: "Electric Toothbrush",
      slug: "electric-toothbrush",
      brand: "CleanTeeth",
      price: 2499,
      stock: 150,
      description:
        "Rechargeable electric toothbrush with 3 cleaning modes and timer.",
      images: ["http://localhost:5000/images/electrictoothbrush.webp"],
      specs: { Modes: "3", Battery: "Rechargeable", Timer: "Yes" },
    },
    {
      name: "Face Serum Vitamin C",
      slug: "face-serum-vitamin-c",
      brand: "BrightSkin",
      price: 1299,
      stock: 180,
      description:
        "Brightening face serum with Vitamin C, reduces dark spots and evens skin tone.",
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
      ],
      specs: { Volume: "30ml", Active: "Vitamin C", SkinType: "All" },
    },
    {
      name: "Body Lotion 500ml",
      slug: "body-lotion-500ml",
      brand: "SoftSkin",
      price: 499,
      stock: 250,
      description:
        "Nourishing body lotion with shea butter, keeps skin soft and hydrated.",
      images: [
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&auto=format&fit=crop",
      ],
      specs: { Volume: "500ml", Type: "Body Lotion", Fragrance: "Light" },
    },
    {
      name: "Sunscreen SPF 50",
      slug: "sunscreen-spf50",
      brand: "SunProtect",
      price: 599,
      stock: 220,
      description:
        "Broad spectrum sunscreen SPF 50, water-resistant and non-greasy.",
      images: [
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop",
      ],
      specs: { SPF: "50", Volume: "100ml", WaterResistant: "Yes" },
    },
  ],
  "Sports & Fitness": [
    {
      name: "Yoga Mat",
      slug: "yoga-mat",
      brand: "FitLife",
      price: 1299,
      stock: 200,
      description:
        "Premium non-slip yoga mat with carrying strap, 6mm thickness.",
      images: [
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop",
      ],
      specs: { Thickness: "6mm", Material: "TPE", Size: "183x61cm" },
    },
    {
      name: "Dumbbell Set 10kg",
      slug: "dumbbell-set-10kg",
      brand: "PowerGym",
      price: 2999,
      stock: 100,
      description:
        "Adjustable dumbbell set, 10kg total weight, perfect for home workouts.",
      images: ["http://localhost:5000/images/DumbbellSet10kg.jpg"],
      specs: { Weight: "10kg", Type: "Adjustable", Material: "Cast Iron" },
    },
    {
      name: "Resistance Bands Set",
      slug: "resistance-bands-set",
      brand: "FlexFit",
      price: 899,
      stock: 180,
      description:
        "5-piece resistance bands set with different resistance levels.",
      images: ["http://localhost:5000/images/ResistanceBandsSet.jpeg"],
      specs: { Pieces: "5", Resistance: "5-50lbs", Material: "Latex" },
    },
    {
      name: "Running Treadmill",
      slug: "running-treadmill",
      brand: "RunMax",
      price: 49999,
      stock: 30,
      description:
        "Motorized treadmill with incline, speed control, and heart rate monitor.",
      images: [
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&auto=format&fit=crop",
      ],
      specs: { Motor: "2.5HP", Speed: "1-16 km/h", Incline: "Yes" },
    },
    {
      name: "Basketball",
      slug: "basketball",
      brand: "SportBall",
      price: 1499,
      stock: 150,
      description:
        "Official size basketball with premium grip, suitable for indoor and outdoor.",
      images: [
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop",
      ],
      specs: {
        Size: "Official",
        Material: "Composite Leather",
        Type: "Indoor/Outdoor",
      },
    },
    {
      name: "Fitness Tracker Watch",
      slug: "fitness-tracker-watch",
      brand: "TrackFit",
      price: 3999,
      stock: 120,
      description:
        "Smart fitness tracker with heart rate monitor, step counter, and sleep tracking.",
      images: ["http://localhost:5000/images/FitnessTrackerWatch.jpeg"],
      specs: {
        Battery: "7 days",
        Features: "HR, Steps, Sleep",
        WaterResistant: "Yes",
      },
    },
  ],
  Books: [
    {
      name: "The Great Novel",
      slug: "the-great-novel",
      brand: "BookHouse",
      price: 499,
      stock: 300,
      description: "Bestselling fiction novel, a must-read for book lovers.",
      images: ["http://localhost:5000/images/TheGreatNovel.png"],
      specs: { Pages: "350", Language: "English", Format: "Paperback" },
    },
    {
      name: "Programming Guide",
      slug: "programming-guide",
      brand: "TechBooks",
      price: 899,
      stock: 200,
      description:
        "Comprehensive guide to modern programming languages and best practices.",
      images: [
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop",
      ],
      specs: { Pages: "600", Language: "English", Format: "Hardcover" },
    },
    {
      name: "Cookbook: Healthy Recipes",
      slug: "cookbook-healthy-recipes",
      brand: "FoodBooks",
      price: 599,
      stock: 250,
      description:
        "Collection of 100 healthy and delicious recipes for everyday cooking.",
      images: [
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop",
      ],
      specs: { Pages: "250", Recipes: "100", Format: "Paperback" },
    },
    {
      name: "History of World",
      slug: "history-of-world",
      brand: "EduBooks",
      price: 1299,
      stock: 150,
      description:
        "Detailed account of world history from ancient times to modern era.",
      images: ["http://localhost:5000/images/HistoryOfWorld.jpeg"],
      specs: { Pages: "800", Language: "English", Format: "Hardcover" },
    },
    {
      name: "Children's Storybook",
      slug: "childrens-storybook",
      brand: "KidsBooks",
      price: 299,
      stock: 400,
      description:
        "Colorful storybook with engaging stories and illustrations for children.",
      images: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop",
      ],
      specs: { Pages: "100", Age: "5-10 years", Format: "Hardcover" },
    },
    {
      name: "Self-Help: Success Mindset",
      slug: "self-help-success-mindset",
      brand: "LifeBooks",
      price: 699,
      stock: 180,
      description:
        "Inspirational book on developing a success mindset and achieving goals.",
      images: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop",
      ],
      specs: { Pages: "300", Language: "English", Format: "Paperback" },
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    // By default we preserve existing users to avoid accidental deletion.
    // To force-reset users, run with FORCE_SEED=true (example: FORCE_SEED=true npm run seed)
    const forceSeed = process.env.FORCE_SEED === "true";

    if (forceSeed) {
      await User.deleteMany({});
      console.log("Cleared users");
    } else {
      console.log(
        "Preserving existing users (set FORCE_SEED=true to delete them)"
      );
    }

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared categories & products");

    // Create admin user if it does not exist
    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const adminPasswordHash = await bcrypt.hash("admin123", 10);
      const admin = await User.create({
        name: "Admin User",
        email: adminEmail,
        passwordHash: adminPasswordHash,
        role: "admin",
      });
      console.log("Created admin user:", admin.email);
    } else {
      console.log("Admin user already exists:", existingAdmin.email);
    }

    // Create categories
    const categories = {};
    for (const catData of categoriesData) {
      const category = await Category.create(catData);
      categories[catData.name] = category;
      console.log(`Created category: ${category.name}`);
    }

    // Create products
    let productCount = 0;
    for (const [categoryName, products] of Object.entries(productsData)) {
      const category = categories[categoryName];
      if (!category) {
        console.log(`Category not found: ${categoryName}`);
        continue;
      }

      for (const productData of products) {
        await Product.create({
          ...productData,
          category: category._id,
        });
        productCount++;
      }
      console.log(`Created ${products.length} products for ${categoryName}`);
    }

    console.log(`\n✅ Seeding completed!`);
    console.log(`- Admin user: admin@example.com / admin123`);
    console.log(`- Categories: ${categoriesData.length}`);
    console.log(`- Products: ${productCount}`);
    console.log(`\nYou can now login with the admin credentials.`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();
