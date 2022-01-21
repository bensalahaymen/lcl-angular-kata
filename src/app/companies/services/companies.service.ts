import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor() {
  }

  public importDataFromExcelFile(fileContent: string): XLSX.AOA2SheetOpts {

    const wb: XLSX.WorkBook = XLSX.read(fileContent, {type: 'binary'});
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    return <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, {header: 1}));
  }
}
