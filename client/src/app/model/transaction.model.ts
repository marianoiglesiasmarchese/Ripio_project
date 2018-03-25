import { Operation } from './operation.model';
import { User } from './user.model';

export class Transaction {
    id: String;
    user: User;
    operation: Operation;
    type: String;
  }
