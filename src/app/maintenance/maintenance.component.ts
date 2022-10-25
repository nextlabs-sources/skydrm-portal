import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { formatDate } from '@angular/common';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'maintence-panel',
  templateUrl: 'maintenance.html',
  styleUrls: ['maintenance.scss']
})
export class MaintenanceComponent {

}