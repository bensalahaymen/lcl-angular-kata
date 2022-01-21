import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CompanyRoutingModule} from './company-routing.module';
import {CompaniesListComponent} from "./companies-list/companies-list.component";
import {CompanyCreationComponent} from "./company-creation/company-creation.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    CompaniesListComponent,
    CompanyCreationComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule {
}
