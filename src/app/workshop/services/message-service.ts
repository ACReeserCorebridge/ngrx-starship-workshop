import { IComputerDirective } from "src/app/challenge.service";

export class MessageService {

    public static directivesToMessage(directives: IComputerDirective[]): string {
        let messages: string[] = [];
        directives.forEach(directive => messages.push(this.directiveToMessage(directive)));
        return `ACK > ${messages.join(' AND ')}`;
    }

    /**
     * this is a helper method to turn a computer directive into a short string
     *
     * you can change this!
     * @param d
     * @returns
     */
    private static directiveToMessage(d: IComputerDirective): string {
        let result = "";
        if (d.adverb)
            result += d.adverb.toUpperCase() + " ";
        result += d.verb.toUpperCase();
        result += ' THE ';
        result += d.directObject.toUpperCase();
        if (d.adjectivalPhrase)
            result += " " + d.adjectivalPhrase.toUpperCase();
        return result;
    }
}