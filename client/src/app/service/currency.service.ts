import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { User } from '..//model/user.model';
import { Currency } from '../model/currency.model';

import { LoaderService } from '../service/loader.service';
import { AlertService } from '../service/alert.service';

@Injectable()
export class CurrencyService {
  private currencyUrl = '/ripio_app/currencies';

  constructor(private http: HttpClient, private loaderService: LoaderService, private alertService: AlertService) { }

  getCurrencies(): Promise<Currency[]> {
    this.loaderService.show();
    return this.http.get(`${this.currencyUrl}`)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as Currency[];
         })
         .catch(err => this.handleError(err));
  }

   getCurrency(currencyName: string): Promise<Currency> {
    this.loaderService.show();
    return this.http.get(`${this.currencyUrl}/${currencyName}`)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as Currency;
         })
         .catch(err => this.handleError(err));
  }

   updateCurrency(currency: Currency): Promise<Currency> {
    this.loaderService.show();
    const currencyOid: String = currency.id;
    return this.http.put(`${this.currencyUrl}/${currencyOid}`, currency)
        .toPromise()
        .then(response => {
          this.loaderService.hide();
          return response as Currency;
         })
        .catch(err => this.handleError(err));

   }

   saveCurrency(currency: Currency): Promise<Currency> {
    this.loaderService.show();
    return this.http.post(`${this.currencyUrl}`, currency)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as Currency;
         })
         .catch(err => this.handleError(err));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    setInterval(() => {
      this.loaderService.hide();
      this.alertService.error('An error occurred(' + error.status + ') : ' + error.statusText);
    }, 3000);
    return Promise.reject(error);
  }

}
