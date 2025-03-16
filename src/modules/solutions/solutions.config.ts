import { SolutionsMetadata } from "./types";
import { pricesVariables } from "../variables/variables.config";

export const solutionsMetadata: SolutionsMetadata[] = [
  {
    upgradeAccessor: "solar",
    solutions: [
      {
        label: "Install Panels",
        accessor: "installPanels",
        description: "Install a new solar system",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numPanels", "wattsPerPanel"],
        generalVariables: [],
        costFormula({ numPanels = 0, wattsPerPanel = 0 }) {
          if (numPanels < 5) throw new Error("Too few panels");
          return (
            numPanels * wattsPerPanel * pricesVariables.solar.dollarPerWatt
          );
        },
      },
      {
        label: "Remove & Reinstall Panels",
        accessor: "rnrPanels",
        description: "Remove and reinstall existing solar system",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numPanels"],
        generalVariables: ["existingRoofType"],
        costFormula({ numPanels = 0 }) {
          if (numPanels < 5) throw new Error("Minimum 5 panels");
          return numPanels * pricesVariables.solar.dollarPerPanelRnr;
        },
      },
      {
        label: "Install Battery",
        accessor: "installBattery",
        description: "Install a new battery",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numBatteries", "kWhPerBattery"],
        generalVariables: [],
        costFormula({ numBatteries = 0, kWhPerBattery = 5 }) {
          if (numBatteries < 1) throw new Error("Minimum 1 battery");
          const pricePerBattery =
            kWhPerBattery === 5
              ? pricesVariables.solar.battery5kWh
              : pricesVariables.solar.battery10kWh;
          return numBatteries * pricePerBattery;
        },
      },
    ],
  },
  {
    upgradeAccessor: "roof",
    solutions: [
      {
        label: "Roof Tear-off",
        accessor: "tearOff",
        description: "Replace existing roofing",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numFlatBSQ", "numPitchedBSQ", "numLayers"],
        generalVariables: ["numStories", "existingRoofType"],
        costFormula({
          numFlatBSQ = 0,
          numPitchedBSQ = 0,
          numLayers = 1,
          numStories = 1,
          existingRoofType = "shingles",
        }) {
          const totalBSQ = numFlatBSQ + numPitchedBSQ;
          const pitchedCost =
            (existingRoofType === "shingles"
              ? pricesVariables.roof.BSQTearOffShingles
              : pricesVariables.roof.BSQTearOffTile) * numPitchedBSQ;
          const flatCost = numFlatBSQ * pricesVariables.roof.BSQTearOffFlat;
          const costAdditionalLayers =
            (numLayers - 1) *
            pricesVariables.roof.dollarPerAdditionalLayer *
            numPitchedBSQ;
          const costAdditionalStories =
            (numStories - 1) *
            pricesVariables.roof.dollarPerAdditionalStory *
            totalBSQ;
          return (
            pitchedCost +
            flatCost +
            costAdditionalLayers +
            costAdditionalStories
          );
        },
      },
      {
        label: "Roof Redeck",
        accessor: "redeck",
        description: "Replace entire existing roofing",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numFlatBSQ", "numPitchedBSQ", "numLayers"],
        generalVariables: ["numStories"],
        costFormula({
          numFlatBSQ = 0,
          numPitchedBSQ = 0,
          numLayers = 1,
          numStories = 1,
        }) {
          const totalBSQ = numFlatBSQ + numPitchedBSQ;
          const baseCost =
            numFlatBSQ * pricesVariables.roof.BSQRedeckFlat +
            numPitchedBSQ * pricesVariables.roof.BSQRedeckPitched;
          const costAdditionalLayers =
            (numLayers - 1) *
            pricesVariables.roof.dollarPerAdditionalLayer *
            totalBSQ;
          const costAdditionalStories =
            (numStories - 1) *
            pricesVariables.roof.dollarPerAdditionalStory *
            totalBSQ;
          return baseCost + costAdditionalLayers + costAdditionalStories;
        },
      },
      {
        label: "Tile Reset",
        accessor: "tileReset",
        description: "Replace entire existing tile roofing",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numPitchedBSQ"],
        generalVariables: ["numStories"],
        costFormula({ numPitchedBSQ = 0, numStories = 1 }) {
          const additionalStoriesPricing =
            (numStories - 1) * pricesVariables.roof.dollarPerAdditionalStory;
          const baseCost =
            numPitchedBSQ *
            (pricesVariables.roof.BSQTileReset + additionalStoriesPricing);
          return baseCost;
        },
      },
    ],
  },
  {
    upgradeAccessor: "windows",
    solutions: [
      {
        label: "Window replacement",
        accessor: "replaceWindows",
        description: "Replace existing windows",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numLargeWindows", "numSmallWindows"],
        generalVariables: [],
        costFormula({ numLargeWindows = 0, numSmallWindows = 0 }) {
          if (numLargeWindows + numSmallWindows < 5)
            throw new Error("Minimum 5 windows");
          return (
            numSmallWindows * pricesVariables.windows.windowSmall +
            numLargeWindows * pricesVariables.windows.windowLarge
          );
        },
      },
      {
        label: "Replace sliders",
        accessor: "rnrSliders",
        description: "Replace existing window sliders",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numStandardSliders", "numSpecialSliders"],
        generalVariables: [],
        costFormula({ numStandardSliders = 0, numSpecialSliders = 0 }) {
          const costStandardSliders =
            numStandardSliders * pricesVariables.windows.slidingDoorStandard;
          const costSpecialSliders =
            numSpecialSliders * pricesVariables.windows.slidingDoorSpecial;
          return costStandardSliders + costSpecialSliders;
        },
      },
    ],
  },
  {
    upgradeAccessor: "insulation",
    solutions: [
      {
        label: "Remove & replace attic insulation",
        accessor: "rnrAttic",
        description: "Remove & replace attic insulation",
        imageUrl:
          "https://www.contractortalk.com/attachments/2-2_plywoodoverskipsheathing-jpg.134649/",
        variables: ["atticSqFt"],
        generalVariables: [],
        costFormula({ atticSqFt = 0 }) {
          return atticSqFt * pricesVariables.insulation.dollarPerSqFtRnr;
        },
      },
      {
        label: "Top-off attic insulation",
        accessor: "topOffAttic",
        description: "Top-off attic insulation",
        imageUrl:
          "https://www.contractortalk.com/attachments/2-2_plywoodoverskipsheathing-jpg.134649/",
        variables: ["atticSqFt"],
        generalVariables: [],
        costFormula({ atticSqFt = 0 }) {
          return atticSqFt * pricesVariables.insulation.dollarPerSqFtTopOff;
        },
      },
    ],
  },
  {
    upgradeAccessor: "hvac",
    solutions: [
      {
        label: "Remove & replace Split System",
        accessor: "rnrSplitSystem",
        description: "Remove and replace a whole-house split system",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["systemTonnage"],
        generalVariables: ["numStories"],
        costFormula({ systemTonnage = 3 }) {
          return 0;
        },
      },
      {
        label: "Remove & replace furnace",
        accessor: "rnrFurnace",
        description: "Remove and replace an existing furnace",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["systemTonnage"],
        generalVariables: ["numStories"],
        costFormula({ systemTonnage = 3 }) {
          return 0;
        },
      },
      {
        label: "Remove & replace condenser",
        accessor: "rnrCondenser",
        description: "Remove and replace an existing condenser & coil",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["systemTonnage"],
        generalVariables: ["numStories"],
        costFormula({ systemTonnage = 3 }) {
          return 0;
        },
      },
      {
        label: "Install new mini-splits",
        accessor: "installMiniSplits",
        description: "Install new mini-splits in the home",
        imageUrl:
          "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
        variables: ["numMiniSplits"],
        generalVariables: ["numStories"],
        costFormula({ systemTonnage = 3 }) {
          return 0;
        },
      },
    ],
  },
  // {
  //   upgradeAccessor: "dryscaping",
  //   solutions: [
  //     {
  //       label: "Install Artificial",
  //       accessor: "installArtificial",
  //       description: "Install Artificial Grasssss",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //     {
  //       label: "Install Gravel",
  //       accessor: "installGravel",
  //       description: "Install Gravel hereeee",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //     {
  //       label: "Install Mulch",
  //       accessor: "installMulch",
  //       description: "Install Mulch sonnneee",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //     {
  //       label: "Install Concrete",
  //       accessor: "installConcrete",
  //       description: "Install Concrete sstrong sonnneee",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //     {
  //       label: "Remove and Replace Concrete",
  //       accessor: "rnrConcrete",
  //       description: "Remove and replace concrete boyyy",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //     {
  //       label: "Install Pavers",
  //       accessor: "installPavers",
  //       description: "Install Pavers beautiful",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //   ],
  // },
  // {
  //   upgradeAccessor: "exteriorPaint",
  //   solutions: [
  //     {
  //       label: "Cool Life Paint",
  //       accessor: "coolLifePaint",
  //       description: "Paint your home",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //     {
  //       label: "Water Paint",
  //       accessor: "waterPaint",
  //       description: "Paint your home",
  //       imageUrl:
  //         "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
  //       costFormula() {},
  //     },
  //   ],
  // },
  // {
  //   upgradeAccessor: "interiorPaint",
  //   solutions: [],
  // },
  // {
  //   upgradeAccessor: "electricals",
  //   solutions: [],
  // },
];
