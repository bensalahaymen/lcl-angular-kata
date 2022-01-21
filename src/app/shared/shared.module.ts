import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormFeedbackComponent} from './components/form-feedback/form-feedback.component';
import {ModalConfirmComponent} from "./components/modal-confirm/modal-confirm.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {NoDataComponent} from "./components/no-data/no-data.component";
import {PageTitleComponent} from "./components/page-title/page-title.component";


@NgModule({
  declarations: [
    FormFeedbackComponent,
    ModalConfirmComponent,
    NoDataComponent,
    PageTitleComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormFeedbackComponent,
    NoDataComponent,
    PageTitleComponent,
  ],
  providers: [],
  entryComponents: [ModalConfirmComponent]
})
export class SharedModule {
}
