import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static isEmptyString(str: string): boolean {
    if (typeof str === 'string' && str.trim().length == 0) {
      return true
    }

    return false
  }

  static isEmailFormatIncorrect(email: string): boolean {
    const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return !regex.test(email)
  }

  static jmbg(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const jmbg = control.value;
      const jmbgPattern = /^\d{13}$/;

      if (!jmbgPattern.test(jmbg)) {
        return { 'invalidJmbg': false };
      }

      return null;
    };
  }

  static idNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const idNumber = control.value;
      const idNumberPattern = /^\d{9}$/

      if (!idNumberPattern.test(idNumber)) {
        return { 'invalidIdNumber': false };
      }

      return null;
    };
  }
  static jmbgValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const jmbg = control.value as string;
      const jmbgPattern = /^\d{13}$/;

      if (!jmbgPattern.test(jmbg)) {
        return { 'invalidJmbg': true };
      }

      const dateOfBirth = jmbg.substr(0, 7);
      const cityCode = jmbg.substr(7, 4);
      const randomDigits = jmbg.substr(11, 2);

      const day = parseInt(dateOfBirth.substr(0, 2), 10);
      const month = parseInt(dateOfBirth.substr(2, 2), 10);
      const year = parseInt(dateOfBirth.substr(4, 3), 10);

      if (month < 1 || month > 12 || day < 1 || day > 31) {
        return { 'invalidJmbg': true };
      }

      const daysInMonth = new Date(year, month, 0).getDate();

      if (day > daysInMonth) {
        return { 'invalidJmbg': true };
      }

      const cityCodeInt = parseInt(cityCode, 10);
      if (cityCodeInt < 0 || cityCodeInt > 9999) {
        return { 'invalidJmbg': true };
      }

      const randomDigitsInt = parseInt(randomDigits, 10);
      if (randomDigitsInt < 0 || randomDigitsInt > 99) {
        return { 'invalidJmbg': true };
      }

      return null; // Return null if the JMBG is valid
    };
  }

  static idNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const idNumber = control.value as string;
      const idNumberPattern = /^\d{9}$/;

      if (!idNumberPattern.test(idNumber)) {
        return { 'invalidIdNumber': true };
      }

      return null; // Return null if the ID number is valid
    };
  }
}
