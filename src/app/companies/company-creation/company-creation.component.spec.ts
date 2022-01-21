import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompanyCreationComponent} from './company-creation.component';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CompaniesSharedService} from "../services/companies-shared.service";
import {of} from "rxjs";
import {FormBuilder} from "@angular/forms";

describe('CompanyCreationComponent', () => {
  let component: CompanyCreationComponent;
  let fixture: ComponentFixture<CompanyCreationComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let companiesSharedServiceSpy: jasmine.SpyObj<CompaniesSharedService>;

  beforeEach(() => {
    companiesSharedServiceSpy = jasmine.createSpyObj('CompaniesSharedService', ['setCompaniesList', 'getCompaniesList']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    companiesSharedServiceSpy.getCompaniesList.and.returnValue(of([]))
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyCreationComponent],
      providers: [
        FormBuilder,
        {provide: CompaniesSharedService, useValue: companiesSharedServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ToastrService, useValue: toastrServiceSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    component.importCompanies = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.createCompanyForm.valid).toBeFalsy();
  });

  it('companyName field validity', () => {
    let errors: {};
    let companyName = component.createCompanyForm.controls.companyName;
    expect(companyName.valid).toBeFalsy();

    errors = companyName.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeTruthy();

    companyName.setValue("teeeeeeeeeeeeeeeeeeeeeestè-('");
    errors = companyName.errors || {};

    // @ts-ignore
    expect(errors['required']).toBeFalsy();

    companyName.setValue("test");
    errors = companyName.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeFalsy();

    // @ts-ignore
    expect(errors['maxLength']).toBeFalsy();
  });

  it('employeesNumber field validity', () => {
    let errors: {};
    let employeesNumber = component.createCompanyForm.controls['employeesNumber'];
    expect(employeesNumber.valid).toBeFalsy();

    errors = employeesNumber.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeTruthy();

    employeesNumber.setValue("12aaaaaaaaaaaaa");
    errors = employeesNumber.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeFalsy();
    // @ts-ignore
    expect(errors['pattern']).toBeTruthy();

    employeesNumber.setValue(12);
    errors = employeesNumber.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeFalsy();

    // @ts-ignore
    expect(errors['pattern']).toBeFalsy();

    // @ts-ignore
    expect(errors['maxLength']).toBeFalsy();
  });

  it('revenues field validity', () => {
    let errors: {};
    let revenues = component.createCompanyForm.controls['revenues'];
    expect(revenues.valid).toBeFalsy();

    errors = revenues.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeTruthy();

    revenues.setValue("50aaaaaaaa");
    errors = revenues.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeFalsy();
    // @ts-ignore
    expect(errors['pattern']).toBeTruthy();

    revenues.setValue(50000);
    errors = revenues.errors || {};
    // @ts-ignore
    expect(errors['required']).toBeFalsy();

    // @ts-ignore
    expect(errors['pattern']).toBeFalsy();

    // @ts-ignore
    expect(errors['maxLength']).toBeFalsy();
  });

  it('submitting company', () => {
    expect(component.createCompanyForm.valid).toBeFalsy();
    component.createCompanyForm.controls['companyName'].setValue("test");
    component.createCompanyForm.controls['employeesNumber'].setValue(12);
    component.createCompanyForm.controls['revenues'].setValue(500000);
    expect(component.createCompanyForm.valid).toBeTruthy();

    component.createCompanyFormSubmit();

    expect(component.importCompanies[0].companyName).toBe("test");
    expect(component.importCompanies[0].employeesNumber).toBe(12);
    expect(component.importCompanies[0].revenues).toBe(500000);
  });

  it('submitting duplicate company', () => {
    component.importCompanies = [{
      companyName: 'dummyName',
      employeesNumber: 40,
      revenues: 60000
    }]

    component.createCompanyForm.get('companyName').setValue("dummyName");
    component.createCompanyForm.get('employeesNumber').setValue(40);
    component.createCompanyForm.get('revenues').setValue(60000);

    component.createCompanyFormSubmit();

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Your company with name dummyName already exists', 'Duplicate Company', Object({positionClass: 'toast-bottom-right'}));
  });
});
