import { Injectable } from '@angular/core';
// TO NAVIGATE AFTER LOGIN
import { Router } from '@angular/router';
// SAVE TOKEN TO COOKIES
import { CookieService } from 'ngx-cookie-service';
// SERVICES
import { ApiService, GlobalDataService } from '../common';
import { SnackMessageService } from '../notifcation';
// MODELS
import { HTTP_REQ } from '@models/common';
import { LOGIN_FORM_DATA, PROFILE, REGISTER_FORM_DATA } from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService,
    private snackMessage: SnackMessageService,
    private globalDataService: GlobalDataService,
  ) { }
  // REGISTER
  async register(formData: REGISTER_FORM_DATA) {
    const httpData: HTTP_REQ = {
      url: 'user/register',
      body: {
        user_name: formData.user_name,
        email_id: formData.email_id,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      },

    };
    const { success, data, error } = await this.apiService.post(httpData);

    if (success && data?.token) {
      this.setCookies(data?.token,);
      this.router.navigate(['auth']);
    } else {
      this.snackMessage.show({
        message: error?.message?.message || 'Failure during register',
      });
    }
  }

  // LOGIN
  async login(formData: LOGIN_FORM_DATA) {
    const httpData: HTTP_REQ = { url: 'user/login', body: formData };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.token) {
      this.setCookies(data?.token);
      this.router.navigate(['']);
    } else {
      this.snackMessage.show({
        message: error?.message?.message || 'Failure during login',
      });
    }
  }

  //USER PROFILE
  async getUserProfile(): Promise<PROFILE | null> {
    const token = this.cookieService.get('authToken');
    const httpData: HTTP_REQ = { url: 'user/profile', headers: { 'Authorization': `Bearer ${token}` } };
    const { success, error, data } = await this.apiService.get(httpData);
    if (success && data) {
      const userInfo: PROFILE =data
      this.globalDataService.currentUser.next(userInfo);
      return userInfo;
    } else {
      this.snackMessage.show({
        message: error?.message?.message || 'Failure during get profile',
      });
      return null;
    }
  }

  async updateUserProfile(formData: PROFILE): Promise<PROFILE | null> {
    const token = this.cookieService.get('authToken');
    const httpData: HTTP_REQ = {
      url: 'user/profile',
      body: {
        "first_name":formData.first_name,
        "last_name": formData.last_name,
        "mobile_number":formData.mobile_number,
        "address_line1":formData.address_line1,
        "street": formData.street,
        "city": formData.city,
        "zipcode": formData.zipcode
      }

    }; const { success, error, data } = await this.apiService.put(httpData);
    if (success && data) {
      const userInfo: PROFILE = data
      this.globalDataService.currentUser.next(userInfo);
      return userInfo;
    } else {
      this.snackMessage.show({
        message: error?.message?.message || 'Failure during update profile',
      });
      return null;
    }
  }

  // LOGOUT
  logOut() {
    this.cookieService.deleteAll();
    this.globalDataService.currentUser.next(undefined);
    this.router.navigate(['auth']);
  }

  private setCookies(oAuthToken: string) {
    const expires = this.expireTime1Hour;
    const options = { path: '/', expires };

    this.cookieService.set('authToken', oAuthToken, options);
  }

  private get expireTime1Hour() {
    const currentTime = Date.now();
    const oneHourInMilliseconds = 3600 * 1000;
    const expirationTime = currentTime + oneHourInMilliseconds;

    return new Date(expirationTime);
  }
}
