import { IComputerDirective, SolarSystemLocation } from "src/app/challenge.service";

export class LocationService {
    /**
     * If the captain says to disengage the engines it means we're already in the location set in the course, 
     * or if the captain says to fully engage the engines we're going to travel at the speed of light and imediatelly be on the location set in the course :D
     * @param directive 
     * @param currentCourse 
     * @param currentLocation 
     * @returns 
     */
    public static DefineLocationBasedOnEngineDirectives(directive: IComputerDirective, currentCourse: SolarSystemLocation, currentLocation: SolarSystemLocation) {
        return (directive.verb == 'disengage') || (directive.verb == 'engage' && directive.adverb == 'fully') ? currentCourse : currentLocation
    }
}