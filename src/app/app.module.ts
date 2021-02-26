import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndicatorComponent } from './indicator.component';
import { IndicatorComponent2 } from 'src/app/indicator-2.component';

@NgModule({
  declarations: [
    AppComponent,
    IndicatorComponent,
    IndicatorComponent2
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
