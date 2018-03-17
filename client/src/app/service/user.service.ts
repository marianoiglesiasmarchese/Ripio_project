import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { User } from '..//model/user.model';
import { Account } from '../model/account.model';
import { Operation } from '../model/operation.model';
import { Transaction } from '../model/transaction.model';

@Injectable()
export class UserService {
  private userUrl = '/ripio_app/users';

  constructor(private http: HttpClient) { }

  getUsers(): Promise<User[]> {
    return this.http.get(`${this.userUrl}`)
         .toPromise()
         .then(response => response as User[])
         .catch(this.handleError);
  }

  getUser(username: string): Promise<User> {
    return this.http.get(`${this.userUrl}/${username}`)
         .toPromise()
         .then(response => response as User)
         .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
     const userOid: String = user.id;
     return this.http.put(`${this.userUrl}/${userOid}`, user)
          .toPromise()
          .then(response => response as User)
          .catch(this.handleError);
   }

  saveUser(user: User): Promise<User> {
    return this.http.post(`${this.userUrl}`, user)
         .toPromise()
         .then(response => response as User)
         .catch(this.handleError);
  }

  getAccounts(user: User): Promise<Account[]> {
    const userOid: String = user.id;
    return this.http.get(`${this.userUrl}/${userOid}/accounts`)
         .toPromise()
         .then(
           response => response as Account[]
          )
         .catch(this.handleError);
  }

  saveAccount(user: User, account: Account): Promise<Account[]> {
    const userOid: String = user.id;
    return this.http.post(`${this.userUrl}/${userOid}/accounts`, account)
         .toPromise()
         .then(
           response => response as Account[]
          )
         .catch(this.handleError);
  }

  doTransaction(origin, target: User, operation: Operation): Promise<Transaction> {
    const originOid: String = origin.id;
    const targetOid: String = target.id;
    return this.http.post(`${this.userUrl}/${originOid}/do_transaction_to/${targetOid}`, operation)
         .toPromise()
         .then(response => response as Transaction)
         .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

}
