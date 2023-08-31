import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService, GlobalDataService } from "../common";
import { SnackMessageService } from "../notifcation";
import { CheckListDto, CoordinatorDto, CreateRazorPayVerifyDto, EventCreateDto, EventDto, RazorpayOrder, ThemeDto, VendorDto, CreateCheckListDto, GuestDto, CreateGuestListDto, VendorTypesDto, NewCreatedEventCreatedRecommendationsDto } from "@models/common/user.model";
import { CookieService } from "ngx-cookie-service";
import { HTTP_REQ } from "@models/common";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private cookieService: CookieService,
        private router: Router,
        private apiService: ApiService,
        private snackMessage: SnackMessageService,
        private globalDataService: GlobalDataService,

    ) { }


    async getAllCoordinators(): Promise<CoordinatorDto[] | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = { url: 'coordinator', headers: { 'Authorization': `Bearer ${token}` } };
        const { success, error, data } = await this.apiService.get(httpData);
        if (success && data) {
            const coordinatorList: CoordinatorDto[] = data
            this.globalDataService.coordinatorList.next(coordinatorList)
            return coordinatorList;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get coordinator list',
            });
            return null;
        }
    }

    async getAllThemes(): Promise<ThemeDto[] | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = { url: 'theme', headers: { 'Authorization': `Bearer ${token}` } };
        const { success, error, data } = await this.apiService.get(httpData);
        if (success && data) {
            const themeList: ThemeDto[] = data
            this.globalDataService.themeList.next(themeList)
            return themeList;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get theme list',
            });
            return null;
        }
    }

    async getAllVendors(): Promise<VendorTypesDto[] | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = { url: 'vendor', headers: { 'Authorization': `Bearer ${token}` } };
        const { success, error, data } = await this.apiService.get(httpData);
        if (success && data) {
            const vendors: VendorTypesDto[] = data
            this.globalDataService.vendorTypes.next(vendors)
            return vendors;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get vendors',
            });
            return null;
        }
    }


    async getUserEvents(): Promise<EventDto[] | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = { url: 'event', headers: { 'Authorization': `Bearer ${token}` } };
        const { success, error, data } = await this.apiService.get(httpData);
        if (success && data) {
            const events: EventDto[] = data
            this.globalDataService.events.next(events)
            return events;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get events',
            });
            return null;
        }
    }


    async createUserEvent(body: EventCreateDto): Promise<NewCreatedEventCreatedRecommendationsDto | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = { url: 'event', body: body, headers: { 'Authorization': `Bearer ${token}` } };
        const { success, error, data } = await this.apiService.post(httpData);
        if (success && data) {
            const response: NewCreatedEventCreatedRecommendationsDto = data
            response.created=true;
            this.globalDataService.newEventCreated.next(response)
            return response;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during create event',
            });
            return null;
        }
    }

    async createOrderIdForPayment(): Promise<RazorpayOrder | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: 'payment/create/orderId', body: { amount: 100, currency: 'GBP' },
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.post(httpData);
        if (success && data) {
            const razorPaymentCreateDetails: RazorpayOrder = data
            return razorPaymentCreateDetails;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get order id',
            });
            return null;
        }
    }

    async checkPaymentVerify(body: CreateRazorPayVerifyDto): Promise<boolean | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: 'payment/verify', body: body,
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.post(httpData);
        if (success && data) {
            const paymentSuccessDetails: boolean = data.signatureIsValid
            this.globalDataService.ispaymentSuccess.next(paymentSuccessDetails)
            return paymentSuccessDetails;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get payment verification',
            });
            return null;
        }
    }

    async getAllCheckListOfEvent(id: string): Promise<CheckListDto[] | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: `checklist/${id}`,
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.get(httpData);
        if (success && data) {
            const checkList: CheckListDto[] = data
            this.globalDataService.checkList.next(checkList)
            return checkList;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get check list',
            });
            return null;
        }
    }

    async createCheckListOfEvent(body: CreateCheckListDto): Promise<any | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: `checklist`, body: body,
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.post(httpData);
        if (success && data) {
            //immideatly calling get all checklist after create.
            this.getAllCheckListOfEvent(body.event_id)
            return data;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during create check list',
            });
            return null;
        }
    }

    async updateCheckListOfEvent(item: CheckListDto,): Promise<any | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: `checklist/status/${item._id}`, body: { 'task_status': 'completed' },
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.put(httpData);
        if (success && data) {
            //immideatly calling get all checklist after update.
            this.getAllCheckListOfEvent(item.event_id)
            return data;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during update check list',
            });
            return null;
        }
    }

    async getAllGuestListOfEvent(id: string): Promise<GuestDto[] | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: `guestlist/${id}`,
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.get(httpData);
        if (success && data) {
            const guestList: GuestDto[] = data
            this.globalDataService.guestList.next(guestList)
            return guestList;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during get guest list',
            });
            return null;
        }
    }

    async createGuestOfEvent(body: CreateGuestListDto): Promise<any | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: `guestlist`, body: body,
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.post(httpData);
        if (success && data) {
            //immideatly calling get all checklist after create.
            this.getAllGuestListOfEvent(body.event_id)
            return data;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during create guest list',
            });
            return null;
        }
    }

    async updateGuestListOfEvent(item: GuestDto, status: 'Pending' | 'Accepted' | 'Declined'): Promise<any | null> {
        const token = this.cookieService.get('authToken');
        const httpData: HTTP_REQ = {
            url: `guestlist/status/${item._id}`, body: { 'rsvp_status': status },
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const { success, error, data } = await this.apiService.put(httpData);
        if (success && data) {
            //immideatly calling get all checklist after update.
            this.getAllGuestListOfEvent(item.event_id)
            return data;
        } else {
            this.snackMessage.show({
                message: error?.message?.message || 'Failure during update guest list',
            });
            return null;
        }
    }

}

