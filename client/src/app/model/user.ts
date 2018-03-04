import { Account } from './account';
import { Transaction } from './transaction';

export class User {
    id: String;
    name: String;
    email: String;
    accounts: Account[];
    emmited_transactions: Transaction[];  
  }
  