import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  message: string | undefined;

  @Output() actionConfirmed = new EventEmitter<string>();
  @Output() actionCanceled = new EventEmitter();


  constructor(public modalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  confirmAction(): void {
    this.actionConfirmed.emit();
    this.modalRef.hide();
  }

  cancelAction(): void {
    this.actionCanceled.emit();
    this.modalRef.hide();
  }

}
