import {
	HttpClient, HttpHeaders
}
from '@angular/common/http';
import {
	Injectable
}
from '@angular/core';
import 'rxjs/add/operator/map';
import {
	supplier_access_url, admin_service_endpoint, TAFEL_API_KEY
}
from '../../common/properties';
import {
	Observable
}
from 'rxjs/Observable';
@Injectable()
export class UserDataProvider {
	headers: HttpHeaders;
	headersNonAdmin: HttpHeaders;
	dinerId: any;
	deviceId: any;
	serviceStationId: any;
	headersinfo: any = {};
	constructor(public http: HttpClient) {}
	getSupplierAccount(phoneNumber, deviceId, deviceType): Observable < any > {
		let apiUrl = supplier_access_url + "/suppliersByPhone?phoneNumber=" + phoneNumber;
		var deviceInfo = {
			deviceType: '',
			deviceId: ''
		};
		deviceInfo.deviceType = deviceType;
		deviceInfo.deviceId = deviceId;
		let localData = this.http.post(apiUrl, JSON.stringify(deviceInfo), this.headersinfo);
		return localData;
	}
	setAPIDetails(apiDetails) {
		let headers = {};
		headers["Authorization"] = (apiDetails ? apiDetails.idToken : "");
		headers["Content-Type"] = "application/json";
		headers["x-api-key"] = TAFEL_API_KEY;
		this.headersinfo["headers"] = headers;
	}
	setDeviceId(deviceId) {
		this.deviceId = deviceId;
	}
	parseDate(date) {
		let parsedDate = new Date(date);
		return(parsedDate.getFullYear() + "-" + ("0" + (parsedDate.getMonth() + 1)).slice(-2) + "-" + ("0" + parsedDate.getDate()).slice(-2));
	}
	setHeaders(headersForAdmin, headersForNonAdmin) {
		this.headers = headersForAdmin;
		this.headersNonAdmin = headersForNonAdmin;
	}
	setServiceStation(serviceStation) {
		this.serviceStationId = serviceStation.id;
	}
	createOTP(platform, phoneNumber, deviceId) {
		let url = admin_service_endpoint + '/otp?otp=';
		let body = {
			"deviceType": platform,
			"deviceId": deviceId ? deviceId : '1111-2222-5555',
			"phoneNumber": phoneNumber,
			"userType": "SUPPLIER"
		}
		this.http.post(url, body, this.headersinfo).subscribe(res => {});
	}
	validateOTP(otp, platform, phoneNumber, deviceId): Observable < any > {
		let url = admin_service_endpoint + '/otp?otp=' + otp;
		let body = {
			"deviceType": platform,
			"deviceId": deviceId ? deviceId : '1111-2222-5555',
			"phoneNumber": phoneNumber,
			"userType": "SUPPLIER"
		}
		return this.http.post(url, body, this.headersinfo);
	}
}