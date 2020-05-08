import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-editor-license',
  templateUrl: './editor-license.component.html',
  styleUrls: ['./editor-license.component.css']
})
export class EditorLicenseComponent implements  OnChanges {
  @Input() game;

  license: string;
  options: string[] = [
    'cc-by',
    'cc-by-nd',
    'cc-by-sa',
    'cc-by-nc',
    'cc-by-nc-sa',
    'cc-by-nc-nd'
  ];
  constructor() { }

  changeLicense(event: MatRadioChange) {
    this.game.licenseCode = event.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.license = this.game.licenseCode;
  }

}
