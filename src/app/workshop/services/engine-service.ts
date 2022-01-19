import { IComputerDirective } from "src/app/challenge.service";

const MAX_ENGINE: number = 10;
const MIN_ENGINE: number = 0;

export class EngineService {
    public static ChangeEngineBasedOnDirective(directive: IComputerDirective, currentEngineValue: number): number {
        if (directive.verb == 'engage') {
            switch (directive.adverb) {
                case "slowly":
                    return ++currentEngineValue;
                case "fully":
                    return MAX_ENGINE;
                case "halfway":
                    return MAX_ENGINE / 2;
                default: 
                    return currentEngineValue;
            }
        } else if (directive.verb == 'disengage') {
            return MIN_ENGINE;
        }
    
        return currentEngineValue;
    }
}