import {Injectable} from '@angular/core';
import {CompanyModel} from "../../companies/models/company.model";

@Injectable({
  providedIn: 'root'
})
export class DataUtilsService {

  constructor() {
  }

  formatNumberWithCurrency(number: number, currency: string) {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: currency}).format(number);
  }

  sortDescendingArray(array: CompanyModel[]) {
    return array.sort((firstCompany: CompanyModel, nextCompany: CompanyModel) => (firstCompany.revenues > nextCompany.revenues ? -1 : 1));
  }
}
