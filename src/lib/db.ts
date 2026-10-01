import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface ProductSpecItem {
  label: string;
  value: string;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  image: string;
  isActive: boolean;
  moq?: string;
  specs?: ProductSpecItem[];
  badge?: string;
  badgeColor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  passwordHash: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  destination?: string;
  productGrade?: string;
  volume?: string;
  packaging?: string;
  incoterm?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AppSettings {
  companyName: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  websiteTitle: string;
}

export interface DatabaseSchema {
  admin: AdminUser;
  products: Product[];
  messages: Message[];
  settings: AppSettings;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Default initial data
function getDefaultDatabase(): DatabaseSchema {
  const defaultPasswordHash = bcrypt.hashSync("admin123", 10);
  const now = new Date().toISOString();

  return {
    admin: {
      id: "admin-1",
      username: "admin",
      email: "admin@nusantaraember.com",
      name: "Owner PT Nusantara Ember",
      passwordHash: defaultPasswordHash,
      updatedAt: now,
    },
    products: [
      {
        id: "prod-shisha-grade-a",
        name: "Platinum Coconut Cube",
        category: "GRADE A - SHISHA",
        description:
          "Engineered specifically for premium hookah & shisha lounges. Zero sulfur, odorless, and yields snow-white residue.",
        price: "$1,350 - $1,450 / MT",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAa59vk1qxWreQIBGr8AbG0Jy4vBF_DySc-jHacz4qBKFcdWa3hcNm5lkDbhg7KaRIDYonrPeL8xnOeU7Ms54dAQ9v0QUYx86-6fnmPT5gDevfUx6RTbTQJ3H6wFfjL_wD7WgOUTq9m6YpG2OctH1dcWin1wPGJBSBIzDDNLJ2QANvURy1UzNphJFq9nfBQ4gO8YlLr922ZmAyq5WW9iJiTY0sb-UOQUfdxT43OTGXHhBXGPJqxNhsI",
        isActive: true,
        moq: "1x20ft FCL",
        badge: "GRADE A - SHISHA",
        badgeColor: "primary",
        specs: [
          { label: "Available Cuts", value: "25x25x25mm / 26x26x26mm / 22mm", color: "text-on-surface" },
          { label: "Ash Content", value: "< 2.0% (Clean White)", color: "text-secondary" },
          { label: "Calorific Energy", value: "7,600 kcal/kg", color: "text-primary" },
          { label: "Burning Duration", value: "150+ minutes", color: "text-on-surface" },
        ],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "prod-bbq-grade-b",
        name: "Hexagonal & Pillow Briquettes",
        category: "GRADE B - BBQ & GRILL",
        description:
          "Heavyweight high-density extrusion with inner airflow channel. Steady high-temperature sustained radiation for commercial steakhouses.",
        price: "$950 - $1,050 / MT",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
        isActive: true,
        moq: "1x20ft FCL",
        badge: "GRADE B - BBQ & GRILL",
        badgeColor: "tertiary",
        specs: [
          { label: "Available Cuts", value: "Hex 50x100mm, 50x150mm / Pillow", color: "text-on-surface" },
          { label: "Ash Content", value: "3.5% – 5.5% (Light Grey)", color: "text-on-surface" },
          { label: "Calorific Energy", value: "7,200 kcal/kg", color: "text-primary" },
          { label: "Burning Duration", value: "4.0 – 5.5 hours steady", color: "text-on-surface" },
        ],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "prod-industrial-grade-c",
        name: "Granular Carbon Precursor",
        category: "GRADE C - INDUSTRIAL",
        description:
          "Natural coconut shell crushed charcoal for water filtration, gold recovery metallurgy, and air purification production.",
        price: "$780 - $850 / MT",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        isActive: true,
        moq: "1x40ft HC",
        badge: "GRADE C - INDUSTRIAL",
        badgeColor: "secondary",
        specs: [
          { label: "Granulation Sizes", value: "Mesh 3x6, 4x8, 8x30, Raw Crushed", color: "text-on-surface" },
          { label: "Fixed Carbon", value: "> 78%", color: "text-on-surface" },
          { label: "Moisture Content", value: "< 8.0%", color: "text-on-surface" },
          { label: "Packing Method", value: "500kg Jumbo Bag / 25kg PP", color: "text-on-surface" },
        ],
        createdAt: now,
        updatedAt: now,
      },
    ],
    messages: [
      {
        id: "msg-101",
        name: "Tariq Al-Mansoor",
        email: "tariq@almansoor-trading.ae",
        whatsapp: "+971501234567",
        message:
          "Looking for monthly contract of 2x40ft HC containers of Grade A Shisha Cubes 25x25mm for Dubai distributor warehouse. Please send FOB Semarang quotation & Sucofindo COA.",
        destination: "Jebel Ali, UAE",
        productGrade: "Grade A - Shisha Cube 25mm",
        volume: "2x 40ft HC Monthly",
        packaging: "1kg Inner OEM Box + 10kg Master Carton",
        incoterm: "FOB Semarang",
        isRead: false,
        createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      },
      {
        id: "msg-102",
        name: "Dmitry Volkov",
        email: "dmitry@volkov-lounge.ru",
        whatsapp: "+79031234567",
        message:
          "Need 1x20ft FCL test order of Platinum Cube 26x26mm. Target ash under 2.0% white ash. Requesting sample kit 2kg to Moscow before signing PO.",
        destination: "Saint Petersburg, Russia",
        productGrade: "Grade A - Shisha Cube 26mm",
        volume: "1x 20ft FCL",
        packaging: "Custom Brand OEM 1kg",
        incoterm: "CIF Saint Petersburg",
        isRead: true,
        createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      },
      {
        id: "msg-103",
        name: "Budi Santoso",
        email: "budi@restogriffindonesia.com",
        whatsapp: "+6281298765432",
        message:
          "Halo PT Nusantara Ember, kami butuh supply rutin briket Grade B bentuk hexagonal untuk jaringan restoran BBQ & grill di Jabodetabek 5 ton per bulan.",
        destination: "Jakarta & Surabaya",
        productGrade: "Grade B - BBQ Hexagonal",
        volume: "5 Ton / Bulan",
        packaging: "Karung 20kg",
        incoterm: "Lokal / Gudang",
        isRead: true,
        createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      },
    ],
    settings: {
      companyName: "PT Nusantara Ember Indonesia",
      contactEmail: "sales@nusantaraember.com",
      whatsappNumber: "+628112427262",
      address:
        "Cyber 2 Tower Level 28, HR Rasuna Said, Jakarta Selatan / Kiln Kendal Industrial Park",
      websiteTitle: "PT Nusantara Ember Indonesia | Premium Coconut Shell Charcoal Exporter",
    },
  };
}

// Ensure database file exists
export function getDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initial = getDefaultDatabase();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }

    const content = fs.readFileSync(DB_FILE, "utf-8");
    const parsed: DatabaseSchema = JSON.parse(content);
    return parsed;
  } catch (error) {
    console.error("Error reading db.json, returning default:", error);
    return getDefaultDatabase();
  }
}

// Atomic write to avoid corruptions
export function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempFile, DB_FILE);
}

// Helper methods for Product Management
export function getProducts(onlyActive = false): Product[] {
  const db = getDb();
  if (onlyActive) {
    return db.products.filter((p) => p.isActive);
  }
  return db.products;
}

export function getProductById(id: string): Product | undefined {
  const db = getDb();
  return db.products.find((p) => p.id === id);
}

export function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
): Product {
  const db = getDb();
  const now = new Date().toISOString();
  const newProduct: Product = {
    ...data,
    id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };

  db.products.unshift(newProduct);
  saveDb(db);
  return newProduct;
}

export function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
): Product | null {
  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: Product = {
    ...db.products[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  db.products[index] = updated;
  saveDb(db);
  return updated;
}

export function deleteProduct(id: string): boolean {
  const db = getDb();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

export function toggleProductStatus(id: string): Product | null {
  const db = getDb();
  const product = db.products.find((p) => p.id === id);
  if (!product) return null;

  product.isActive = !product.isActive;
  product.updatedAt = new Date().toISOString();
  saveDb(db);
  return product;
}

// Helper methods for Message Management
export function getMessages(): Message[] {
  const db = getDb();
  return db.messages;
}

export function createMessage(
  data: Omit<Message, "id" | "createdAt" | "isRead">
): Message {
  const db = getDb();
  const newMessage: Message = {
    ...data,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  db.messages.unshift(newMessage);
  saveDb(db);
  return newMessage;
}

export function deleteMessage(id: string): boolean {
  const db = getDb();
  const initialLength = db.messages.length;
  db.messages = db.messages.filter((m) => m.id !== id);
  if (db.messages.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

export function markMessageRead(id: string, isRead = true): Message | null {
  const db = getDb();
  const msg = db.messages.find((m) => m.id === id);
  if (!msg) return null;
  msg.isRead = isRead;
  saveDb(db);
  return msg;
}

// Helper methods for Admin & Auth
export function getAdminUser(): AdminUser {
  const db = getDb();
  return db.admin;
}

export function updateAdminProfile(data: {
  username?: string;
  email?: string;
  name?: string;
  newPassword?: string;
}): AdminUser {
  const db = getDb();
  if (data.username) db.admin.username = data.username.trim();
  if (data.email) db.admin.email = data.email.trim();
  if (data.name) db.admin.name = data.name.trim();
  if (data.newPassword && data.newPassword.trim()) {
    db.admin.passwordHash = bcrypt.hashSync(data.newPassword.trim(), 10);
  }
  db.admin.updatedAt = new Date().toISOString();
  saveDb(db);
  return db.admin;
}

export function verifyAdminCredentials(
  identifier: string,
  plainPassword: string
): AdminUser | null {
  const db = getDb();
  const admin = db.admin;
  const isMatch =
    admin.username.toLowerCase() === identifier.trim().toLowerCase() ||
    admin.email.toLowerCase() === identifier.trim().toLowerCase();

  if (!isMatch) return null;

  const validPass = bcrypt.compareSync(plainPassword, admin.passwordHash);
  if (!validPass) return null;

  return admin;
}

// Reset data to defaults
export function resetDatabaseToDefault(): DatabaseSchema {
  const defaultData = getDefaultDatabase();
  saveDb(defaultData);
  return defaultData;
}
