import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import {Game} from '../../store/current-game.state';

@Component({
  selector: 'app-editor-access',
  templateUrl: './editor-access.component.html',
  styleUrls: ['./editor-access.component.css']
})
export class EditorAccessComponent implements   OnChanges {
  @Input() game: Game;
  sharing: number;

  constructor() {
  }

  changeAccess(event: MatRadioChange) {
    this.game.sharing = parseInt(event.value, 10);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sharing = this.game.sharing;
  }

}
