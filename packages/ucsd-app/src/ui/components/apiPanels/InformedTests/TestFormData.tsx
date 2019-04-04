export interface ITestFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    email2: string;
    age: number;
    checkbox: boolean;
    checkboxField: boolean;
}

export class TestFormData implements ITestFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    email2: string;
    age: number;
    checkbox: boolean;
    checkboxField: boolean;

    constructor() {
        this.firstName = 'Bill';
        this.lastName = 'Nye';
        this.username = 'scienceguy';
        this.email = 'bill@nyelabs.com';
        this.email2 = 'sed@foo.com';
        this.age = 60;
        this.checkbox = true;
        this.checkboxField = true;
    }
}
