import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { formatDate } from '@angular/common';

import { ApiService } from '../services/api.service';
import { Answer } from '../models/answer';

@Component({
  selector: 'question-panel',
  templateUrl: 'question.html',
  styleUrls: ['question.scss']
})
export class QuestionComponent {

    emailHash:string;

    public questionForm: FormGroup;
    public isSuccess:boolean = false;
    public isError:boolean = false;

    public validation_messages = {
        'answer1': [
          { type: 'required', message: 'Your answer is required' },
          { type: 'maxlength', message: 'Your answer cannot be more than 3000 characters long' }
        ],
        'answer2': [
          { type: 'required', message: 'Your answer required' },
          { type: 'maxlength', message: 'Your answer cannot be more than 3000 characters long' },
        ],
        'answer3': [
          { type: 'required', message: 'Your answer is required' },
          { type: 'maxlength', message: 'Your answer cannot be more than 3000 characters long' },
        ],
    };
  

    constructor(private apiService: ApiService, private route: ActivatedRoute) { }

    ngOnInit() {
        //console.log("QuestionComponent initialised");

        this.emailHash = this.route.snapshot.queryParamMap.get("emailHash")

        this.questionForm = new FormGroup({
            answer1: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
            answer2: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
            answer3: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
        });
        
    }

    ngOnActivate() {

    }

    ngOnDestroy() {
        //console.log("QuestionComponent destroyed");
    }

    public send = (questionFormValue) => {

      if(this.questionForm.invalid){
        this.answer1.markAsDirty();
        //console.log("Form has error");
        this.isError = true;
        return;
      }
  
      //console.log("Anwers", questionFormValue);

      let now: Date = new Date();
      //let dateInSec:number = now.getTime() / 1000 ;
      //params = params.append("registerDate", "" + dateInSec.toFixed());
      let currentDate = formatDate(now, "yyy-MM-dd", "en-US");
    
      let answer:Answer = new Answer();
      answer.whatApp = questionFormValue['answer1'];
      answer.whatLanguage = questionFormValue['answer2'];
      answer.anythingElse = questionFormValue['answer3'];
      answer.emailHash = this.emailHash;
      answer.registerDate = currentDate;

      this.isSuccess = false;
      this.isError = false;
      this.apiService.submitAnswer(answer).subscribe(
        (val) => {
          //console.log("Send answers success: ", val);
          this.isSuccess = true;

        },
        (res) => {
          //console.log("Send answers error: ", res);
          this.isError = true;
        }
      );
      
    }

    get answer1() { return this.questionForm.get('answer1'); }

    get answer2() { return this.questionForm.get('answer2'); }

    get answer3() { return this.questionForm.get('answer3'); }

}