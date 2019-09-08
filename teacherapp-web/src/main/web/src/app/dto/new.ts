import { LocalDate } from './local-date';
import { User } from './user';

export class New {
    private _id: number;
    private _title: string;
    private _text: string;
    private _created: LocalDate;
    private _user: User;

    constructor(data: any) {
        this._id = data.id;
        this._title = data.title;
        this._text = data.text;
        this._created = data.created ? new LocalDate(data.created) : null;
        this._user = new User(data.userDTO);
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get created(): LocalDate {
        return this._created;
    }

    set created(value: LocalDate) {
        this._created = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    public toObject() {
        return {
            id: this.id,
            title: this.title,
            text: this.text,
            user: {
                id: this.user.id
            }
        };
    }
}
