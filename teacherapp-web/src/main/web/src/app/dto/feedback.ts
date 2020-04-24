export class Feedback {
    private _id: number;
    private _username: string;
    private _contactdata: string;
    private _text: string;

    constructor(data: any) {
        this._id = data.id;
        this._username = data.userName;
        this._contactdata = data.contactData;
        this._text = data.text;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get contactdata(): string {
        return this._contactdata;
    }

    set contactdata(value: string) {
        this._contactdata = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }
}