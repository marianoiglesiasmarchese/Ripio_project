import { Account } from './account.model';

export class User {
    id: String;
    name: String;
    email: String;
    enable: Boolean;
    accounts: Account[];
  }
