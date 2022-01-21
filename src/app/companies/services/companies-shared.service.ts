import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CompanyModel} from "../models/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompaniesSharedService {
  // @ts-ignore
  private listOfCompanies = new BehaviorSubject<CompanyModel[]>(null);

  constructor() {
  }

  public setCompaniesList(companies: CompanyModel[]) {
    this.listOfCompanies.next(companies);
  }

  public getCompaniesList(): Observable<CompanyModel[]> {
    return this.listOfCompanies.asObservable();
  }
}
