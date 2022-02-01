import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, share, tap } from 'rxjs';
import { AppState } from '../app.state';
import { SnitchService } from '../snitch.service';
import { selectLasers } from '../workshop/computer.selectors';

@Component({
  selector: 'app-lasers-widget',
  templateUrl: './lasers-widget.component.html',
  styleUrls: ['./lasers-widget.component.scss']
})
export class LasersWidgetComponent implements OnInit {

  constructor(private store: Store<AppState>, private snitch: SnitchService) { }

  ngOnInit(): void {
  }

  percent$ = this.store.select(selectLasers).pipe(
      //DO NOT change the tap and share operators below
      tap((laserPowerAmount: number) => 
      { 
        this.snitch.OnVisualChange({laser: laserPowerAmount})
      }),
      share()
  );
  percentClass$ = this.percent$.pipe(
      map(y => "percent-"+y)
  );
  percentStr$ = this.percent$.pipe(
      map(z => (z*10)+'%')
  );
}
