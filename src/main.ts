import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ErrorCatchingInterceptor } from './app/interceptors/error-catching.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        ToastrModule.forRoot({
          timeOut: 1000,
          positionClass: "toast-top-right",
          closeButton: true,
          progressBar: true,
        }), BrowserAnimationsModule
      ),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorCatchingInterceptor,
        multi: true
    },
    {
      provide: APP_BASE_HREF, useValue: environment.BASE_URL
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
]
})
  .catch(err => console.error(err));
