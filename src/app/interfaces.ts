export interface CustomerTable {
  name: string;
  contactPerson: [ContactsInterface];
  location: string;
  currency: string;
  email: [string];
  createdAt?: string;
  phoneNumber: [string];
  taxation: string;
  state: string;
  area: string;
  pinCode: string;
}

export interface ContactsInterface {
  name: string;
  email: [string];
  phoneNumber: [string];
  employedWith: string;
  positionInOrg: string;
  note: string;
}

export interface QuotationForm {
  quotationNo: string;
  companyId: string;
  projectDescription: string;
  currency: string;
  ratePerHour: string;
  estimatedHours: string;
  estimateDate: string;
  expiryDate: string;
  createdAt?: string;
}