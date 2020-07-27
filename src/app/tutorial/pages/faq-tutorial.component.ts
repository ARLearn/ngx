import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from 'src/app/core/reducers';
import {getFaqGames} from "../store/tutorial.selector";

@Component({
  selector: 'app-faq-tutorial',
  template: `
    <app-top-level-navbar [title]="'FAQ'">
      <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
    </app-top-level-navbar>
    <div class="bg-white">
      <div class="maxwidth">
        <div class="questions-wrapper">
          <div class="sidebar">
            <button class="btn-category selected">Getting started</button>
            <button class="btn-category">Creating games</button>
            <button class="btn-category">Exploring games</button>
            <button class="btn-category">Templates</button>
            <button class="btn-category">Tips & tricks</button>
            <button class="btn-category">Account</button>
            <button class="btn-category">Meer...</button>
          </div>

          <div class="main-content">
            <app-faq-list-questions></app-faq-list-questions>
        </div>
        </div>
      </div>
    </div>
  `,
  styles: [
      `
     .questions-wrapper {
       display: flex;
       min-height: calc(100vh - 144px);
     }
     .sidebar {
       display: flex;
       flex-direction: column;
       justify-content: center;
       min-width: 280px;
       margin-right: 40px;
       padding-right: 50px;
       
       border-right: 1px solid #DDDDDD;
     }
    .btn-category {
      display: block;
      width: 100%;
      margin-bottom: 2px;
      padding: 0.5rem 1rem;
      background: none;
      text-align: left;
      outline: none;
      border: none;
      cursor: pointer;
    }
    .btn-category.selected {
      font-weight: 500;
    }
    .btn-category.selected,
    .btn-category:hover {
      background-color: #f2f9fd;
    }
    .main-content {
      flex: 1;
    }
    `
  ]
})
export class FaqTutorialComponent implements OnInit {

  subMenuItems = [
    {
      routerLink: '/portal/tutorial/video',
      label: 'HELP.VIDEO_INSTRUCTIONS'
    },
    {
      routerLink: '/portal/tutorial/faq',
      label: 'HELP.QUESTIONS'
    },
  ];

  constructor(public store: Store<State>) { }

  ngOnInit(): void {}

}
