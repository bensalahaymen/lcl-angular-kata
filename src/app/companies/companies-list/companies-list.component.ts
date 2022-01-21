import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from "../models/company.model";
import {CompaniesService} from "../services/companies.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {requiredFileType} from "../../shared/validators/required-file-type.validator";
import {ModalConfirmComponent} from "../../shared/components/modal-confirm/modal-confirm.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {Subscription} from "rxjs";
import {CompaniesSharedService} from "../services/companies-shared.service";
import {Router} from "@angular/router";
import {DataUtilsService} from "../../shared/utils/data-utils.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit, OnDestroy {

  @ViewChild('inputFile')
  inputFileVariable: ElementRef;

  importCompanies: CompanyModel[] = [];
  isListEmpty: boolean = true;

  importExelFile: FormGroup;

  static readonly DOLLAR = 'USD';

  private subscriptions: Subscription[] = [];

  constructor(private companiesService: CompaniesService,
              private fb: FormBuilder,
              public router: Router,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private companiesSharedService: CompaniesSharedService,
              private dataUtilsService: DataUtilsService) {
    this.importExelFile = this.fb.group({
        excelFileName: [null, [requiredFileType('xlsx')]]
      }
    );
  }

  ngOnInit(): void {
    this.isListEmpty = true;
    this.subscriptions.push(this.companiesSharedService.getCompaniesList().subscribe(
      (res: any) => {
        if (res && res.length > 0) {
          this.importCompanies = this.dataUtilsService.sortDescendingArray(res);
          this.isListEmpty = false;
        }
      }
    ))
  }

  onFileChange(evt: any) {
    // @ts-ignore
    this.importExelFile.get('excelFileName').setValue(evt.target.files[0].name)
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    // @ts-ignore
    if (this.importExelFile.get('excelFileName').errors?.requiredFileType) {
      this.toastr.error('Please check file extension', 'Import Data failed', {positionClass: 'toast-bottom-right'});
      this.inputFileVariable.nativeElement.value = "";
      throw new Error('File extension must be xlsx');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const content: string = e.target.result;

      const data = <any[]>this.companiesService.importDataFromExcelFile(content);

      const header: string[] = Object.getOwnPropertyNames(new CompanyModel({}));

      const importedData = data.slice(1, -1);

      this.importCompanies = this.dataUtilsService.sortDescendingArray(this.importCompanies.concat(importedData.map(data => {
        const obj: any = {};
        for (let step = 0; step < header.length; step++) {
          const headerName = header[step];
          obj[headerName] = data[step];
          this.isListEmpty = false;
        }
        return <CompanyModel>obj;
      }))).filter((value, index, companyArray) =>
        index === companyArray.findIndex((company) => (company.companyName === value.companyName))
      );

    };
    this.toastr.success('Data imported from ' + evt.target.files[0].name + ' with success', 'Import Excel File', {positionClass: 'toast-bottom-right'});
    reader.readAsBinaryString(target.files[0]);
    this.inputFileVariable.nativeElement.value = "";
    this.importExelFile.reset();
  }

  openDeleteCompanyModal(company: any): void {
    const initialState = {message: 'Are you sure you want to delete ' + company.companyName + ' ?'};
    const modalRef = this.modalService.show(ModalConfirmComponent, {class: 'modal-lg', initialState});
    // @ts-ignore
    this.subscriptions.push(modalRef.content.actionConfirmed.subscribe(
      () => {
        this.deleteCompany(company);
      }
    ));
  }


  createNewCompany(): void {
    this.companiesSharedService.setCompaniesList(this.importCompanies);
    this.router.navigate(['/companies/create']);
  }

  private deleteCompany(company: any): void {
    const index = this.importCompanies.indexOf(company, 0);
    if (index > -1) {
      this.importCompanies.splice(index, 1);
    }
  }


  formatNumber(number: number): string {
    return this.dataUtilsService.formatNumberWithCurrency(number, CompaniesListComponent.DOLLAR);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
