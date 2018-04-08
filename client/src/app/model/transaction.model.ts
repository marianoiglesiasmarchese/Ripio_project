import { Operation } from './operation.model';
import { User } from './user.model';
import { Account } from './account.model';

export class Transaction {
    id: String;
   //  user: User;
    type: String;
    operation: Operation;
    account: Account;
  }
