import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, map, share, tap } from 'rxjs';
import { AppState } from '../app.state';
import { SnitchService } from '../snitch.service';
import { selectDockingClamp } from '../workshop/computer.selectors';

@Component({
  selector: 'app-docking-clamp-widget',
  templateUrl: './docking-clamp-widget.component.html',
  styleUrls: [
    './docking-clamp-widget.component.scss',
    '../workshop/console-widget.scss'
  ]
})
export class DockingClampWidgetComponent implements OnInit {

  constructor(private store: Store<AppState>, private snitch: SnitchService) { }

  ngOnInit(): void {
    this.clamped$.subscribe(x => this.hostClass = x ? 'clamped': 'unclamped');
  }

  public clamped$ = this.store.select(selectDockingClamp).pipe(
    //DO NOT change the tap and share operators below
    tap((clamped: boolean) => {
      this.snitch.OnVisualChange({docking: clamped});
    }),
    share()
  );


  @HostBinding("class")
  public hostClass: string = 'unclamped';
}
