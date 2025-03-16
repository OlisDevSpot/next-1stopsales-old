import { AllUpgrades } from "../upgrades/types";
import { Variable } from "./types";

type GeneralVariables = {
  home: Variable[];
  lot: Variable[];
};

type UpgradeVariables = {
  [key in AllUpgrades]: Variable[];
};

export const generalVariables: GeneralVariables = {
  home: [
    {
      accessor: "numStories",
      type: "select",
      label: "Number of stories",
      options: [1, 2, 3, 4, 5],
      defaultValue: 1,
    },
    {
      accessor: "existingRoofType",
      type: "select",
      label: "Existing roof type",
      options: ["shingle", "tile", "metal", "flat", "woodshakes"],
      defaultValue: "shingle",
    },
  ],
  lot: [
    {
      accessor: "lotSqFt",
      type: "number",
      label: "Square feet of lot",
    },
  ],
};

export const upgradeVariables: UpgradeVariables = {
  solar: [
    {
      accessor: "numPanels",
      label: "Number of panels",
      type: "number",
    },
    { accessor: "wattsPerPanel", label: "Watts per panel", type: "number" },
    {
      accessor: "numBatteries",
      label: "Number of batteries",
      type: "select",
      options: [0, 1, 2, 3],
      defaultValue: 0,
    },
    {
      accessor: "kWhPerBattery",
      label: "kWh per battery",
      type: "select",
      options: [5, 10],
    },
    {
      accessor: "inverterType",
      label: "Inverter type",
      type: "select",
      options: ["microinverter", "solar-edge"],
      defaultValue: "microinverter",
    },
  ],
  roof: [
    { accessor: "numFlatBSQ", label: "Number of flat BSQ", type: "number" },
    {
      accessor: "numPitchedBSQ",
      label: "Number of pitched BSQ",
      type: "number",
    },
    {
      accessor: "numLayers",
      label: "Number of current roof layers",
      type: "select",
      options: [1, 2, 3],
      defaultValue: 1,
    },
    {
      accessor: "currentRoofType",
      label: "Starting roof type",
      type: "select",
      options: ["shingle", "tile", "metal", "flat", "woodshakes"],
      defaultValue: "shingle",
    },
    {
      accessor: "desiredRoofType",
      label: "Finishing roof type",
      type: "select",
      options: ["shingle", "tile", "metal", "flat", "woodshakes"],
      defaultValue: "shingle",
    },
    {
      accessor: "percentFreeDeckReplacement",
      label: "Percent free deck replacement",
      type: "select",
      options: [15, 20, 25],
      defaultValue: 15,
    },
  ],
  windows: [
    {
      accessor: "numLargeWindows",
      label: "Number of large windows",
      type: "number",
    },
    {
      accessor: "numSmallWindows",
      label: "Number of small windows",
      type: "number",
    },
    {
      accessor: "numStandardSliders",
      label: "Number of standard sliding doors",
      type: "number",
    },
    {
      accessor: "numSpecialSliders",
      label: "Number of special sliding doors",
      type: "number",
    },
  ],
  insulation: [
    {
      accessor: "atticSqFt",
      label: "Square feet of insulation",
      type: "number",
    },
    {
      accessor: "existingInsulationType",
      label: "Starting insulation type",
      type: "select",
      options: ["fiberglass batts", "fiberglass blown", "cellulose blown"],
      defaultValue: "fiberglass blown",
    },
    {
      accessor: "desiredInsulationType",
      label: "Finish insulation type",
      type: "select",
      options: ["fiberglass batts", "fiberglass blown", "cellulose blown"],
      defaultValue: "fiberglass blown",
    },
  ],
  exteriorPaint: [
    {
      accessor: "paintType",
      label: "Paint type",
      type: "select",
      options: ["coolLife", "water"],
      defaultValue: "coolLife",
    },
  ],
  hvac: [
    {
      accessor: "systemTonnage",
      label: "System tonnage",
      type: "select",
      options: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      defaultValue: 3,
    },
    {
      accessor: "numMiniSplits",
      label: "Number of mini splits",
      type: "select",
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      defaultValue: 1,
    },
  ],
  dryscaping: [
    {
      accessor: "artificialSqFt",
      label: "Square feet of artificial grass",
      type: "number",
    },
    {
      accessor: "gravelSqFt",
      label: "Square feet of gravellllll",
      type: "number",
    },
    {
      accessor: "concreteSqFt",
      label: "Square feet of concrete",
      type: "number",
    },
    { accessor: "mulchSqFt", label: "Square feet of mulch", type: "number" },
    { accessor: "paversSqFt", label: "Square feet of pavers", type: "number" },
  ],
  interiorPaint: [
    { accessor: "numBedrooms", label: "Number of bedrooms", type: "number" },
    { accessor: "numBathrooms", label: "Number of bathrooms", type: "number" },
    {
      accessor: "extent",
      label: "What is being painted?",
      type: "select",
      options: ["all", "partial"],
      defaultValue: "all",
    },
  ],
  electricals: [],
};

export const pricesVariables = {
  solar: {
    dollarPerWatt: 3.5,
    dollarPerPanelRnr: 225,
    battery5kWh: 6000,
    battery10kWh: 11000,
  },
  roof: {
    BSQTearOffFlat: 530,
    BSQTearOffShingles: 480,
    BSQTearOffTile: 750,
    BSQRedeckFlat: 650,
    BSQRedeckPitched: 700,
    BSQTileReset: 580,
    BSQOverlay: 420,
    dollarPerAdditionalStory: 25,
    dollarPerAdditionalLayer: 25,
    permitFee: 250,
  },
  windows: {
    windowSmall: 550,
    windowLarge: 650,
    slidingDoorStandard: 2500,
    slidingDoorSpecial: 3000,
    frenchDoor: 5000,
  },
  insulation: {
    dollarPerSqFtTopOff: 1.3,
    dollarPerSqFtRnr: 2.5,
  },
  dryscaping: {
    dollarPerSqFtArtificial: 7,
    dollarPerSqFtGravel: 6,
    dollarPerSqFtMulch: 5,
    dollarPerSqFtConcrete: 11,
    dollarPerSqFtPavers: 11,
  },
  hvac: {
    threeTonRnr: 8500,
    fourTonRnr: 9200,
    fiveTonRnr: 10000,
    miniSplits: 3000,
    permitFee: 250,
  },
  electricals: {
    mainPanelUpgrade: 2800,
  },
  exteriorPaint: {
    coolLifePaintSm: 6000,
    coolLifePaintAvg: 7000,
    coolLifePaintLarge: 8500,
  },
  interiorPaint: {},
} as const;
