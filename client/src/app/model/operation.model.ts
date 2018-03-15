import { Currency } from './currency.model';

export class Operation {
    id: String;
    amount: Number;
    type: String;
    date: Date;
    currency: Currency;
  }
