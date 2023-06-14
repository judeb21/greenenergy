export interface HouseRequest {
  address: string;
  landmark: string;
  buildingType: number;
  state: string;
  city: string;
}

export interface PowerRequest {
  noOfBedrooms: number;
  noOfLights: number;
  noOfFan: number;
  noOfTv: number;
  generatorCapacityOthers: string;
  includeRefrigeratorEquiptment: boolean;
  includeFreezerEquiptment: boolean;
  includeAirConditionEquiptment: boolean;
  includeOtherEquiptment: boolean;
  inverterUsageHoursPerDay: number;
  hoursOfElectricPowerPerDay: number;
  hasGenerator?: boolean;
  generatorCapacity: number;
  havePreferredLocation?: boolean;
  preferredLocationDescription?: string;
  addressRequiresAccessCode?: boolean;
  accessCodeContactPersonName?: string;
  accessCodeContactPersonPhone?: string;
  turnAroundTime?: string;
}

export interface QuoteRequest {
  address: string;
  landmark: string;
  state?: string;
  city?: string;
  noOfBedrooms: number;
  noOfLights: number;
  noOfFan: number;
  noOfTv: number;
  productId?: string;
  buildingType: number;
  includeRefrigeratorEquiptment: boolean;
  generatorCapacityOthers: string;
  includeFreezerEquiptment: boolean;
  includeAirConditionEquiptment: boolean;
  includeOtherEquiptment: boolean;
  inverterUsageHoursPerDay: number;
  hoursOfElectricPowerPerDay: number;
  hasGenerator: boolean;
  generatorCapacity: number;
  havePreferredLocation: boolean;
  preferredLocationDescription: string;
  addressRequiresAccessCode: boolean;
  accessCodeContactPersonName: string;
  accessCodeContactPersonPhone: string;
  turnAroundTime?: string;
}

export enum QuoteStatus {
  Draft = "Draft",
  Pending = "Pending",
  Processing = "Processing",
  Changed = "Changed",
  Approved = "Approved",
}

export interface QuoteRequestResponse {
  status: boolean;
  message: string;
  data: {
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
    deletedBy: string;
    dateDeleted: string;
    id: string;
    tenantId: string;
    userId: string;
    address: string;
    landmark: string;
    noOfBedrooms: number;
    noOfLights: number;
    noOfFan: number;
    noOfTv: number;
    buildingType: number;
    includeRefrigeratorEquiptment: boolean;
    includeFreezerEquiptment: boolean;
    includeAirConditionEquiptment: boolean;
    includeOtherEquiptment: boolean;
    inverterUsageHoursPerDay: number;
    hoursOfElectricPowerPerDay: number;
    hasGenerator: boolean;
    generatorCapacity: number;
    havePreferredLocation: boolean;
    preferredLocationDescription: string;
    addressRequiresAccessCode: boolean;
    accessCodeContactPersonName: string;
    accessCodeContactPersonPhone: string;
    turnAroundTime: string;
    quoteRequestStatus: number;
    referenceNo: string;
  };
}

export const BuildingTypeEnum = {
  Story: "Story building",
  Bungalow: "Bungalow",
  Flat: "Block of flats",
};

export const GeneratorCapacityEnum = {
  NOKVA: "I do not have one",
  OKVA: "1 KVA",
  TKVA: "2 KVA",
  FKVA: "5 KVA",
  MTFKVA: "> 5KVA",
  OTHERS: "Others",
};

export const SelectablePackages = [
  {
    name: "Basic plan",
    amount: "#69,263",
    contribution: "Per month/12 months",
  },
  {
    name: "Pro plan",
    amount: "#139,263",
    contribution: "Per month/6 months",
  },
  {
    name: "Premium plan",
    amount: "#869,263",
    contribution: "Full payment",
  },
];

export interface QuoteProductRequest {
  address: string;
  landmark: string;
  state?: string;
  city?: string;
  productId: string;
  buldingType: number;
}
