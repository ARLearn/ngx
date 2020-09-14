import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-combination-entry',
  template: `
    <div class="combination-outer">
      <div>
        <mat-icon>expand_less</mat-icon>
      </div>
      <div>{{letter}}</div>
      <mat-icon>expand_more</mat-icon>
    </div>
  `,
  styles: [`
      .combination-outer {
        display: flex;
        flex-direction: column;
        z-index: 5;
        border: 1px;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        width: 45px;
        border-radius: 25px;
        border: 2px solid white;
        font-weight: 900;
        font-size: 16px;
      }
  `]
})
export class CombinationEntryComponent implements OnInit {

  @Input() letter;

  constructor() { }

  ngOnInit(): void {
  }

}
