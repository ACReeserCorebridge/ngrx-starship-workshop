import { IComputerDirective } from "../../challenge.service";

const MIN_SHIELDS = 0;
const HALF_SHIELDS = 5;
const FULL_SHIELDS = 10;

export class ShieldService {
  public static ChangeShieldBasedOnDirective(directive: IComputerDirective, currentShieldValue: number): number {
    if (directive.verb == 'engage') {
      switch (directive.adverb) {
        case 'fully':
          return FULL_SHIELDS;
        case 'halfway':
          return HALF_SHIELDS;
        default:
          return currentShieldValue;
      }
    } else if (directive.verb == 'disengage') {
      return MIN_SHIELDS;
    }

    return currentShieldValue;
  }
}
