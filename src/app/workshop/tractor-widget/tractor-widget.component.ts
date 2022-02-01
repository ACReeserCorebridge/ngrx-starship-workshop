/**
 * this is an incomplete widget!
 * it is missing its selector!
 */
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { share, tap } from 'rxjs';
import { AppState } from '../../app.state';
import { SnitchService } from '../../snitch.service';
import { selectTractorbeam } from '../computer.selectors';

@Component({
  selector: 'app-tractor-widget',
  templateUrl: './tractor-widget.component.html',
  styleUrls: [
    './tractor-widget.component.scss',
    '../console-widget.scss'
  ]
})
export class TractorWidgetComponent implements OnInit {

  constructor(private store: Store<AppState>, private snitch: SnitchService) { }

  ngOnInit(): void {
    this.firing$.subscribe(x => this.hostClass = x ? 'firing' : 'unfired');
  }

  public firing$ = this.store.select(selectTractorbeam).pipe(
    //DO NOT change the tap and share operators below
    tap((tractorbeam: boolean) => {
      this.snitch.OnVisualChange({ tractorbeam: tractorbeam });
    }),
    share()
  );

  @HostBinding("class")
  public hostClass: string = 'unfired';
}
