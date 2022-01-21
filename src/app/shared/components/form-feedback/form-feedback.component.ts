import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrls: ['./form-feedback.component.scss']
})
export class FormFeedbackComponent implements OnInit {
  @Input() message: string = "";

  constructor() {
  }

  ngOnInit() {
  }

}
