import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-alert-warning',
  templateUrl: './alert-warning.component.html',
  styleUrls: ['./alert-warning.component.scss']
})
export class AlertWarningComponent implements OnChanges {

  @Input() text!: string;

  constructor() { }

  ngOnChanges(): void {
    
  }

}
