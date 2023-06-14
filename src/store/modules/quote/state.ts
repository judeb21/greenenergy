import { LGA, NigerianState, Status } from "@/types";
import { QuoteRequestResponse } from "@/views/Quote/types";
import {
  ProductsResponse,
  QuoteResponseRequest,
} from "@/views/Dashboard/types";

//declare state
export type QuoteStates = {
  status: Status;
  quoteError: string;
  createdQuote: QuoteRequestResponse;
  quoteResponse: QuoteResponseRequest;
  productsResponse: Array<ProductsResponse>;
  nigerianStates: Array<NigerianState>;
  lga: Array<LGA>;
};

//set state
export const quoteState: QuoteStates = {
  status: Status.NORMAL,
  quoteError: "",
  createdQuote: {
    status: false,
    message: "",
    data: {
      createdBy: "",
      dateCreated: "2023-05-30T15:53:40.844Z",
      modifiedBy: "",
      dateModified: "2023-05-30T15:53:40.844Z",
      deletedBy: "",
      dateDeleted: "2023-05-30T15:53:40.844Z",
      id: "",
      tenantId: "",
      userId: "",
      address: "",
      landmark: "",
      noOfTv: 0,
      noOfFan: 0,
      buildingType: 0,
      noOfBedrooms: 0,
      noOfLights: 0,
      includeRefrigeratorEquiptment: true,
      includeFreezerEquiptment: true,
      includeAirConditionEquiptment: true,
      includeOtherEquiptment: true,
      inverterUsageHoursPerDay: 0,
      hoursOfElectricPowerPerDay: 0,
      hasGenerator: true,
      generatorCapacity: 0,
      havePreferredLocation: true,
      preferredLocationDescription: "",
      addressRequiresAccessCode: true,
      accessCodeContactPersonName: "",
      accessCodeContactPersonPhone: "",
      turnAroundTime: "",
      quoteRequestStatus: 0,
      referenceNo: "",
    },
  },
  quoteResponse: {
    status: false,
    message: "",
    quoteRequest: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      userId: "",
      address: "",
      landmark: "",
      noOfBedrooms: 0,
      noOfLights: 0,
      noOfFan: 0,
      noOfTv: 0,
      buildingType: 0,
      includeRefrigeratorEquiptment: false,
      includeFreezerEquiptment: false,
      includeAirConditionEquiptment: false,
      includeOtherEquiptment: false,
      inverterUsageHoursPerDay: 0,
      hoursOfElectricPowerPerDay: 0,
      hasGenerator: false,
      generatorCapacity: 0,
      havePreferredLocation: false,
      preferredLocationDescription: "",
      addressRequiresAccessCode: false,
      accessCodeContactPersonName: "",
      accessCodeContactPersonPhone: "",
      turnAroundTime: "",
      quoteRequestStatus: 0,
      generatorCapacityOthers: "",
    },
    quote: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      userId: "",
      quoteRequestId: "",
      yourContribution: 0,
      totalAssetAmount: 0,
      contributionPercentage: 0,
      repaymentAmount: 0,
      durationMonths: 0,
      updateCount: 0,
      rerefenceNumber: "",
      turnAroundTime: "",
      quoteStatus: 0,
      equity: 0,
      hasPaidEquity: false,
      fulfilmentDateConfirmed: false,
      fulfilmentDate: "",
      fulfilmentPersonnelId: "",
      preferredPaymentType: 0,
    },
    changeLog: [
      {
        changeDate: "",
        changeLog: [
          {
            name: "",
            value: "",
          },
        ],
      },
    ],
    quoteRequestProduct: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      quoteRequestId: "",
      productId: "",
      name: "",
      description: "",
      supplierId: "",
      supplierName: "",
      warrantyPeriod: 0,
      productCategoryId: "",
      productCategoryName: "",
    },
    quoteRequestProductComponents: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      quoteRequestProductId: "",
      productComponentId: "",
      name: "",
      specification: "",
      imageUrl: "",
      quantity: 0,
      price: 0,
    },
  },
  productsResponse: [],
  nigerianStates: [],
  lga: [],
};

class QuoteState implements QuoteStates {
  public status = Status.NORMAL;

  public quoteError = "";

  public createdQuote: QuoteRequestResponse = {
    status: false,
    message: "",
    data: {
      createdBy: "",
      dateCreated: "2023-05-30T15:53:40.844Z",
      modifiedBy: "",
      dateModified: "2023-05-30T15:53:40.844Z",
      deletedBy: "",
      dateDeleted: "2023-05-30T15:53:40.844Z",
      id: "",
      tenantId: "",
      userId: "",
      address: "",
      landmark: "",
      noOfTv: 0,
      noOfFan: 0,
      buildingType: 0,
      noOfBedrooms: 0,
      noOfLights: 0,
      includeRefrigeratorEquiptment: true,
      includeFreezerEquiptment: true,
      includeAirConditionEquiptment: true,
      includeOtherEquiptment: true,
      inverterUsageHoursPerDay: 0,
      hoursOfElectricPowerPerDay: 0,
      hasGenerator: true,
      generatorCapacity: 0,
      havePreferredLocation: true,
      preferredLocationDescription: "",
      addressRequiresAccessCode: true,
      accessCodeContactPersonName: "",
      accessCodeContactPersonPhone: "",
      turnAroundTime: "",
      quoteRequestStatus: 0,
      referenceNo: "",
    },
  };

  public quoteResponse: QuoteResponseRequest = {
    status: false,
    message: "",
    quoteRequest: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      userId: "",
      address: "",
      landmark: "",
      noOfBedrooms: 0,
      noOfLights: 0,
      noOfFan: 0,
      noOfTv: 0,
      buildingType: 0,
      includeRefrigeratorEquiptment: false,
      includeFreezerEquiptment: false,
      includeAirConditionEquiptment: false,
      includeOtherEquiptment: false,
      inverterUsageHoursPerDay: 0,
      hoursOfElectricPowerPerDay: 0,
      hasGenerator: false,
      generatorCapacity: 0,
      havePreferredLocation: false,
      preferredLocationDescription: "",
      addressRequiresAccessCode: false,
      accessCodeContactPersonName: "",
      accessCodeContactPersonPhone: "",
      turnAroundTime: "",
      quoteRequestStatus: 0,
      generatorCapacityOthers: "",
    },
    quote: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      userId: "",
      quoteRequestId: "",
      yourContribution: 0,
      totalAssetAmount: 0,
      contributionPercentage: 0,
      repaymentAmount: 0,
      durationMonths: 0,
      updateCount: 0,
      rerefenceNumber: "",
      turnAroundTime: "",
      quoteStatus: 0,
      equity: 0,
      hasPaidEquity: false,
      fulfilmentDateConfirmed: false,
      fulfilmentDate: "",
      fulfilmentPersonnelId: "",
      preferredPaymentType: 0,
    },
    changeLog: [
      {
        changeDate: "",
        changeLog: [
          {
            name: "",
            value: "",
          },
        ],
      },
    ],
    quoteRequestProduct: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      quoteRequestId: "",
      productId: "",
      name: "",
      description: "",
      supplierId: "",
      supplierName: "",
      warrantyPeriod: 0,
      productCategoryId: "",
      productCategoryName: "",
    },
    quoteRequestProductComponents: {
      createdBy: "",
      dateCreated: "",
      modifiedBy: "",
      dateModified: "",
      deletedBy: "",
      dateDeleted: "",
      id: "",
      tenantId: "",
      quoteRequestProductId: "",
      productComponentId: "",
      name: "",
      specification: "",
      imageUrl: "",
      quantity: 0,
      price: 0,
    },
  };

  public productsResponse: Array<ProductsResponse> = [];

  public nigerianStates: Array<NigerianState> = [];

  public lga: Array<LGA> = [];
}

export default QuoteState;
