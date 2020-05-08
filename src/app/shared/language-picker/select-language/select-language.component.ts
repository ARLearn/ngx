import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  constructor(private translate: TranslateService) {
  }

  selectLang(lang:string){
    this.translate.use(lang);
  }
  ngOnInit() {
  }

}
