import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';

import {ModalConfirmComponent} from './modal-confirm.component';

describe('ModalConfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;

  let modalRefSpy: jasmine.SpyObj<BsModalRef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfirmComponent],
      providers: [
        FormBuilder,
        {provide: BsModalRef, useValue: modalRefSpy}
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
