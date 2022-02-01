/**
 * this is a completely customizable component
 *
 * initially, it just echoes english grammar the captain says
 *
 * feel free to change anything it does
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs';
import { AppState } from '../../app.state';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-computer-messages',
  templateUrl: './computer-messages.component.html',
  styleUrls: [
    '../console-widget.scss',
    './computer-messages.component.scss'
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ height: '0', overflow: 'hidden',}),
        animate('.5s ease-in-out', style({ height: '*'})),
      ]),
    ]),
  ],
})
export class ComputerMessagesComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  public chat$ = this.store.select(x => [...Array(8)].map(e => uuidv4())).pipe(
    delay(660)
  );
}
