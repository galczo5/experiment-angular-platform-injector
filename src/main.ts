import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {PlatformProviderService} from './app/platform-provider.service';
import {TOKEN} from './app/token';

if (environment.production) {
  enableProdMode();
}

const platformRef = platformBrowserDynamic();
const item = localStorage.getItem('provided');

if (item) {
  console.log('Replace platform injector');
  const injector = PlatformProviderService.getInjector(platformRef.injector, { provide: TOKEN, useValue: 'Injected with PlatformProviderService' });

  // @ts-ignore
  platformRef._injector = injector;
}


platformRef.bootstrapModule(AppModule)
  .catch(err => console.error(err));
