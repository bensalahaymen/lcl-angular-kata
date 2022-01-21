import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompaniesListComponent} from './companies-list.component';
import {CompaniesService} from "../services/companies.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CompaniesSharedService} from "../services/companies-shared.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {ToastrService} from "ngx-toastr";

describe('CompaniesListComponent', () => {
  let component: CompaniesListComponent;
  let fixture: ComponentFixture<CompaniesListComponent>;
  let companiesServiceSpy: jasmine.SpyObj<CompaniesService>;
  let companiesSharedServiceSpy: jasmine.SpyObj<CompaniesSharedService>;
  let modalServiceSpy: jasmine.SpyObj<BsModalService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    companiesServiceSpy = jasmine.createSpyObj('CompaniesService', ['importDataFromExcelFile']);
    modalServiceSpy = jasmine.createSpyObj('BsModalService', ['show']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    companiesSharedServiceSpy = jasmine.createSpyObj('CompaniesSharedService', ['setCompaniesList', 'getCompaniesList']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    companiesSharedServiceSpy.getCompaniesList.and.returnValue(of([]))
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaniesListComponent],
      providers: [
        FormBuilder,
        {provide: CompaniesService, useValue: companiesServiceSpy},
        {provide: BsModalService, useValue: modalServiceSpy},
        {provide: CompaniesSharedService, useValue: companiesSharedServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesListComponent);
    component = fixture.componentInstance;
    component.importCompanies = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#createNewCompany should redirect to create', () => {
    component.createNewCompany();
  });

  it('should call to openDeleteCompanyModal with success', () => {
    const modalMock = new BsModalRef();
    modalMock.content = {
      actionConfirmed: of(true)
    };
    modalServiceSpy.show.and.returnValue(modalMock);
    component.openDeleteCompanyModal({});
    expect(modalServiceSpy.show).toHaveBeenCalled();
  });
});
