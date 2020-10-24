import { REGISTER_USER } from '@graphql/operations/mutation/user';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { map } from 'rxjs/internal/operators/map';
import { IRegisterForm } from '@core/interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  getUsers(){
    return this.get(USERS_LIST_QUERY, {
        include: true
    }).pipe(map((result: any) => {
      return result.users;
    }));
  }

  register(user: IRegisterForm){
    return this.set(REGISTER_USER,
      {
        user,
        include: false
      }).pipe(
      map((result: any) => {
        return result.register;
      })
    );
  }
}
