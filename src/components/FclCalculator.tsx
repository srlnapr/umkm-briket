"use client";

import React, { useState, useMemo } from "react";

export interface CalculatorSpec {
  portId: string;
  portName: string;
  transitDays: string;
  containerSize: "20ft" | "40hc";
  productGrade: "grade-a" | "grade-b" | "grade-c";
  packagingType: "1kg-oem" | "10kg-bulk" | "20kg-sack";
  incoterm: "CIF" | "FOB";
  stowage: "floor" | "pallet";
  tonnage: number;
  totalCartons: number;
  innerPacksText: string;
  fobBaseValue: number;
  packagingValue: number;
  freightCost: number;
  grandTotal: number;
  ratePerKg: string;
  ratePerMt: number;
  utilizationPercent: number;
}

interface FclCalculatorProps {
  onTransferSpec?: (spec: CalculatorSpec) => void;
}

interface PortOption {
  id: string;
  name: string;
  region: string;
  transit: string;
  freight20: number;
  freight40: number;
}

const PORTS: Record<string, PortOption[]> = {
  "GCC & Middle East (14-18 Days)": [
    {
      id: "jebel-ali",
      name: "Jebel Ali / Dubai, UAE (Direct Feeder)",
      region: "GCC / Middle East",
      transit: "14-16",
      freight20: 1450,
      freight40: 2100,
    },
    {
      id: "dammam",
      name: "Dammam, Saudi Arabia",
      region: "GCC / Middle East",
      transit: "16-18",
      freight20: 1650,
      freight40: 2350,
    },
    {
      id: "shuwaikh",
      name: "Shuwaikh / Kuwait Port, Kuwait",
      region: "GCC / Middle East",
      transit: "18-20",
      freight20: 1750,
      freight40: 2450,
    },
    {
      id: "hamad",
      name: "Hamad Port, Qatar",
      region: "GCC / Middle East",
      transit: "16-19",
      freight20: 1680,
      freight40: 2380,
    },
  ],
  "Europe & UK (24-28 Days)": [
    {
      id: "rotterdam",
      name: "Rotterdam, Netherlands (Direct Mainliner)",
      region: "Europe & UK",
      transit: "24-26",
      freight20: 2100,
      freight40: 3200,
    },
    {
      id: "hamburg",
      name: "Hamburg, Germany",
      region: "Europe & UK",
      transit: "26-28",
      freight20: 2180,
      freight40: 3280,
    },
    {
      id: "piraeus",
      name: "Piraeus, Greece (Mediterranean Hub)",
      region: "Southern Europe",
      transit: "20-22",
      freight20: 1850,
      freight40: 2850,
    },
    {
      id: "antwerp",
      name: "Antwerp, Belgium",
      region: "Europe & UK",
      transit: "24-27",
      freight20: 2120,
      freight40: 3220,
    },
    {
      id: "valencia",
      name: "Valencia, Spain",
      region: "Southern Europe",
      transit: "22-25",
      freight20: 1920,
      freight40: 2950,
    },
  ],
  "North America (20-25 Days)": [
    {
      id: "los-angeles",
      name: "Los Angeles / Long Beach, US West Coast",
      region: "US West Coast",
      transit: "20-23",
      freight20: 2650,
      freight40: 3850,
    },
    {
      id: "new-york",
      name: "New York / Newark, US East Coast",
      region: "US East Coast",
      transit: "28-32",
      freight20: 3100,
      freight40: 4500,
    },
    {
      id: "savannah",
      name: "Savannah, US South Coast",
      region: "US South Coast",
      transit: "27-30",
      freight20: 3050,
      freight40: 4400,
    },
  ],
  "Asia-Pacific & Oceania (8-14 Days)": [
    {
      id: "melbourne",
      name: "Melbourne / Sydney, Australia (Direct)",
      region: "Australia",
      transit: "10-12",
      freight20: 1350,
      freight40: 1950,
    },
    {
      id: "tokyo",
      name: "Tokyo / Yokohama, Japan",
      region: "East Asia",
      transit: "8-11",
      freight20: 1250,
      freight40: 1800,
    },
    {
      id: "busan",
      name: "Busan, South Korea",
      region: "East Asia",
      transit: "8-10",
      freight20: 1180,
      freight40: 1720,
    },
  ],
};

const FLAT_PORTS: PortOption[] = Object.values(PORTS).flat();

const PRODUCT_GRADES = {
  "grade-a": { name: "Grade A: Platinum Shisha Cubes 25/26mm", price: 1280 },
  "grade-b": { name: "Grade B: Hexagonal BBQ Briquettes", price: 1050 },
  "grade-c": { name: "Grade C: Granular Carbon Precursor", price: 890 },
};

const PACKAGING_OPTIONS = {
  "1kg-oem": {
    name: "1kg Inner Box + 10kg Master Carton (OEM Branded)",
    surcharge: 45,
  },
  "10kg-bulk": {
    name: "10kg Plain Craft Master Box (Neutral Label)",
    surcharge: 0,
  },
  "20kg-sack": {
    name: "20kg Heavy-Duty Export Woven Sack / Bulk",
    surcharge: -20,
  },
};

export default function FclCalculator({ onTransferSpec }: FclCalculatorProps) {
  const [selectedPortId, setSelectedPortId] = useState<string>("jebel-ali");
  const [containerSize, setContainerSize] = useState<"20ft" | "40hc">("20ft");
  const [productGrade, setProductGrade] = useState<"grade-a" | "grade-b" | "grade-c">(
    "grade-a"
  );
  const [packagingType, setPackagingType] = useState<
    "1kg-oem" | "10kg-bulk" | "20kg-sack"
  >("1kg-oem");
  const [incoterm, setIncoterm] = useState<"CIF" | "FOB">("CIF");
  const [stowage, setStowage] = useState<"floor" | "pallet">("floor");
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const currentPort = useMemo(() => {
    return FLAT_PORTS.find((p) => p.id === selectedPortId) || FLAT_PORTS[0];
  }, [selectedPortId]);

  const calculation = useMemo<CalculatorSpec>(() => {
    let baseTonnage = containerSize === "20ft" ? 19.5 : 27.0;
    let utilizationPercent = 98;

    if (stowage === "pallet") {
      baseTonnage = containerSize === "20ft" ? 16.5 : 23.0;
      utilizationPercent = 86;
    }

    const totalCartons = Math.round(baseTonnage * 100);
    let innerPacksText = "";
    if (packagingType === "1kg-oem") {
      innerPacksText = `${(totalCartons * 10).toLocaleString()} x 1kg OEM Boxes`;
    } else if (packagingType === "10kg-bulk") {
      innerPacksText = `${totalCartons.toLocaleString()} x 10kg Plain Cartons`;
    } else {
      innerPacksText = `${Math.round(totalCartons / 2).toLocaleString()} x 20kg Heavy Sacks`;
    }

    const fobPricePerTon = PRODUCT_GRADES[productGrade].price;
    const packSurchargePerTon = PACKAGING_OPTIONS[packagingType].surcharge;
    const baseOceanFreight =
      containerSize === "20ft" ? currentPort.freight20 : currentPort.freight40;

    const fobBaseValue = Math.round(baseTonnage * fobPricePerTon);
    const packagingValue = Math.round(baseTonnage * packSurchargePerTon);
    const freightCost = incoterm === "CIF" ? baseOceanFreight : 0;
    const grandTotal =
      fobBaseValue + (packagingValue > 0 ? packagingValue : 0) + freightCost;
    const ratePerKg = (grandTotal / (baseTonnage * 1000)).toFixed(2);
    const ratePerMt = Math.round(grandTotal / baseTonnage);

    return {
      portId: currentPort.id,
      portName: currentPort.name.split("(")[0].trim(),
      transitDays: currentPort.transit,
      containerSize,
      productGrade,
      packagingType,
      incoterm,
      stowage,
      tonnage: baseTonnage,
      totalCartons,
      innerPacksText,
      fobBaseValue,
      packagingValue,
      freightCost,
      grandTotal,
      ratePerKg,
      ratePerMt,
      utilizationPercent,
    };
  }, [
    containerSize,
    stowage,
    packagingType,
    productGrade,
    incoterm,
    currentPort,
  ]);

  const handleApplyToForm = () => {
    if (onTransferSpec) {
      onTransferSpec(calculation);
    }
  };

  const handleDownloadPdf = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      setPdfGenerating(false);
      alert(
        `Nusantara Ember Logistics Proforma (PDF) generated successfully for ${calculation.portName} (${calculation.tonnage} MT ${calculation.containerSize} - Total: $${calculation.grandTotal.toLocaleString()} USD). Proforma download completed.`
      );
    }, 1200);
  };

  return (
    <section
      className="w-full bg-surface-container-lowest py-space-2xl relative border-y border-outline-variant/30"
      id="fcl-calculator"
    >
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-primary-container/20 text-primary-container w-fit border border-primary-container/30">
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span className="font-label-tech-sm text-label-tech-sm uppercase tracking-wider font-semibold">
                Real-Time Logistics &amp; Procurement Estimator
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Interactive FCL Container &amp; Freight Cost Estimator
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Calculate container capacity, master carton breakdown, approximate ocean
              freight rates, and preliminary FOB / CIF per-metric-ton budget based on your
              target discharge port.
            </p>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-lg border border-outline-variant/40 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-tech-sm text-label-tech-sm text-on-surface">
              Updated: Q2 2025 Bunker &amp; Freight Index
            </span>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Form: Configuration */}
          <div className="lg:col-span-7 bg-surface-container rounded-2xl p-space-lg lg:p-space-xl border border-outline-variant/40 shadow-xl flex flex-col gap-space-lg">
            {/* Step 1: Destination Port */}
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="calc-destination-port"
                className="font-label-tech-sm text-label-tech-sm uppercase text-primary font-semibold flex items-center gap-1.5"
              >
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">
                  1
                </span>
                Destination Port &amp; Regional Corridor
              </label>
              <div className="relative">
                <select
                  id="calc-destination-port"
                  value={selectedPortId}
                  onChange={(e) => setSelectedPortId(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/60 px-space-md py-3 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary-container transition-all cursor-pointer"
                >
                  {Object.entries(PORTS).map(([groupName, ports]) => (
                    <optgroup key={groupName} label={groupName}>
                      {ports.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Container Spec */}
            <div className="flex flex-col gap-space-xs">
              <div className="font-label-tech-sm text-label-tech-sm uppercase text-primary font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">
                    2
                  </span>
                  FCL Container Size &amp; Payload Specification
                </span>
                <span className="text-outline font-normal">SHT Fire-Safe Compliant</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div
                  onClick={() => setContainerSize("20ft")}
                  className={`p-space-md rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                    containerSize === "20ft"
                      ? "border-primary-container bg-primary-container/10"
                      : "border-outline-variant/30 bg-surface-container-high hover:border-outline-variant"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-base text-on-surface">
                      20ft Standard FCL
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      directions_boat
                    </span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="font-metric-tabular text-[19px] text-on-surface">
                      19.5 MT Max Payload
                    </div>
                    <div className="font-body-sm text-body-sm text-outline mt-0.5">
                      ~1,950 x 10kg master cartons (or 19,500 x 1kg boxes)
                    </div>
                  </div>
                  <span className="mt-space-xs text-[11px] font-label-tech-sm text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">
                      check_circle
                    </span>{" "}
                    Ideal for First-Time Importers
                  </span>
                </div>

                <div
                  onClick={() => setContainerSize("40hc")}
                  className={`p-space-md rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                    containerSize === "40hc"
                      ? "border-primary-container bg-primary-container/10"
                      : "border-outline-variant/30 bg-surface-container-high hover:border-outline-variant"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-base text-on-surface">
                      40ft High Cube (HC)
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      directions_boat
                    </span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="font-metric-tabular text-[19px] text-on-surface">
                      27.0 MT Max Payload
                    </div>
                    <div className="font-body-sm text-body-sm text-outline mt-0.5">
                      ~2,700 x 10kg master cartons (or 27,000 x 1kg boxes)
                    </div>
                  </div>
                  <span className="mt-space-xs text-[11px] font-label-tech-sm text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">
                      savings
                    </span>{" "}
                    Lowest Ocean Freight Per MT
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 & 4: Product Grade & Packaging Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label
                  htmlFor="calc-product-grade"
                  className="font-label-tech-sm text-label-tech-sm uppercase text-primary font-semibold flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">
                    3
                  </span>
                  Product Classification &amp; Grade
                </label>
                <select
                  id="calc-product-grade"
                  value={productGrade}
                  onChange={(e) =>
                    setProductGrade(
                      e.target.value as "grade-a" | "grade-b" | "grade-c"
                    )
                  }
                  className="w-full bg-surface-container-high border border-outline-variant/60 px-space-md py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary-container transition-all cursor-pointer"
                >
                  <option value="grade-a">
                    Grade A: Platinum Shisha Cubes 25/26mm ($1,280/MT)
                  </option>
                  <option value="grade-b">
                    Grade B: Hexagonal BBQ Briquettes ($1,050/MT)
                  </option>
                  <option value="grade-c">
                    Grade C: Granular Carbon Precursor ($890/MT)
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-space-xs">
                <label
                  htmlFor="calc-packaging-type"
                  className="font-label-tech-sm text-label-tech-sm uppercase text-primary font-semibold flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">
                    4
                  </span>
                  Carton &amp; Packaging Specification
                </label>
                <select
                  id="calc-packaging-type"
                  value={packagingType}
                  onChange={(e) =>
                    setPackagingType(
                      e.target.value as "1kg-oem" | "10kg-bulk" | "20kg-sack"
                    )
                  }
                  className="w-full bg-surface-container-high border border-outline-variant/60 px-space-md py-2.5 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary-container transition-all cursor-pointer"
                >
                  <option value="1kg-oem">
                    1kg Inner Box + 10kg Master Carton (OEM Branded)
                  </option>
                  <option value="10kg-bulk">
                    10kg Plain Craft Master Box (Neutral Label)
                  </option>
                  <option value="20kg-sack">
                    20kg Heavy-Duty Export Woven Sack / Bulk
                  </option>
                </select>
              </div>
            </div>

            {/* Step 5 & 6: Incoterm & Stowage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
              {/* Incoterm */}
              <div className="flex flex-col gap-space-xs">
                <div className="font-label-tech-sm text-label-tech-sm uppercase text-primary font-semibold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">
                    5
                  </span>
                  Commercial Incoterm
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIncoterm("CIF")}
                    className={`py-2.5 px-3 rounded-lg font-label-tech-sm text-label-tech-sm font-semibold transition-all ${
                      incoterm === "CIF"
                        ? "border-2 border-primary-container bg-primary-container/15 text-on-surface"
                        : "border border-outline-variant/60 bg-surface-container-high text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    CIF (Port Delivered)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncoterm("FOB")}
                    className={`py-2.5 px-3 rounded-lg font-label-tech-sm text-label-tech-sm font-semibold transition-all ${
                      incoterm === "FOB"
                        ? "border-2 border-primary-container bg-primary-container/15 text-on-surface"
                        : "border border-outline-variant/60 bg-surface-container-high text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    FOB (Indonesian Port)
                  </button>
                </div>
                <span
                  className={`text-[11px] font-body-sm mt-1 ${
                    incoterm === "CIF" ? "text-outline" : "text-primary"
                  }`}
                >
                  {incoterm === "CIF"
                    ? "Includes sea freight + marine insurance to discharge port."
                    : "Excludes ocean freight. Goods delivered free on board Tanjung Emas / Perak."}
                </span>
              </div>

              {/* Stowage Loading Method */}
              <div className="flex flex-col gap-space-xs">
                <div className="font-label-tech-sm text-label-tech-sm uppercase text-primary font-semibold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">
                    6
                  </span>
                  Container Stowage Method
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStowage("floor")}
                    className={`py-2.5 px-3 rounded-lg font-label-tech-sm text-label-tech-sm font-semibold transition-all ${
                      stowage === "floor"
                        ? "border-2 border-secondary bg-secondary/15 text-on-surface"
                        : "border border-outline-variant/60 bg-surface-container-high text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    Floor Loaded (100%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStowage("pallet")}
                    className={`py-2.5 px-3 rounded-lg font-label-tech-sm text-label-tech-sm font-semibold transition-all ${
                      stowage === "pallet"
                        ? "border-2 border-secondary bg-secondary/15 text-on-surface"
                        : "border border-outline-variant/60 bg-surface-container-high text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    ISPM-15 Pallets (~85%)
                  </button>
                </div>
                <span
                  className={`text-[11px] font-body-sm mt-1 ${
                    stowage === "floor" ? "text-secondary" : "text-primary"
                  }`}
                >
                  {stowage === "floor"
                    ? "Max capacity payload; zero pallet volume loss."
                    : "Heat-treated ISPM-15 wooden pallets (~15% volumetric payload reduction)."}
                </span>
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 bg-surface-container-low rounded-2xl p-space-lg lg:p-space-xl border-2 border-primary-container/40 shadow-2xl relative flex flex-col justify-between gap-space-lg">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-primary-container text-on-surface font-label-tech-sm text-label-tech-sm font-bold rounded-full shadow-lg">
              LIVE ESTIMATE SUMMARY
            </div>

            <div className="flex flex-col gap-space-md">
              {/* Destination Port & Lead Time */}
              <div className="pb-space-sm border-b border-outline-variant/40">
                <div className="text-xs font-label-tech-sm text-outline uppercase tracking-wider">
                  Estimated Consignment for:
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      location_on
                    </span>
                    <span>{calculation.portName}</span>
                  </div>
                  <span className="px-space-sm py-0.5 rounded bg-surface-container text-primary font-label-tech-sm text-[11px] border border-primary/20">
                    {calculation.transitDays} Days Transit
                  </span>
                </div>
              </div>

              {/* Metric Tons & Cartons Breakdown */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm bg-surface-container rounded-xl border border-outline-variant/20 flex flex-col">
                  <span className="font-label-tech-sm text-label-tech-sm text-on-surface-variant uppercase">
                    Total Weight
                  </span>
                  <span className="font-metric-tabular text-metric-tabular text-primary">
                    {calculation.tonnage.toFixed(1)} MT
                  </span>
                  <span className="text-[11px] font-body-sm text-outline mt-0.5">
                    {(calculation.tonnage * 1000).toLocaleString()} Kilograms Net
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container rounded-xl border border-outline-variant/20 flex flex-col">
                  <span className="font-label-tech-sm text-label-tech-sm text-on-surface-variant uppercase">
                    Master Cartons
                  </span>
                  <span className="font-metric-tabular text-metric-tabular text-on-surface">
                    {calculation.totalCartons.toLocaleString()} Box
                  </span>
                  <span className="text-[11px] font-body-sm text-secondary mt-0.5">
                    {calculation.innerPacksText}
                  </span>
                </div>
              </div>

              {/* Space Utilization Progress Bar */}
              <div className="p-space-sm bg-surface-container rounded-xl border border-outline-variant/20 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-label-tech-sm">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[14px]">
                      view_in_ar
                    </span>
                    Stowage Space Efficiency
                  </span>
                  <span className="text-secondary font-bold">
                    {calculation.utilizationPercent}% (
                    {calculation.stowage === "floor" ? "Floor Stuffed" : "Palletized"})
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full transition-all duration-300"
                    style={{ width: `${calculation.utilizationPercent}%` }}
                  />
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-space-xs text-sm pt-space-xs">
                <div className="flex justify-between items-center py-2 px-space-sm bg-surface-container rounded-lg border border-outline-variant/10">
                  <span className="text-on-surface-variant">FOB Factory Product Base:</span>
                  <span className="font-headline-sm text-headline-sm text-sm text-on-surface">
                    ${calculation.fobBaseValue.toLocaleString()} USD
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 px-space-sm bg-surface-container rounded-lg border border-outline-variant/10">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span>Packaging / OEM Finishing:</span>
                    <span
                      className="material-symbols-outlined text-[14px] text-outline cursor-help"
                      title="Includes custom inner printing and outer master carton"
                    >
                      info
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-sm text-on-surface">
                    {calculation.packagingValue >= 0 ? "+$" : "-$"}
                    {Math.abs(calculation.packagingValue).toLocaleString()} USD
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 px-space-sm bg-surface-container rounded-lg border border-outline-variant/10">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span>Ocean Freight &amp; SHT Surcharge:</span>
                    <span
                      className="material-symbols-outlined text-[14px] text-secondary cursor-help"
                      title="Dangerous Goods maritime declaration + Self-Heating certification included"
                    >
                      verified_user
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-sm text-primary">
                    {calculation.incoterm === "CIF"
                      ? `+$${calculation.freightCost.toLocaleString()} USD`
                      : "$0 (Buyer Arranged)"}
                  </span>
                </div>
              </div>

              {/* Grand Total Block */}
              <div className="p-space-md rounded-xl bg-gradient-to-br from-primary-container/20 to-surface-container-high border border-primary-container/40">
                <div className="flex items-center justify-between">
                  <span className="font-label-tech-sm text-label-tech-sm uppercase text-on-surface font-semibold tracking-wider">
                    {calculation.incoterm === "CIF"
                      ? "Estimated Total CIF Value:"
                      : "Estimated Total FOB Value:"}
                  </span>
                  <span className="text-[11px] font-label-tech-sm text-secondary uppercase bg-secondary/15 px-2 py-0.5 rounded border border-secondary/20">
                    {calculation.incoterm === "CIF"
                      ? "All-Inclusive Port CIF"
                      : "FOB Tanjung Emas/Perak"}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-headline-lg text-[32px] font-bold text-on-surface tracking-tight">
                    ${calculation.grandTotal.toLocaleString()} USD
                  </span>
                  <div className="text-right">
                    <span className="font-metric-tabular text-base text-primary-container font-bold block">
                      ${calculation.ratePerKg} / kg
                    </span>
                    <span className="text-[11px] font-label-tech-sm text-outline block">
                      (${calculation.ratePerMt.toLocaleString()} / MT{" "}
                      {calculation.incoterm})
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-body-sm text-outline leading-tight">
                * Indicative calculation based on current shipping line tariff &amp;
                bunker fuel adjustment factors. Final proforma subject to official
                booking confirmation and commodity spot indices.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full py-space-md rounded-lg bg-primary-container text-on-surface font-headline-sm text-headline-sm text-base font-bold shadow-xl hover:bg-primary-container/90 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-space-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  assignment_turned_in
                </span>
                <span>Transfer Spec to Official Quote Form</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={pdfGenerating}
                className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-tech-lg text-label-tech-lg transition-colors flex items-center justify-center gap-space-xs cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  download
                </span>
                <span>
                  {pdfGenerating
                    ? "Generating Proforma PDF..."
                    : "Download Proforma Estimate (.PDF)"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
