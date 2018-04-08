import { Currency } from './currency.model';
import { Account } from './account.model';
import { Transaction } from './transaction.model';

export class Operation {
    id: String;
    amount: Number;
    date: Date;
    origin_account: Account;
    target_account: Account;
    // transaction: Transaction;
  }
