/**
 * DO NOT modify this file!
 * 
 * This file 
 * 1. specifies the challenge code
 * 2. issues directives to the computer service
 * 3. listens for VISUAL changes to state
 */

import { Injectable } from "@angular/core";
import { EMPTY, expand, interval, map, Observable, of, scan, share, Subject, takeWhile, tap } from "rxjs";
import { PersonalityService } from "./personality.service";
import { SnitchService } from "./snitch.service";
import { ComputerService } from "./workshop/computer.service";

export type Adverb = 'fully'|'halfway'|'slowly';
export type Verb = 'engage'|'disengage'|'plot';
export type DirectObject = 'shields'|'engines'|'laser'|'docking clamp'|'tractorbeam'|'course';
export type AdjPhrase = 'to Luna orbit'|'to the asteroid belt'|'to LEO';
export type SolarSystemLocation = 'LunaOrbit'|'AsteroidBelt'|'LEO';

export interface IComputerDirective {
    adverb?: Adverb,
    verb: Verb,
    directObject: DirectObject,
    adjectivalPhrase?: AdjPhrase,
}
export interface IExpectations {
    /**
     * the amount of power to the shield.
     * 
     * Must be from 0-10
     */
    shield?:number,
    /**
     * the amount of power to the engine.
     * 
     * Must be from 0-10
     */
    engine?:number,
    /**
     * the amount of power to the laser.
     * 
     * Must be from 0-10
     */
    laser?:number,
    location?:SolarSystemLocation,
    course?:SolarSystemLocation,
    docking?:boolean,
    tractorbeam?:boolean,
    satelliteView?:boolean,
    asteroidView?: boolean,
    tractorView?:boolean,
    laserView?:boolean,
}
export interface IVoiceEvent{
    transcription: string;
    computerDirective?: IComputerDirective[],
    expectation?: IExpectations,
    mood?: 'angry'
}

const TickRateMS = 3000;

@Injectable({
    providedIn: 'root'
})
export class ChallengeService{
    /**
     * DO NOT modify this array! This is the test!
     * 
     * you SHOULD use it for reference!
     */
    private commands: IVoiceEvent[] = [
        {transcription: "I am taking command of the NGRX-11337, the fleet's first fully automated starship."},
        {transcription: "Our mission today is to pickup a satellite in Luna orbit and destroy an asteroid in the belt."},
        {transcription: "Let's start our mission, confident that software engineering will ensure we aren't destroyed!"},
        {
            transcription: "COMPUTER, disengage our docking clamp, then slowly engage our engines.",
            computerDirective: [{
                verb: 'disengage',
                directObject: 'docking clamp',
            }, {
                adverb: 'slowly',
                verb: 'engage',
                directObject: 'engines',
            }]
        },
        {
            expectation: {
                docking: false,
                engine: 1
            },
            transcription: "It's impolite to leave plasma thruster burns on your docking port."
        },
        {
            transcription: "COMPUTER, plot a course to Luna orbit, then fully engage the engines.",
            computerDirective: [{
                verb: 'plot',
                directObject: 'course',
                adjectivalPhrase: 'to Luna orbit'
            }, {
                adverb: 'fully',
                verb: 'engage',
                directObject: 'engines'
            }]
        },
        {
            expectation: {
                course: 'LunaOrbit',
                engine: 10,
                satelliteView: true
            },
            transcription: "With one small voice command, one giant leap into the void."
        },
        {
            transcription: "COMPUTER, disengage the engines. Time to rendezvous with the science satellite. ",
            computerDirective: [{
                verb: 'disengage',
                directObject: 'engines'
            }]
        },
        {
            expectation: {
                location: 'LunaOrbit',
                engine: 0,
                satelliteView: true
            },
            transcription: "Lock the tractor beam onto the satellite.",
        },
        {
            transcription: "COMPUTER, engage the tractorbeam. We must pull it slowly.",
            computerDirective: [{
                verb: 'engage',
                directObject: 'tractorbeam'
            }]
        },
        {
            expectation: {
                location: 'LunaOrbit',
                engine: 0,
                satelliteView: true,
                tractorbeam: true,
                tractorView: true
            },
            transcription: "Sometimes I feel like a glorified delivery driver.",
        },
        {
            transcription: "COMPUTER, disengage the tractorbeam and stow away the satellite.",
            computerDirective: [{
                verb: 'disengage',
                directObject: 'tractorbeam'
            }]
        },
        {
            expectation: {
                engine: 0,
                satelliteView: false,
                tractorbeam: false,
                tractorView: false
            },
            transcription: "Make sure our gadget is covered in packing peanuts.",
        },
        {
            transcription: "Next up, action! COMPUTER, plot a course for the asteroid belt.",
            computerDirective: [{
                verb: 'plot',
                directObject: 'course',
                adjectivalPhrase: 'to the asteroid belt'
            }]
        },
        {
            expectation: {
                satelliteView: false,
                tractorbeam: false,
                tractorView: false,
                course: 'AsteroidBelt'
            },
            transcription: "Flying through the belt reminds me of pinball. I hate pinball.",
        },
        {
            transcription: "We must be careful among the rocks. COMPUTER, halfway engage the shields and halfway engage the engines",
            computerDirective: [{
                adverb: 'halfway',
                verb: 'engage',
                directObject: 'shields'
            },{
                adverb: 'halfway',
                verb: 'engage',
                directObject: 'engines'
            }]
        },
        {
            expectation: {
                engine: 5,
                shield: 5,
                laserView: false,
                asteroidView: true
            },
            transcription: "Steady as she goes, helmsman.",
        },
        {
            transcription: "It's time to destroy this rogue asteroid. COMPUTER, disengage the engines and fire the laser at the asteroid.",
            computerDirective: [{
                verb: 'disengage',
                directObject: 'engines'
            },{
                adverb: 'halfway',
                verb: 'engage',
                directObject: 'laser'
            }]
        },
        {
            expectation: {
                location: 'AsteroidBelt',
                engine: 0,
                laser: 5,
                shield: 5,
                laserView: true,
                asteroidView: false,
            },
            transcription: "Take that, dino-killer. No extinction events today.",
        },
        {
            transcription: "We're taking damage from asteroid fragments! COMPUTER, FULLY ENGAGE THE SHIELDS!!!.",
            computerDirective: [{
                adverb: 'fully',
                verb: 'engage',
                directObject: 'shields'
            }]
        },
        {
            expectation: {
                location: 'AsteroidBelt',
                laser: 0,
                engine: 0,
                shield: 10,
                laserView: false,
                asteroidView: false
            },
            transcription: "The fragments have dissipated. Mission success!",
        },
        {
            transcription: "Let's get out of here. COMPUTER, disengage the shields and plot a course for low Earth orbit.",
            computerDirective: [{
                verb: 'disengage',
                directObject: 'shields'
            },{
                verb: 'plot',
                directObject: 'course',
                adjectivalPhrase: 'to LEO'
            }]
        },
        {
            expectation: {
                shield: 0,
                course: 'LEO',
            },
            transcription: "The best part of the job is watching the stars fly by.",
        },
        {
            transcription: "COMPUTER, fully engage the engines. Light this rocket.",
            computerDirective: [{
                adverb: 'fully',
                verb: 'engage',
                directObject: 'engines'
            }]
        },
        {
            expectation: {
                engine: 10
            },
            transcription: "The best part of the job is watching the stars fly by.",
        },
        {
            expectation: {
                location: 'LEO'
            },
            transcription: "At this speed, I'll be in time for tea...",
        },
        {
            transcription: "Land ho! COMPUTER, slowly engage the engines. I can almost taste my Earl Grey.",
            computerDirective: [{
                adverb: 'slowly',
                verb: 'engage',
                directObject: 'engines'
            }]
        },
        {
            expectation: {
                location: 'LEO',
                engine: 1,
                laser: 0
            },
            transcription: "One of these days I'm going to try and Tokyo Drift right onto the docking clamp.",
        },
        {
            transcription: "COMPUTER, disengage the engines and engage the docking clamp. It's good to be home.",
            computerDirective: [{
                verb: 'disengage',
                directObject: 'engines'
            }, {
                verb: 'engage',
                directObject: 'docking clamp'
            }]
        },
        {
            expectation: {
                docking: true,
                engine: 0
            },
            transcription: "Another successful mission due to 31st century software engineering.",
        }
    ];

    public VoiceEvents$ = interval(TickRateMS).pipe(
        tap((i) => {
            if (i === 0){
                this.computer.Initialize();
            }
        }),
        map(i => this.commands[i]),
        takeWhile(v => v != null),
        tap(v => {
            if (v?.computerDirective)
                this.computer.InterpretDirectives(v.computerDirective)
        }),
        map((v) => {
            if (v.expectation){
                const failures = this.snitch.GetExpectationFailures(v.expectation);
                if (failures.length > 0){
                    this.snitch.OnStateChange({failures: failures.length});
                    return {
                        expectation: v.expectation,
                        transcription: this.personality.GetFrustration(failures),
                        mood: 'angry'
                    } as IVoiceEvent;
                } else {
                    const powerFailures = this.snitch.ValidatePowerVisualState();
                    if (powerFailures > 0){
                        return {
                            expectation: v.expectation,
                            transcription: this.personality.GetFrustration(['power output']),
                            mood: 'angry'
                        } as IVoiceEvent;
                    }
                }
            }
            return v;
        }),
        share()
    );

    constructor(private snitch: SnitchService, private personality: PersonalityService, private computer: ComputerService){
    }
}


