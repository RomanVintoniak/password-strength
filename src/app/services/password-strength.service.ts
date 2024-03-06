import { Injectable } from "@angular/core";

const LETTER_REGEX = /[a-zA-Z]+/;
const NUMBERS_REGEX = /[0-9]+/;
const SYMBOLS_REGEX = /[!@#$%^&*()_+={}\[\]:;<>,.?~\-]+/;
const MIN_PASSWORD_LENGTH = 8;

@Injectable({ providedIn: "root" })
export class PasswordStrengthService {
  checkStrength(password: string): number {
    let strength = 0;

    if (password.length >= MIN_PASSWORD_LENGTH) {
      const rulesChecks = [
        LETTER_REGEX.test(password),
        NUMBERS_REGEX.test(password),
        SYMBOLS_REGEX.test(password)
      ];

      rulesChecks.forEach(rule => strength += rule === true ? 1 : 0);
    }

    return strength;
  }
}