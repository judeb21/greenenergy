export interface QuoteRequest {
  address: string;
  landmark: string;
  noOfBedrooms: number;
  noOfLights: number;
  noOfFan: number;
  noOfTv: number;
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
  createdBy?: string;
  dateCreated?: string;
  modifiedBy: string;
  dateModified: string;
  deletedBy: string;
  dateDeleted: string;
  id: string;
  tenantId: string;
  userId: string;
  quoteRequestStatus: number;
}

export interface Quote {
  createdBy?: string;
  dateCreated?: string;
  modifiedBy?: string;
  dateModified?: string;
  deletedBy?: string;
  dateDeleted?: string;
  id: string;
  tenantId: string;
  userId: string;
  quoteRequestId: string;
  yourContribution: number;
  totalAssetAmount: number;
  contributionPercentage: number;
  repaymentAmount: number;
  durationMonths: number;
  updateCount: number;
  rerefenceNumber: string;
  turnAroundTime: string;
  quoteStatus: number;
  equity: number;
  hasPaidEquity: boolean;
  fulfilmentDateConfirmed: boolean;
  fulfilmentDate: string;
  fulfilmentPersonnelId: string;
  preferredPaymentType: number;
}

export interface ChangeLog {
  changeDate: string;
  changeLog: [
    {
      name: string;
      value: string;
    }
  ];
}

export interface QuoteRequestProduct {
  createdBy: string;
  dateCreated: string;
  modifiedBy: string;
  dateModified: string;
  deletedBy: string;
  dateDeleted: string;
  id: string;
  productId: string;
  tenantId: string;
  quoteRequestId: string;
  name: string;
  description: string;
  supplierId: string;
  supplierName: string;
  warrantyPeriod: number;
  productCategoryId: string;
  productCategoryName: string;
}

export interface QuoteRequestProductComponents {
  createdBy: string;
  dateCreated: string;
  modifiedBy: string;
  dateModified: string;
  deletedBy: string;
  dateDeleted: string;
  id: string;
  tenantId: string;
  quoteRequestProductId: string;
  productComponentId: string;
  name: string;
  specification: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface QuoteResponseRequest {
  status: boolean;
  message: string;
  quoteRequest: QuoteRequest;
  quote: Quote;
  changeLog: Array<ChangeLog>;
  quoteRequestProduct: QuoteRequestProduct;
  quoteRequestProductComponents: QuoteRequestProductComponents;
}

export interface ProductsResponse {
  createdBy: string;
  dateCreated: string;
  modifiedBy: string;
  dateModified: string;
  deletedBy: string;
  dateDeleted: string;
  id: string;
  tenantId: string;
  supplierId: string;
  name: string;
  description: string;
  warrantyPeriod: number;
  productCategoryId: string;
  price: number;
  monthlyRepayment: number;
  initialPayment: number;
}
