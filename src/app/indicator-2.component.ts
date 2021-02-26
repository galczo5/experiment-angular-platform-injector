import {Component, Inject, OnInit, Optional} from '@angular/core';
import { COMPONENT_TOKEN, TOKEN } from './token';

@Component({
  selector: 'app-indicator-2',
  template: `
    <button class="btn btn-lg" [class.btn-success]="!!value" [class.btn-danger]="!value">
      <ng-container *ngIf="!!value">
        <i class="fas fa-check mr-1"></i>
        Value provided
      </ng-container>
      <ng-container *ngIf="!value">
        <i class="fas fa-times mr-1"></i>
        Value not provided
      </ng-container>
    </button>
  `
})
export class IndicatorComponent2 {

  constructor(@Optional() @Inject(COMPONENT_TOKEN) readonly value: string) { }

}
