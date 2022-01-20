import { IComputerDirective, SolarSystemLocation } from "../../challenge.service";

const LEO_COURSE = 'LEO';
const LUNA_COURSE = 'LunaOrbit';
const ASTEROID_BELT_COURSE = 'AsteroidBelt';
const LOST = '';

export class CourseService {
    public static ChangeCourseBasedOnDirective(directive: IComputerDirective, currentOrbit: SolarSystemLocation): SolarSystemLocation {
        switch (directive.adjectivalPhrase) {
            case 'to LEO':
              return LEO_COURSE;
            case 'to Luna orbit':
              return LUNA_COURSE;
            case 'to the asteroid belt':
              return ASTEROID_BELT_COURSE;
            default:
              return currentOrbit;
        }
    }
}
