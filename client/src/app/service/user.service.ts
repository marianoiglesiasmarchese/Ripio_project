import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { User } from '..//model/user.model';
import { Account } from '../model/account.model';
import { Operation } from '../model/operation.model';
import { Transaction } from '../model/transaction.model';

import { LoaderService } from '../service/loader.service';
import { AlertService } from '../service/alert.service';

@Injectable()
export class UserService {
  private userUrl = '/ripio_app/users';

  constructor(private http: HttpClient, private loaderService: LoaderService, private alertService: AlertService) { }

  getUsers(): Promise<User[]> {
    this.loaderService.show();
    return this.http.get(`${this.userUrl}`)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as User[];
         })
         .catch(err => this.handleError(err));
  }

  getUser(user: User): Promise<User> {
    this.loaderService.show();
    const userOid: String = user.id;
    return this.http.get(`${this.userUrl}/${userOid}`)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as User;
         })
         .catch(err => this.handleError(err));
  }

  updateUser(user: User): Promise<User> {
    this.loaderService.show();
    const userOid: String = user.id;
    return this.http.put(`${this.userUrl}/${userOid}`, user)
        .toPromise()
        .then(response => {
          this.loaderService.hide();
          return response as User;
         })
        .catch(err => this.handleError(err));
   }

  saveUser(user: User): Promise<User> {
    this.loaderService.show();
    return this.http.post(`${this.userUrl}`, user)
         .toPromise()
         .then(response => {
          this.loaderService.hide();
          return response as User;
         })
         .catch(err => this.handleError(err));
  }

  getAccounts(user: User): Promise<Account[]> {
    this.loaderService.show();
    const userOid: String = user.id;
    return this.http.get(`${this.userUrl}/${userOid}/accounts`)
         .toPromise()
         .then(response => {
            this.loaderService.hide();
            return response as Account[];
           })
         .catch(err => this.handleError(err));
  }

  saveAccount(user: User, account: Account): Promise<Account[]> {
    this.loaderService.show();
    const userOid: String = user.id;
    return this.http.post(`${this.userUrl}/${userOid}/accounts`, account)
         .toPromise()
         .then(response => {
            this.loaderService.hide();
            return response as Account[];
          })
         .catch(err => this.handleError(err));
  }

  updateAccount(user: User, account: Account): Promise<Account[]> {
    this.loaderService.show();
    const userOid: String = user.id;
    const accountOid: String = account.id;
    return this.http.put(`${this.userUrl}/${userOid}/accounts/${accountOid}`, account)
         .toPromise()
         .then(response => {
            this.loaderService.hide();
            return response as Account[];
          })
         .catch(err => this.handleError(err));
  }

  doTransaction(origin, target: User, operation: Operation): Promise<Transaction> {
    this.loaderService.show();
    const originOid: String = origin.id;
    const targetOid: String = target.id;
    return this.http.post(`${this.userUrl}/${originOid}/do_transaction_to/${targetOid}`, operation)
         .toPromise()
         .then(response => {
            this.loaderService.hide();
            return response as Transaction;
          })
         .catch(err => this.handleError(err));
  }

  getTransactions(user: User): Promise<Transaction[]> {
    this.loaderService.show();
    const userOid: String = user.id;
    return this.http.get(`${this.userUrl}/${userOid}/transactions`)
         .toPromise()
         .then(response => {
            this.loaderService.hide();
            return response as Transaction[];
           })
         .catch(err => this.handleError(err));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    setInterval(() => {
      this.loaderService.hide();
      this.alertService.error('An error occurred(' + error.status + ') : ' + error.statusText);
    }, 3000);
    return Promise.reject(error);
  }

}
