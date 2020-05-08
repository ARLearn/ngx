import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor-location',
  templateUrl: './editor-location.component.html',
  styleUrls: ['./editor-location.component.css']
})
export class EditorLocationComponent implements OnInit {
  @Input() game;

  constructor() {
  }

  ngOnInit() {
  }

  newLocation(event: any) {
    this.game.lat = event.coords.lat;
    this.game.lng = event.coords.lng;
  }
}
