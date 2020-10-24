import { UsersService } from './../../../@core/services/users.service';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private usersApi: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.login('edfrasi48@gmail.com', '123456').subscribe(result => {
      console.log(result);
    });

    this.usersApi.getUsers().subscribe( result => {
      // console.log(result);
    });

    this.auth.getMe().subscribe( result => {
      // console.log(result);
    });
  }

}
