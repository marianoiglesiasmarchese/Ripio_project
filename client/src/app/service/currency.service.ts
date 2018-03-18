import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { User } from '..//model/user.model';
import { Currency } from '../model/currency.model';

import { LoaderService } from '../service/loader.service';

@Injectable()
export class CurrencyService {
  private currencyUrl = '/ripio_app/currencies';

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  getCurrencies(): Promise<Currency[]> {
    this.loaderService.show();
    return this.http.get(`${this.currencyUrl}`)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as Currency[];
         })
         .catch(this.handleError);
  }

   getCurrency(currencyName: string): Promise<Currency> {
    this.loaderService.show();
    return this.http.get(`${this.currencyUrl}/${currencyName}`)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as Currency;
         })
         .catch(this.handleError);
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
        .catch(this.handleError);

   }

   saveCurrency(currency: Currency): Promise<Currency> {
    this.loaderService.show();
    return this.http.post(`${this.currencyUrl}`, currency)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as Currency;
         })
         .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

}
