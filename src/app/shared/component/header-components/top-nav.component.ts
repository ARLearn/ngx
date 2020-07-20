import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {getAuthIsAdmin} from "../../../auth/store/auth.selector";

@Component({
  selector: 'app-top-nav',
  template: `
    <div class="root-tabs">
      <nav mat-tab-nav-bar [backgroundColor]="'primary'">
        <a
            class="nav-item uppercase"
            routerLinkActive="active"
            #rla="routerLinkActive"
            [routerLink]="'/portal/root/games'">{{'GAME.MYGAMES'|translate}}</a>
        <a
           class="nav-item uppercase"
           routerLinkActive="active"
           #rla1="routerLinkActive"
           [routerLink]="'/portal/root/connections'"
        > {{'CONTACT.CONTACTS' |translate}}</a>
        <a
           *ngIf="isAdmin$ |async"
           class="nav-item uppercase"
           routerLinkActive="active"
           #rla2="routerLinkActive"
           [routerLink]="'/portal/root/library'"
        > {{'LIBRARY.LABEL' |translate}}</a>
        <a
           *ngIf="isAdmin$ |async"
           class="nav-item uppercase"
           routerLinkActive="active"
           #rla3="routerLinkActive"
           [routerLink]="'/portal/root/portal'"
        > {{'PORTAL_MANAGEMENT.LABEL' |translate}}</a>
        <a
            class="nav-item uppercase"
            routerLinkActive="active"
            #tut="routerLinkActive"
            [routerLink]="'/portal/tutorial/video'">{{'HELP.TITLE'|translate}}</a>
        
      </nav>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .root-tabs > .mat-tab-list > .mat-tab-links > .mat-tab-link {
      text-transform: uppercase;
    }
    .root-tabs {
      position: absolute;
      text-transform: uppercase;
    }

    .root-tabs>.mat-tab-links > .mat-tab-label-active{
      color: #FFFFFF;
      text-transform: uppercase;
      opacity: 1;
    }
    
    .nav-item {
      padding: 10px 26px;
      font-size: 12px;
      color: #FFFFFF;
      opacity: 0.7;
    }
    
    .nav-item:hover {
      color: #FFFFFF;
      opacity: 0.9;
      text-decoration: none;
    }
    
    .nav-item.active {
      opacity: 1;
    }

    .nav-item:first-child {
      padding-left: 0;
    }
  `]
})
export class TopNavComponent implements OnInit {
  isAdmin$ = this.store.select(getAuthIsAdmin);

  constructor(public store: Store<State>) {
  }

  ngOnInit(): void {
  }

}
