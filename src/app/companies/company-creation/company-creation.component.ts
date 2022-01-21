import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompaniesSharedService} from "../services/companies-shared.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {regex} from "../../shared/regex/form.regex";
import {CompanyModel} from "../models/company.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-company-creation',
  templateUrl: './company-creation.component.html',
  styleUrls: ['./company-creation.component.scss']
})
export class CompanyCreationComponent implements OnInit, OnDestroy {

  importCompanies: CompanyModel[] = [];

  createCompanyForm: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              public router: Router,
              private toastr: ToastrService,
              private companiesSharedService: CompaniesSharedService) {
    this.createCompanyForm = this.fb.group({
      companyName: [null, [Validators.required, Validators.maxLength(20)]],
      employeesNumber: [null, [Validators.required, Validators.pattern(regex.numberFormat), Validators.maxLength(10)]],
      revenues: [null, [Validators.required, Validators.pattern(regex.numberFormat), Validators.maxLength(8)]],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.companiesSharedService.getCompaniesList().subscribe(
      (res: any) => {
        if (res) {
          this.importCompanies = res;
        }
      }
    ))
  }

  createCompanyFormSubmit() {
    if (this.importCompanies.find(company => company.companyName === this.createCompanyForm.get('companyName').value)) {
      this.toastr.error('Your company with name ' + this.createCompanyForm.get('companyName').value + ' already exists', 'Duplicate Company', {positionClass: 'toast-bottom-right'});
    } else {
      this.importCompanies.push(new CompanyModel(this.createCompanyForm.value));
      this.companiesSharedService.setCompaniesList(this.importCompanies);
      this.toastr.success('Your company with name ' + this.createCompanyForm.get('companyName').value + ' created', 'Add Company', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['/companies']);
    }

  }

  resetCompanyForm() {
    this.createCompanyForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
