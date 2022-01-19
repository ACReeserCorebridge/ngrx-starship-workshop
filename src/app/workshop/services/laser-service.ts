import { IComputerDirective } from "../../challenge.service";

const MIN_LASER = 0;
const HALF_LASER = 5;
const FULL_LASER = 10;

export class LaserService {
  public static ChangeLaserBasedOnDirective(directive: IComputerDirective, currentLaserValue: number): number {
    if (directive.verb == 'engage') {
      switch (directive.adverb) {
        case 'fully':
          return FULL_LASER;
        case 'halfway':
          return HALF_LASER;
        default:
          return currentLaserValue;
      }
    } else if (directive.verb == 'disengage') {
      return MIN_LASER;
    }

    return currentLaserValue;
  }
}
