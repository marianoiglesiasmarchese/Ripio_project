import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from '..//model/user.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private userUrl = '/user';

  constructor(private http: HttpClient) { }

  getUsers(): Promise<User[]> {
    return this.http.get(`${this.userUrl}s`)
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

   save(user: User): Promise<User> {
    return this.http.post(`${this.userUrl}/`, user)
         .toPromise()
         .then(response => response as User)
         .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

}
