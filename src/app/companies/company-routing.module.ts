import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompaniesListComponent} from "./companies-list/companies-list.component";
import {CompanyCreationComponent} from "./company-creation/company-creation.component";

const routes: Routes = [
  {
    path: '',
    component: CompaniesListComponent,
  },
  {
    path: 'create',
    component: CompanyCreationComponent,
    data: {
      breadcrumb: 'Creation'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
