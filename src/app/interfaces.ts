export interface CustomerTable {
  name: string;
  contactPerson: string;
  location: string;
  currency: string;
  email: [string];
  createdAt?: string;
  phoneNumber: [string];
}
