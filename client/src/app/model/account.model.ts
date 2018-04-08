import { Currency } from './currency.model';
import { Transaction } from './transaction.model';

export class Account {
    id: String;
    name: String;
    amount: Number;
    currency: Currency;
    enable: Boolean;
    // transactions: Transaction[];
  }
