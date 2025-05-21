import { SolutionsMetadata } from "./types";
import { pricesVariables } from "../variables/variables.config";
import { UpgradeAccessor } from "../upgrades/types";

const currentProjectInfo = {
  roofType: "shingle",
  numStories: 1,
};

export const solutionsMetadata: SolutionsMetadata = {
  solar: [
    {
      label: "Install Panels",
      accessor: "installPanels",
      description: "Install a new solar system",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: ["numPanels", "wattsPerPanel"],
      generalVariables: [],
      costFormula({ numPanels = 0, wattsPerPanel = 0 }) {
        return numPanels * wattsPerPanel * pricesVariables.solar.dollarPerWatt;
      },
    },
    {
      label: "Remove & Reinstall Panels",
      accessor: "rnrPanels",
      description: "Remove and reinstall existing solar system",
      imageUrl:
        "https://solarfixaz.com/core/uploads/2023/11/Residential-Solar-Panels.6116fa95c5e8f0.47033230-1024x536.jpg",
      variables: ["numPanels"],
      generalVariables: ["existingRoofType"],
      costFormula({ numPanels = 0 }) {
        return numPanels * pricesVariables.solar.dollarPerPanelRnr;
      },
    },
    {
      label: "Install Battery",
      accessor: "installBattery",
      description: "Install a new battery",
      imageUrl:
        "https://solaroptimum.com/wp-content/uploads/2022/01/SO_enphase_horiz_4-1.jpeg",
      variables: ["numBatteries", "kWhPerBattery"],
      generalVariables: [],
      costFormula({ numBatteries = 0, kWhPerBattery = 5 }) {
        const pricePerBattery =
          kWhPerBattery === 5
            ? pricesVariables.solar.battery5kWh
            : pricesVariables.solar.battery10kWh;
        return numBatteries * pricePerBattery;
      },
    },
  ],
  roof: [
    {
      label: "Roof Overlay",
      accessor: "overlay",
      description: "Overlay over existing roofing",
      imageUrl:
        "https://s42814.pcdn.co/wp-content/uploads/2020/01/Roofing_iStock-934626558.0-1-scaled.jpg.optimal.jpg",
      variables: ["numFlatBSQ", "numPitchedBSQ"],
      generalVariables: ["numStories"],
      costFormula({ numFlatBSQ = 0, numPitchedBSQ = 0 }) {
        const flatCost = numFlatBSQ * pricesVariables.roof.BSQOverlayFlat;
        const pitchedCost =
          numPitchedBSQ * pricesVariables.roof.BSQOverlayPitched;

        const totalBSQ = numFlatBSQ + numPitchedBSQ;
        const costAdditionalStories =
          (currentProjectInfo.numStories - 1) *
          pricesVariables.roof.dollarPerAdditionalStory *
          totalBSQ;

        return flatCost + pitchedCost + costAdditionalStories;
      },
    },
    {
      label: "Roof Tear-off",
      accessor: "tearOff",
      description: "Replace existing roofing",
      imageUrl:
        "https://s42814.pcdn.co/wp-content/uploads/2020/01/Roofing_iStock-934626558.0-1-scaled.jpg.optimal.jpg",
      variables: ["numFlatBSQ", "numPitchedBSQ", "numLayers"],
      generalVariables: ["numStories", "existingRoofType"],
      costFormula({ numFlatBSQ = 0, numPitchedBSQ = 0, numLayers = 1 }) {
        const totalBSQ = numFlatBSQ + numPitchedBSQ;
        const pitchedCost =
          (currentProjectInfo.roofType === "shingle"
            ? pricesVariables.roof.BSQTearOffShingles
            : pricesVariables.roof.BSQTearOffTile) * numPitchedBSQ;
        const flatCost = numFlatBSQ * pricesVariables.roof.BSQTearOffFlat;
        const costAdditionalLayers =
          (numLayers - 1) *
          pricesVariables.roof.dollarPerAdditionalLayer *
          numPitchedBSQ;
        const costAdditionalStories =
          (currentProjectInfo.numStories - 1) *
          pricesVariables.roof.dollarPerAdditionalStory *
          totalBSQ;
        return (
          pitchedCost + flatCost + costAdditionalLayers + costAdditionalStories
        );
      },
    },
    {
      label: "Roof Redeck",
      accessor: "redeck",
      description: "Replace entire existing roofing",
      imageUrl:
        "https://www.contractortalk.com/attachments/2-2_plywoodoverskipsheathing-jpg.134649/",
      variables: ["numFlatBSQ", "numPitchedBSQ", "numLayers"],
      generalVariables: ["numStories"],
      costFormula({ numFlatBSQ = 0, numPitchedBSQ = 0, numLayers = 1 }) {
        const totalBSQ = numFlatBSQ + numPitchedBSQ;
        const baseCost =
          numFlatBSQ * pricesVariables.roof.BSQRedeckFlat +
          numPitchedBSQ * pricesVariables.roof.BSQRedeckPitched;
        const costAdditionalLayers =
          (numLayers - 1) *
          pricesVariables.roof.dollarPerAdditionalLayer *
          numPitchedBSQ;
        const costAdditionalStories =
          (currentProjectInfo.numStories - 1) *
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
        "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/11/featured-tile-roof.jpeg.jpg",
      variables: ["numPitchedBSQ"],
      generalVariables: ["numStories"],
      costFormula({ numPitchedBSQ = 0 }) {
        const additionalStoriesPricing =
          (currentProjectInfo.numStories - 1) *
          pricesVariables.roof.dollarPerAdditionalStory;
        const baseCost =
          numPitchedBSQ *
          (pricesVariables.roof.BSQTileReset + additionalStoriesPricing);
        return baseCost;
      },
    },
  ],
  windows: [
    {
      label: "Window replacement",
      accessor: "replaceWindows",
      description: "Replace existing windows",
      imageUrl:
        "https://www.windowwire.com/cdn/shop/products/Window_Wire_0010_BA_W_No_Grids_bb520116-c33c-40f7-b355-c6b54903912a_1200x1200.jpg?v=1588609566",
      variables: ["numLargeWindows", "numSmallWindows"],
      generalVariables: [],
      costFormula({ numLargeWindows = 0, numSmallWindows = 0 }) {
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
        "https://bearwindows.com/wp-content/uploads/2020/05/vinyl-french1.jpg",
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
  insulation: [
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
        "https://braxroofing.com/wp-content/uploads/2022/10/roofer-installing-an-attic-insulation.jpg",
      variables: ["atticSqFt"],
      generalVariables: [],
      costFormula({ atticSqFt = 0 }) {
        return atticSqFt * pricesVariables.insulation.dollarPerSqFtTopOff;
      },
    },
  ],
  hvac: [
    {
      label: "Remove & replace Split System",
      accessor: "rnrSplitSystem",
      description: "Remove and replace a whole-house split system",
      imageUrl:
        "https://www.hatchyourhome.com/wp-content/uploads/2019/12/attic-air-conditioner-attic-air-conditioning-units-attic-ac-unit-6-photos-for-heating-cooling-attic-ac-unit-price-attic-air-conditioning-attic-air-conditioning-system-cost-min.jpg",
      variables: ["systemTonnage"],
      generalVariables: ["numStories"],
      costFormula({ systemTonnage = 3 }) {
        const cost = systemTonnage === 3 ? 8500 : 10000;
        return cost;
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
        console.log({ systemTonnage });
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
        console.log({ systemTonnage });
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
        console.log({ systemTonnage });
        return 0;
      },
    },
  ],
  dryscaping: [
    {
      label: "Install Artificial",
      accessor: "installArtificial",
      description: "Install Artificial Grasssss",
      imageUrl:
        "https://miro.medium.com/v2/resize:fit:736/1*G0SHQeORsSRDJIpErgGd6Q.jpeg",
      variables: ["artificialSqFt"],
      generalVariables: [],
      costFormula({ artificialSqFt }) {
        return (
          artificialSqFt * pricesVariables.dryscaping.dollarPerSqFtArtificial
        );
      },
    },
    {
      label: "Install Gravel",
      accessor: "installGravel",
      description: "Install Gravel hereeee",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: ["gravelSqFt"],
      generalVariables: [],
      costFormula({ gravelSqFt }) {
        return gravelSqFt * pricesVariables.dryscaping.dollarPerSqFtGravel;
      },
    },
    {
      label: "Install Mulch",
      accessor: "installMulch",
      description: "Install Mulch sonnneee",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: ["mulchSqFt"],
      generalVariables: [],
      costFormula({ mulchSqFt }) {
        console.log({ mulchSqFt });
        return 0;
      },
    },
    {
      label: "Install Concrete",
      accessor: "installConcrete",
      description: "Install Concrete sstrong sonnneee",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: ["concreteSqFt"],
      generalVariables: [],
      costFormula({ concreteSqFt }) {
        console.log({ concreteSqFt });
        return 0;
      },
    },
    {
      label: "Remove and Replace Concrete",
      accessor: "rnrConcrete",
      description: "Remove and replace concrete boyyy",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: ["concreteSqFt"],
      generalVariables: [],
      costFormula({ concreteSqFt }) {
        console.log({ concreteSqFt });
        return 0;
      },
    },
    {
      label: "Install Pavers",
      accessor: "installPavers",
      description: "Install Pavers beautiful",
      imageUrl:
        "https://cfrouting.zoeysite.com/cdn-cgi/image/format=auto,fit=scale-down,quality=70/https://s3.amazonaws.com/zcom-media/sites/a0iE000000Hu85dIAB/media/catalog/product/u/s/uspaverscape-royal-castlescape-pavers-a.jpg",
      variables: ["paversSqFt"],
      generalVariables: [],
      costFormula({ paversSqFt }) {
        console.log({ paversSqFt });
        return 0;
      },
    },
  ],
  exteriorPaint: [
    {
      label: "Cool Life Paint",
      accessor: "coolLifePaint",
      description: "Paint your home",
      imageUrl:
        "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/painting-the-exterior-of-our-house-with-the-projectcolor-app-hero.jpg",
      variables: [],
      generalVariables: [],
      costFormula() {
        return 0;
      },
    },
    {
      label: "Water Paint",
      accessor: "waterPaint",
      description: "Paint your home",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: [],
      generalVariables: [],
      costFormula() {
        return 0;
      },
    },
  ],
  interiorPaint: [
    {
      label: "Partial interior paint",
      accessor: "partialInteriorPaint",
      description: "Paint a room or area",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: [],
      generalVariables: [],
      costFormula() {
        return 0;
      },
    },
    {
      label: "Full interior repaint",
      accessor: "fullInteriorPaint",
      description: "Paint entire home interior",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: [],
      generalVariables: [],
      costFormula() {
        return 0;
      },
    },
  ],
  electricals: [
    {
      label: "Main Panel Upgrade",
      accessor: "mpu",
      description: "Upgrade main panel",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg",
      variables: [],
      generalVariables: [],
      costFormula() {
        return 0;
      },
    },
  ],
};

export const solutionsUpgradesMap: Record<string, UpgradeAccessor> = {};

Object.entries(solutionsMetadata).forEach(([key, value]) => {
  value.forEach((solution) => {
    solutionsUpgradesMap[solution.accessor] = key as UpgradeAccessor;
  });
});
