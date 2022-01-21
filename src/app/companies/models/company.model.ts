export class CompanyModel {
  companyName: string | undefined;
  employeesNumber: number | undefined;
  revenues: number | undefined;

  constructor(object?: any) {
    if (object) {
      this.companyName = object.companyName;
      this.employeesNumber = object.employeesNumber;
      this.revenues = object.revenues;
    }
  }
}
