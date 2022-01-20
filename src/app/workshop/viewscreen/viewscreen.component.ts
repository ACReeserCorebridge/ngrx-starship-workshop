/**
 * this is a complete widget!
 * nothing is required to make it work, but you can improve it and make it better if you want
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { share, tap } from 'rxjs';
import { AppState } from '../../app.state';
import { SolarSystemLocation } from '../../challenge.service';
import { SnitchService } from '../../snitch.service';
import { selectViewscreen } from '../computer.selectors';

/**
 * the initial view state that the viewscreen component needs
 *
 * you may ADD to the interface but may not REMOVE from it
 */
export interface ViewscreenState {
  location: SolarSystemLocation,
  course?: SolarSystemLocation,
  leftImage: string|undefined,
  centerImage: string|undefined,
  rightImage: string|undefined,
  laser: boolean,
  tractor: boolean,
  satellite: boolean,
  asteroid: boolean
}

@Component({
  selector: 'app-viewscreen',
  templateUrl: './viewscreen.component.html',
  styleUrls: ['./viewscreen.component.sass']
})
export class ViewscreenComponent {

  constructor(private store: Store<AppState>, private snitch: SnitchService) { }

  public view$ = this.store.select(selectViewscreen).pipe(
    //DO NOT change the tap and share operators below
    tap((env: ViewscreenState) => {
      this.snitch.OnVisualChange({
        location: env.location,
        course: env.course,
        tractorView: env.tractor,
        laserView: env.laser,
        satelliteView: env.satellite,
        asteroidView: env.asteroid
      });
    }),
    share()
  );
}
