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
            class="uppercase"
            mat-tab-link
            routerLinkActive #rla="routerLinkActive"
            [active]="rla.isActive"
            [routerLink]="'/portal/root/games'">{{'GAME.MYGAMES'|translate}}</a>
        <a mat-tab-link
           class="uppercase"
           routerLinkActive #rla1="routerLinkActive"
           [active]="rla1.isActive"
           [routerLink]="'/portal/root/connections'"
        > {{'CONTACT.CONTACTS' |translate}}</a>
        <a mat-tab-link
           *ngIf="isAdmin$ |async"
           class="uppercase"
           routerLinkActive #rla2="routerLinkActive"
           [active]="rla2.isActive"
           [routerLink]="'/portal/root/library'"
        > {{'TODO.LIBRARY' |translate}}</a>
        <a mat-tab-link
           *ngIf="isAdmin$ |async"
           class="uppercase"
           routerLinkActive #rla3="routerLinkActive"
           [active]="rla3.isActive"
           [routerLink]="'/portal/root/portal'"
        > {{'TODO.USER_PORTAL' |translate}}</a>
        
        <a mat-tab-link
           class="uppercase"
           disabled routerLinkActive="tab-selected"> {{'GAME.GAMELIB'|translate}}</a>
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
  `]
})
export class TopNavComponent implements OnInit {
  isAdmin$ = this.store.select(getAuthIsAdmin);

  constructor(public store: Store<State>) {
  }

  ngOnInit(): void {
  }

}
