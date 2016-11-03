import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Person} from './person';
import {Name} from './name';
import {Picture} from './picture';

@Injectable()
export class PeopleService {

  constructor(public http: Http) {
  }

  load(){

    return new Promise(resolve => {
      this.http.get('https://randomuser.me/api/?results=10')
        .map(mapPersons)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}

function mapPersons(response:Response): Person[]{
   return response.json().results.map(toPerson)
}

function toPerson(r:any): Person{
  let picture = <Picture>({
    large: r.picture.large,
    medium: r.picture.medium,
    thumbnail: r.picture.thumbnail,
  });


  let name = <Name>({
    title: r.name.title,
    first: r.name.first,
    last: r.name.last,
  });

  let person = <Person>({
    email: r.email,
    gender: r.gender,
    name: name,
    picture: picture,
  });
  //console.log('Parsed person:', person);
  return person;
}
