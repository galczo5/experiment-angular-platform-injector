import {Component, Injector, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

const key = 'provided';

@Component({
  selector: 'app-root',
  template: `
    <div class="d-flex align-items-center">
      <button class="btn btn-lg btn-primary" (click)="provide()">Provide value</button>
      <app-indicator class="ml-3"></app-indicator>
    </div>
    <i class="text-muted mt-3 d-block" *ngIf="needRefresh">Refresh to reload platform, refresh in {{ refreshIn }}s</i>
  `
})
export class AppComponent implements OnInit {

  provided: boolean;
  needRefresh = false;
  refreshIn = 3;

  constructor(private readonly injector: Injector) {
    console.log(injector);
  }

  ngOnInit(): void {
    this.provided = !!localStorage.getItem(key);
  }

  provide(): void {

    if (this.needRefresh) {
      return;
    }

    this.needRefresh = true;

    const item = localStorage.getItem(key);

    if (item) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, 'true');
    }

    interval(1000)
      .pipe(take(3))
      .subscribe(() => {
        this.refreshIn = this.refreshIn - 1;
        if (this.refreshIn === 0) {
          window.location.reload();
        }
      });
  }

}
