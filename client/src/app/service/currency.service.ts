import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from '..//model/user.model';
import 'rxjs/add/operator/toPromise';
import { Currency } from '../model/currency.model';

@Injectable()
export class CurrencyService {
  private currencyUrl = '/ripio_app/currencies';

  constructor(private http: HttpClient) { }

  getCurrencies(): Promise<Currency[]> {
    return this.http.get(`${this.currencyUrl}`)
         .toPromise()
         .then(response => response as Currency[])
         .catch(this.handleError);
  }

   getCurrency(currencyName: string): Promise<Currency> {
    return this.http.get(`${this.currencyUrl}/${currencyName}`)
         .toPromise()
         .then(response => response as Currency)
         .catch(this.handleError);
  }

   updateCurrency(currency: Currency): Promise<Currency> {
     const currencyOid: String = currency.id;
     return this.http.put(`${this.currencyUrl}/${currencyOid}`, currency)
          .toPromise()
          .then(response => response as Currency)
          .catch(this.handleError);

   }

   saveCurrency(currency: Currency): Promise<Currency> {
    return this.http.post(`${this.currencyUrl}`, currency)
         .toPromise()
         .then(response => response as Currency)
         .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

}
