import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
  MatCardModule,
  MatButtonModule,
  MatSelectModule
  } from '@angular/material';

import { User } from '../model/user.model';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[];

  constructor(public route: ActivatedRoute, public location: Location, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().then(
      users => this.users = users
    );
  }
}
