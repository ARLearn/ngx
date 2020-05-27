import {Component, OnInit, ViewEncapsulation} from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
