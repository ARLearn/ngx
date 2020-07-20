import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-tutorial',
  template: `
    <app-top-level-navbar [title]="'Help'">
    </app-top-level-navbar>

    <div class="context-tabs">
    
    </div>
    <div class="full-width-container maxwidth">
      todo
    </div>
  `,
  styles: []
})
export class VideoTutorialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
