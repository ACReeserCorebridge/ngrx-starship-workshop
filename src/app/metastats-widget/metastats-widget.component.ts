/**
 * DO NOT change this file!
 * 
 * this component displays statistics about the behavior of the code
 */
import { Component, OnInit } from '@angular/core';
import { SnitchService } from '../snitch.service';

@Component({
  selector: 'app-metastats-widget',
  templateUrl: './metastats-widget.component.html',
  styleUrls: ['./metastats-widget.component.scss']
})
export class MetastatsWidgetComponent implements OnInit {

  constructor(public snitch: SnitchService) { }

  ngOnInit(): void {
  }

}
