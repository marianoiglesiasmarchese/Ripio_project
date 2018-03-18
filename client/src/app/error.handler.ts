import { ErrorHandler, Injectable, Injector, destroyPlatform, forwardRef, Inject } from '@angular/core';
import { AlertService } from './service/alert.service';
// import { AuthService } from './service/auth.service';

@Injectable()
export class LocalErrorHandler extends ErrorHandler {

    constructor(@Inject(forwardRef(() => Injector)) private injector: Injector) {
        super();
      }

    public handleError(theError: any): void {
        const alertService = this.injector.get(AlertService);
        let error = theError;
        if (error.rejection) {
            error = error.rejection;
        }
       // if (error.status === 400) {
         // alertService.error('Error inesperado');
        if (error.status) {
          if (error.json().what) {
             alertService.error('Error: ' + error.json().what + '.\n Hora: ' + error.json().when);
          } else if (error.json().error_description) {
            alertService.error('Error: ' + error.json().error_description);
          }

        } else {
          alertService.error(error.message);
        }
    }
}
