import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { User } from './model/user.model';

import { UserService } from './service/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})

export class AppComponent implements OnInit {

  public users: User[];

  constructor(public route: ActivatedRoute, public location: Location, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().then(users => this.users = users);
  }

}
