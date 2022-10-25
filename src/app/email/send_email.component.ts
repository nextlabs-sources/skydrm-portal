import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "../../environments/environment";

import { ApiService } from "../services/api.service";
import { GoogleAnalyticsService } from "../services/google-analytics.service";

@Component({
  selector: "send-email",
  templateUrl: "send_email.html",
  styleUrls: ["send_email.scss"],
})
export class SendEmailComponent implements OnInit, OnDestroy {
  showQuery = "true";
  showAck = "false";

  public emailForm: FormGroup;
  public contactNumber: string;
  public emailLink = "support@nextlabs.com";
  public disabled = false;

  // Recaptcha
  //public readonly siteKey: String = '6LdUE58UAAAAAKnun1zUkf_qHuB4g4be4yp-oxFR';
  //public readonly siteKey: String = '6Ldif7EUAAAAAOBLIOCa2nXEer0ruCecLQnxGGcC';
  public readonly siteKey: string = environment.googleReCaptchaKey;
  public theme = "light"; // dark
  public size = "compact"; //normal
  public lang = "en";
  public type = "image";

  public email_validation_messages = {
    name: [
      { type: "required", message: "Your name is required" },
      {
        type: "maxlength",
        message: "Your name cannot be more than 100 characters long",
      },
    ],
    email: [
      { type: "required", message: "Email is required" },
      {
        type: "maxlength",
        message: "Email cannot be more than 100 characters long",
      },
      { type: "pattern", message: "Enter a valid email" },
    ],
    phone: [
      { type: "required", message: "Phone number is required" },
      {
        type: "maxlength",
        message: "Phone number cannot be more than 20 characters long",
      },
      { type: "pattern", message: "Enter a valid phone number" },
    ],
    company: [
      { type: "required", message: "Company name is required" },
      {
        type: "maxlength",
        message: "Company name cannot be more than 100 characters long",
      },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long",
      },
    ],
    message: [
      { type: "required", message: "Message is required" },
      {
        type: "maxlength",
        message: "Message cannot be more than 3000 characters long",
      },
    ],
  };

  constructor(
    private apiService: ApiService,
    private gtagService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    //console.log("SendEmailComponent initialised");
    this.emailForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),
      phone: new FormControl(""),
      company: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      message: new FormControl("", [
        Validators.required,
        Validators.maxLength(3000),
      ]),
      recaptcha2: new FormControl("", [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    //console.log("SendEmailComponent destroyed");
  }

  public sendEmail = (emailFormValue) => {
    if (this.emailForm.invalid) {
      console.log("Form validation failed");
      return;
    }

    let msg = emailFormValue["message"];
    if (msg == null) {
      msg = "";
    }

    const contact = {
      name: emailFormValue["name"],
      company: emailFormValue["company"],
      email: emailFormValue["email"],
      phone: emailFormValue["phone"],
      message: msg.replace(/\n/g, "\\n"),
      status: "new",
    };

    this.gtagService.eventEmitter("Ask", "Question", "Ask a question");

    this.disabled = true;
    this.apiService.submitCustomerQueryAWS(contact).subscribe(
      () => {
        this.showQuery = "false";
        this.showAck = "true";
        this.disabled = false;
      },
      (res) => {
        console.log("Ask question error: ", res);
        this.disabled = false;
      }
    );
  };

  closeAck(): void {
    this.showAck = "false";
    this.showQuery = "true";
  }

  handleReset(): void {
    //console.log("Handle Reset");
  }

  handleExpire(): void {
    //console.log("Handle Expire");
  }

  handleError(): void {
    //console.log("Handle Error");
  }

  handleLoad(): void {
    //console.log("Handle Load");
  }

  handleSuccess(captchaResponse: string): void {
    //console.log("Handle Success");
  }
}
