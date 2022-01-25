/**
 * DO NOT change this file
 */
import { Injectable } from "@angular/core";
import { Subject, scan, share } from "rxjs";
import { IExpectations } from "./challenge.service";

export interface MetaStatistics {
    actions: number,
    stateSize: number,
    failures: number
}

@Injectable({
    providedIn: 'root'
})
export class SnitchService{
    private visualState: Required<IExpectations> = {
        docking: true,
        engine: 0,
        laser: 0,
        location: 'LEO',
        course: 'LEO',
        shield: 0,
        tractorbeam: false,
        satelliteView: false,
        asteroidView: false,
        laserView: false,
        tractorView: false,
    }
    private metaStatistic$ = new Subject<Partial<MetaStatistics>>();
    public MetaStatistics$ = this.metaStatistic$.pipe(
        scan((acc, val) => {
            if (val.actions != null)
                acc.actions += val.actions;

            if (val.stateSize != null)
                acc.stateSize = Math.max(acc.stateSize, val.stateSize);

            if (val.failures != null)
                acc.failures = acc.failures + val.failures;

            return acc;
        }, {
            actions: 0,
            stateSize: 0,
            failures: 0
        }),
        share()
    );

    /**
     * this "snitch" code allows the code to be graded
     * 
     * by emitting the visual state of the component
     * 
     * so it can be matched against expectations
     * @param data
     */
    public OnVisualChange(data: IExpectations){
        (Object.keys(data) as Array<keyof IExpectations>).forEach((k) => {
            (<any>this.visualState[k]) = data[k];
        });
    }

    public OnStateChange(meta: Partial<MetaStatistics>){
        this.metaStatistic$.next(meta);
    }

    public GetExpectationFailures(expectation: IExpectations): string[]{
        return (Object.keys(expectation) as Array<keyof IExpectations>).filter((k) => {
            const failure = this.visualState[k] != expectation[k];
            if (failure){
                // console.log(`${k} expected to be ${expectation[k]}, instead got ${this.visualState[k]}`);
            }
            return failure;
        });
    }

    public ValidatePowerVisualState(): number{
        let errors = 0;

        const totalPower = this.visualState.engine + this.visualState.laser + this.visualState.shield;
        if (totalPower < 0){
            errors += 1;
        }
        else if (totalPower > 10){
            errors += 1;
        }

        if (errors > 0){
            // console.log("Expected total power of engine+laser+shields to be between 0 and 10, instead got "+totalPower);
            this.metaStatistic$.next({failures: errors});
        }
        return errors;
    }
}