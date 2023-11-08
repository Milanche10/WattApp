import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from 'src/app/models/User';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { Prosummer, ProsummerFirstTime } from 'src/app/models/Prosummer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string

  constructor(
    private httpClient: HttpClient
  ) { 
    this.baseUrl = environment.apiUrl
  }

  getUserBy(id: string): Observable<User> {
    const token = sessionStorage.getItem("token")
    const headers = new HttpHeaders({'Authorization':"Bearer "+token})
    const idCrypt = AESencryptorService.encriptyString(id)
    return this.httpClient.post<User>(this.baseUrl+"/api/user",{
      id:idCrypt
    }, {
      headers: headers
    } )
  }

  firstTimeProsummer(body: ProsummerFirstTime): Observable<Prosummer> {
    const token = sessionStorage.getItem("token")
    const headers = new HttpHeaders({'Authorization':"Bearer "+token})
    return this.httpClient.patch<Prosummer>(this.baseUrl+"/api/user/firstTimeLogged",body,{
      headers: headers
    })
  }
}
