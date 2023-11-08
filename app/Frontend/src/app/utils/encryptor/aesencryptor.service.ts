import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AESencryptorService {

  private static key: string = environment.securityKey
  private static iv: string = environment.securityIv

  constructor(
  ) { }

  static encriptyString(str: string) {
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var iv = CryptoJS.enc.Utf8.parse(this.iv);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str.toString()),key,
    {
      FeedbackSize: 128,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    return encrypted.toString();
  }

  static decriptyString(str: string) {
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var iv = CryptoJS.enc.Utf8.parse(this.iv);
    var decrypted = CryptoJS.AES.decrypt(str, key, {
        FeedbackSize: 128,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  static encriptyNumber(num: number) {
    const str = num.toString()
    return this.encriptyString(str);
  }

  static decriptyNumber(num: number) {
    const str = num.toString()
    return this.decriptyString(str);
  }
}
