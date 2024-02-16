import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  map,
  skip,
  catchError,
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";
import * as $ from "jquery";
import { HomeService } from "../services/homeservice";
import { environment } from "../../environments/environment";
import { v4 as uuid } from "uuid";
import { AbstractControl } from "@angular/forms";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  FormArray,
} from "@angular/forms";
import { version } from "punycode";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { PaymentEntity } from "../models/PaymentEntity";
import { OrderEntity } from "../models/OrderEntity";
import { NgxSpinnerService } from "ngx-spinner";
import { ScriptLoaderService } from "../services/scriptLoader.service";
declare var VestTokenService: any;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild("checkoutContent") checkoutContentElement: ElementRef;
  public list: string[] = [];
  uuidValue: string;
  routeState: any;
  totalProductAmount: any;
  checkoutForm: FormGroup;
  orderData: any;
  WebSessionID: any;
  chargeAccountNumberToken: any;
  paymentDeviceLast4: any;

  error: any;
  webSessionErrorShow = false;
  webSessionError: any;
  PaymentUnsucess: any;
  PaymentUnsucessShow = false;
  orderPending: boolean;

  cardNumberErrorGet: string;
  checkingCardStatus: boolean;
  cardNumber: any;
  private checkoutPageSubscriptions: Subscription;
  // tslint:disable-next-line: max-line-length
  constructor(
    private routeCtrl: Router,
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private spinnnerService: NgxSpinnerService,
    private scriptLoaderService: ScriptLoaderService
  ) {}

  // form methods
  private setupForm() {
    this.uuidValue = this.getUUIDValue();
    this.getSessionTag(this.uuidValue);
    this.checkoutForm = this.formBuilder.group({
      cardNumber: ["", [Validators.required, Validators.maxLength(19)]],
      cardHolderFirstName: [
        "",
        [Validators.required, Validators.maxLength(20)],
      ],
      cardHolderLastName: ["", [Validators.required, Validators.maxLength(20)]],
      chargeExpirationMMYY: [
        "",
        [Validators.required, this.creditCardExpiryValidation.bind(this)],
      ],
      chargeCVN: [
        "",
        [Validators.required, Validators.maxLength(4), Validators.minLength(3)],
      ],
      cardHolderAddressLine1: [
        "",
        [Validators.required, Validators.maxLength(30)],
      ],
      cardHolderAddressLine2: ["", Validators.maxLength(30)],
      cardHolderCity: ["", [Validators.required, Validators.maxLength(30)]],
      postalCode: [
        "",
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cardState: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          this.customstateValidation.bind(this),
        ],
      ],
      transactionID: [
        this.uuidValue,
        [Validators.required, Validators.maxLength(36)],
      ],
    });
    const cardNumberSubscription = this.checkoutForm
      .get("cardNumber")
      .valueChanges.pipe(
        debounceTime(1200),
        map(this.validateCardNumber.bind(this))
      )
      .subscribe();
    this.checkoutPageSubscriptions.add(cardNumberSubscription);
  }

  private getUUIDValue(): string {
    return new Date().valueOf().toString();
  }

  private loadScripts(sessionId: string, orgId: string, accountName: string) {
    const dataCollectorURL = environment.dataCollectorURL(
      accountName,
      sessionId
    );
    const dataFingerPrintURL = environment.dataFingerPrintingURL(
      orgId,
      sessionId
    );
    const dataCollectorScriptName = `dataCollector${sessionId}`;
    const dataFingerScriptName = `dataFingerPrint${sessionId}`;
    this.scriptLoaderService.addScript(
      dataCollectorScriptName,
      dataCollectorURL,
      "head"
    );
    this.scriptLoaderService.addScript(
      dataFingerScriptName,
      dataFingerPrintURL,
      "body"
    );

    this.scriptLoaderService
      .load(dataCollectorScriptName)
      .then(() => {
        return this.scriptLoaderService.load(dataFingerScriptName);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private getSessionTag(transactionId: string) {
    const webSessionSubscription = this.homeService
      .WebSessionIDService(transactionId)
      .subscribe((resp) => {
        if (resp["responseCode"] === "0") {
          this.WebSessionID = resp["webSessionID"];
          this.loadScripts(
            this.WebSessionID,
            resp["orgID"],
            environment.AccountName
          );
        } else {
          // Display message.
          this.webSessionErrorShow = true;
          this.webSessionError = resp["responseText"];
        }
      });
    this.checkoutPageSubscriptions.add(webSessionSubscription);
  }

  // validations
  private creditCardExpiryValidation(control: AbstractControl) {
    const inputValue = control.value;
    let retVal: object;

    if (
      inputValue &&
      typeof inputValue === "string" &&
      inputValue.length === 4
    ) {
      const inputMonth = parseInt(inputValue.slice(0, 2), 10);
      const inputYear = parseInt(inputValue.slice(2, 4), 10);
      const currentYear = parseInt(
        new Date().getFullYear().toString().slice(2, 4),
        10
      );
      const currentMonth = new Date().getMonth() + 1;
      if (
        inputMonth &&
        inputYear &&
        !Number.isNaN(inputMonth) &&
        !Number.isNaN(inputYear)
      ) {
        if (inputYear > currentYear) {
          retVal =
            inputMonth > 0 && inputMonth <= 12
              ? null
              : { invalidCreditCardExpDetails: true };
        } else if (inputYear === currentYear) {
          retVal =
            inputMonth >= currentMonth && inputMonth <= 12
              ? null
              : { invalidCreditCardExpDetails: true };
        } else {
          retVal = { invalidCreditCardExpDetails: true };
        }
      } else {
        retVal = { invalidCreditCardExpDetails: true };
      }
    } else {
      retVal = { invalidCreditCardExpDetails: true };
    }
    return retVal;
  }

  private customstateValidation(control: AbstractControl) {
    const inputValue = control.value;
    if (
      inputValue &&
      typeof inputValue === "string" &&
      inputValue.length === 2
    ) {
      const firstChar = inputValue[0].toLocaleUpperCase();
      const lastChar = inputValue[1].toLocaleUpperCase();
      return firstChar >= "A" &&
        firstChar <= "Z" &&
        lastChar >= "A" &&
        lastChar <= "Z"
        ? null
        : { stateinvalidInput: true };
    } else {
      return { stateinvalidLength: true };
    }
  }

  // Change the Name
  private validateCardNumber(value: string) {
    this.checkingCardStatus = true;
    const input = value;
    this.cardNumber = parseInt(input.replace(/\s/g, ""), 10);
    VestTokenService(
      environment.vestaServiceURL,
      environment.AccountName,
      // tslint:disable-next-line: radix
      this.cardNumber,
      // tslint:disable-next-line: only-arrow-functions
      (data) => {
        this.checkingCardStatus = false;
        this.chargeAccountNumberToken = data && data.ChargeAccountNumberToken;
        this.paymentDeviceLast4 = data && data.PaymentDeviceLast4;
        this.cardNumberErrorGet = null;
      },
      // tslint:disable-next-line: only-arrow-functions
      (error) => {
        // set error message;
        let errorMessage = "Card details invalid, Please verify";
        this.checkingCardStatus = false;
        // Show the message below card textbox
        if (error && typeof error === "string") {
          const splitArray = error.split("\n");
          errorMessage =
            Array.isArray(splitArray) && splitArray.length === 2
              ? splitArray[1]
              : errorMessage;
          const isParsed = Array.isArray(splitArray) && splitArray.length === 2;
        }
        this.cardNumberErrorGet = errorMessage;
      }
    );
  }

  // form methods
  private goToCheckoutFormTop() {
    return this.routeCtrl
      .navigate([], { fragment: "checkoutContent" })
      .then(() => {
        if (
          this.checkoutContentElement &&
          this.checkoutContentElement.nativeElement
        ) {
          this.checkoutContentElement.nativeElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
  }

  private presubmitHandler() {
    this.orderPending = true;
    this.spinnnerService.show();
    this.goToCheckoutFormTop();
  }

  private successCleanup(resp) {
    this.orderPending = false;
    this.homeService.setConfirmedOrderStatus(resp);
    this.spinnnerService.hide();
    this.routeCtrl.navigateByUrl("/order-status", { state: resp });
  }

  private errorCleanup(error: any) {
    this.uuidValue = this.getUUIDValue();
    this.getSessionTag(this.uuidValue);
    this.orderPending = false;
    this.error = error;
    this.spinnnerService.hide();
    this.PaymentUnsucessShow = true;
    this.setPaymentErrorMessage(error);
  }

  private getFormData(): OrderEntity {
    const orderData = this.orderData;
    const cardDetails = this.checkoutForm.value;
    const payment: PaymentEntity = {
      transactionID: this.uuidValue,
      webSessionID: this.WebSessionID,
      cardHolderFirstName: cardDetails.cardHolderFirstName,
      cardHolderLastName: cardDetails.cardHolderLastName,
      chargeCVN: cardDetails.chargeCVN,
      chargeExpirationMMYY: cardDetails.chargeExpirationMMYY,
      chargeAccountNumberToken: this.chargeAccountNumberToken,
      paymentDeviceLast4: this.paymentDeviceLast4,
      addressLine1: cardDetails.cardHolderAddressLine1,
      addressLine2: cardDetails.cardHolderAddressLine2,
      city: cardDetails.cardHolderCity,
      postalCode: cardDetails.postalCode,
      state: cardDetails.cardState,
    };
    const payLoad: OrderEntity = {
      email: orderData.email,
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      phoneNumber: orderData.phoneNumber,
      products: orderData.products,
      pickUpLocationId: orderData.pickUpLocationId,
      paymentAmount: orderData.PaymentAmount,
      pickUpDate: orderData.pickUpDate,
      pickUpLocationName: orderData.pickUpLocationName,
      paymentCard: payment,
      isActive: true,
    };
    return payLoad;
  }

  private setPaymentErrorMessage(error: any) {
    if (typeof error === "string" && error.includes("here is detail::")) {
      this.PaymentUnsucess = error.replace(
        "here is detail::",
        "here are the detail(s) :"
      );
    } else if (typeof error === "string") {
      this.PaymentUnsucess = error;
    } else {
      this.PaymentUnsucess = String(error);
    }
  }

  private submitActionHandler(payLoad: OrderEntity) {
    return this.homeService.checkoutFormSubmit(payLoad).subscribe(
      (resp) => {
        this.successCleanup(resp);
        return resp;
      },
      (error) => {
        this.errorCleanup(error);
        return error;
      }
    );
  }

  ngOnInit() {
    this.checkoutPageSubscriptions = new Subscription();
    this.routeState = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    const routeStateSubscription = this.routeState.subscribe((data) => {
      this.orderData = data;
      this.totalProductAmount = data.PaymentAmount;
      this.orderData.PaymentAmount = data.PaymentAmount;
    });

    this.checkoutPageSubscriptions.add(routeStateSubscription);

    // initial form setup
    this.setupForm();
  }

  onSubmit() {
    this.presubmitHandler();
    const payLoad = this.getFormData();
    const onSubmitHandlerSubscriptions = this.submitActionHandler(payLoad);
    this.checkoutPageSubscriptions.add(onSubmitHandlerSubscriptions);
  }

  ngOnDestroy() {
    if (this.checkoutPageSubscriptions) {
      this.checkoutPageSubscriptions.unsubscribe();
    }
  }
}
