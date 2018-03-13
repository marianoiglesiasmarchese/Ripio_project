import { Operation } from './operation.model';
import { User } from './user.model';

export class Transaction {
    id: String;
    origin_user: User;
    target_user: User;
    operation: Operation;
  }
