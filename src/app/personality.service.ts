import { Injectable } from "@angular/core";
import { IExpectations } from "./challenge.service";

@Injectable({
    providedIn: 'root'
})
export class PersonalityService{

    private interjections: string[] = [
        'Oh frak!',
        'Shazbot!',
        'What the frell!',
        "P’tak!",
        "Are you kriffing me?",
        'Smegging disaster!',
        'Grrrrrozit!',
        'Belgium!',
        '#$%!',
        '<expletive_deleted>'
    ];

    private frustrations: string[] = [
        'What is wrong with the @!',
        'Who wrote the @ code?!',
        'Why is the @ broken?!',
        'Who broke the @?!',
        'This @ is a disgrace!',
    ];
    
    public GetFrustration(wrongs: string[]): string{
        const interjection = this.interjections[Math.floor(Math.random() * this.interjections.length)];
        return `${interjection} ${wrongs.map(x => this.frustrations[Math.floor(Math.random() * this.frustrations.length)].replace('@', x)).join(' ')}`;
    }
} 