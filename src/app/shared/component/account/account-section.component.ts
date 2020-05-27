import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-account-section',
  template: `
    <div class="account-dropdown">
      <app-user-drop-down-display></app-user-drop-down-display>
      <select-language *ngIf="showLanguage"></select-language>
    </div>
  `,
  styles: [`

    .account-dropdown {
      position: relative;
      top: 0px;
      right: 0px;
      width: auto;
      height: auto;

      color: #FFFFFF;
      opacity: 0.7;

    }
    app-user-drop-down-display {
      position: absolute;
      top: 0px;
      right: 40px;
    }
    
    select-language {
      position: absolute;
      top: 0px;
      right: 0px;


    }
  `]
})
export class AccountSectionComponent implements OnInit {
  showLanguage: boolean = environment.showTranslate;
  constructor() { }

  ngOnInit(): void {
  }

}
