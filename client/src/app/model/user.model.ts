import { Account } from './account.model';
import { Transaction } from './transaction.model';

export class User {
    id: String;
    name: String;
    email: String;
    enable: Boolean;
    accounts: Account[];
    emmited_transactions: Transaction[];
  }
