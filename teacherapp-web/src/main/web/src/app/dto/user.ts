import { LocalDate } from './local-date';
import { UserDetails } from './user-details';

export class User {
    private _id: number;
    private _email: string;
    private _password: string;
    private _newPassword: string;
    private _userDetails: UserDetails;

    public static createEmptyUser() {
        return new User({
            id : '',
            email: '',
            password: '',
            userDetails: User.createEmptyUserDetails()
        });
    }

    public static createEmptyUserDetails() {
        return new UserDetails({
            id : '',
            firstName: '',
            lastName: '',
            birthday: {
                year: '',
                month: '',
                day: ''
            },
            photoLink: ''
        });
    }

    constructor(data: any) {
        this._id = data.id ? data.id : null;
        this._email = data.email ? data.email : null;
        this._password = data.password ? data.password : null;
        this._newPassword = data.newPassword ? data.newPassword : null;
        this._userDetails = !data.userDetails || data.userDetails.id !== null ? new UserDetails(data.userDetails) :
            User.createEmptyUserDetails();
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get newPassword(): string {
        return this._newPassword;
    }

    set newPassword(value: string) {
        this._newPassword = value;
    }

    get userDetails(): UserDetails {
        return this._userDetails;
    }

    set userDetails(value: UserDetails) {
        this._userDetails = value;
    }

    public toObject() {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            newPassword: this.newPassword,
            userDetails: {
                id: this.userDetails.id,
                firstName: this.userDetails.firstName,
                lastName: this.userDetails.lastName,
                birthday: {
                    year: this.userDetails.birthday.year,
                    month: this.userDetails.birthday.month,
                    day: this.userDetails.birthday.day
                },
                photoLink: this.userDetails.photoLink
            }
        };
    }

    public printUserName() {
        if (this.userDetails.firstName !== null || this.userDetails.lastName !== null) {
            return this.userDetails.firstName + ' ' + this.userDetails.lastName;
        } else {
            return '';
        }
    }

    public isEmptyPhotoLink() {
        return this.userDetails.photoLink === null;
    }

    public getPhotoLink() {
        return this.userDetails.photoLink;
    }
}
