# Nusantara Ember - Indonesian Coconut Charcoal Exporter Web App

Website resmi dan export portal untuk **PT Nusantara Ember Indonesia**, produsen dan eksportir briket arang batok kelapa (*100% coconut shell charcoal briquettes*) standar ekspor global ke 42+ pelabuhan dunia.

Dibangun dengan modern tech stack **Next.js (App Router)**, **TypeScript (`.tsx`)**, dan **Tailwind CSS**.

---

## 🚀 Fitur Unggulan

1. **Header & Navigation Bar**:
   - Sertifikasi pabrik langsung (MSDS, SMM, KEMENDAG, SUCOFINDO).
   - Hotline ekspor & indikator mata uang/unit (USD, Metric Ton).
   - Menu responsif (Desktop & Mobile Drawer).
2. **Hero & Tabular Trust Metrics**:
   - 650+ MT Monthly Output, ≤ 2.2% White Ash, > 82% Fixed Carbon, > 7,500 Kcal/kg.
   - Badge inspeksi langsung pabrik Lot #NE-2025-081 (Pelabuhan Tanjung Emas).
3. **Audited Regulatory Credentials Strip**:
   - SUCOFINDO, SGS Laboratory, MSDS & SHT Maritime Cleared, ROA & COA, V-Legal Forestry.
4. **Operational Infrastructure & Factory Capacity**:
   - 3 Pabrik Terintegrasi (Kendal, Jawa Timur, Bitung Sulawesi Utara) & 45 kiln oven tertutup.
   - 8-Stage Precision Production Flow (ISO 9001:2015 protocol).
5. **Products & Specifications Bento + COA Matrix**:
   - Grade A: Platinum Shisha Cubes (25x25x25mm, 26x26x26mm, 22mm).
   - Grade B: Hexagonal BBQ & Pillow Briquettes.
   - Grade C: Granular / Activated Carbon Precursor.
   - Official COA Technical Comparison Matrix (ASTM & ISO standardized).
6. **Why Us (Enterprise Procurement Criteria)**:
   - 100% Organic & Chemical-Free, Ultra-low white ash, sustained burning >150 mins, dsb.
7. **Packaging & OEM Services**:
   - Custom OEM 1kg inner box, 10kg/20kg master carton, ISPM-15 heat-treated pallets.
   - Free 1-2kg sample kit request.
8. **Global Shipping & Trade Corridors**:
   - GCC/Middle East (Jebel Ali, Dammam, Jeddah), Europe & UK (Rotterdam, Hamburg, Piraeus), North America (LA, Long Beach, NY), Asia-Pacific.
   - Complete export dossier document checklist.
9. **Interactive FCL Container & Freight Cost Estimator** (`FclCalculator.tsx`):
   - Pilihan 15+ Pelabuhan Dunia dengan estimasi lead time & ocean freight otomatis.
   - Pilihan Kontainer: 20ft FCL (~19.5 MT) vs 40ft HC (~27.0 MT).
   - Pilihan Incoterm: CIF vs FOB.
   - Pilihan Metode Stowage: Floor Loaded vs ISPM-15 Palletized.
   - Kalkulasi real-time tonase, master box, persentase utilisasi kubikasi kontainer, base price FOB, packaging surcharge, ongkos kirim laut, dan grand total ($ / kg dan $ / MT).
   - **Tombol "Transfer Spec to Official Quote Form"**: Otomatis mentransfer hasil kalkulasi ke formulir RFQ dan melakukan smooth scroll dengan efek highlight glow.
   - Tombol download proforma PDF estimate.
10. **Export RFQ & Sample Request Portal** (`RfqInquiryForm.tsx`):
    - Sinkronisasi real-time dengan kalkulator kontainer.
    - WhatsApp desk & tender email langsung.
    - Form submission state dengan konfirmasi instan.
11. **Footer & Commodity Price Index**:
    - Alamat kantor komersial Cyber 2 Tower Jakarta Selatan & pabrik KIK Jawa Tengah.
    - Newsletter langganan indeks harga komoditas dan ocean freight.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript (`.tsx`)
- **Styling**: Tailwind CSS v4 & Google Material Symbols Outlined
- **Typography**: Plus Jakarta Sans & Inter
- **Icons**: Google Material Symbols

---

## 💻 Menjalankan Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Server Development
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 3. Build Production
```bash
npm run build
npm start
```
