import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-game-library',
  template: `
    <p>
      manage-game-library works!
    </p>
    <app-top-level-navbar [title]="'test'">
    </app-top-level-navbar>
  `,
  styles: []
})
export class ManageGameLibraryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
