import {type} from "os";
import internal from "stream";

class Person {
    Name: string;
    Family: string;
    Age: number;
}

class University {
    Name: string;
    FoundationDate: Date;
}

export class Student extends Person {
    ID: number;
    University: University;

    toString: Function = (): string => {
        return `${this.Name} | ${this.Family}`;
    };
}

const IUST: University = {FoundationDate: new Date(), Name: "IUST"};

const porya: Student = {
    Age: 20,
    Name: "Porya",
    Family: "Zarei",
    ID: 99999999,
    University: IUST,
};

console.log(porya.toString());

type F<I, O> = (x:I|I[]) => O;