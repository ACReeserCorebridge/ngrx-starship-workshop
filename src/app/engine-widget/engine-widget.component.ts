import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, share, tap } from 'rxjs';
import { AppState } from '../app.state';
import { SnitchService } from '../snitch.service';
import { selectEngine } from '../workshop/computer.selectors';

@Component({
  selector: 'app-engine-widget',
  templateUrl: './engine-widget.component.html',
  styleUrls: ['./engine-widget.component.scss']
})
export class EngineWidgetComponent implements OnInit {

  constructor(private store: Store<AppState>, private snitch: SnitchService) { }

  ngOnInit(): void {
  }

  percent$ = this.store.select(selectEngine).pipe(
    tap((enginePowerAmount: number) => this.snitch.OnVisualChange({engine: enginePowerAmount})),
    share()
  );
  percentClass$ = this.percent$.pipe(
    map(y => "percent-"+y)
  );
  percentStr$ = this.percent$.pipe(
    map(z => (z*10)+'%')
  );

}
