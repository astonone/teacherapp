import {Observable} from 'rxjs';

export class File {
    private _id: number;
    private _filename: string;
    private _link: Observable<string[]>;

    public static createEmptyFile() {
        return new File({
            id : '',
            filename: '',
            link: ''
        });
    }

    constructor(data: any) {
        this._id = data.id;
        this._filename = data.filename;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get filename(): string {
        return this._filename;
    }

    set filename(value: string) {
        this._filename = value;
    }

    get link(): Observable<string[]> {
        return this._link;
    }

    set link(value: Observable<string[]>) {
        this._link = value;
    }

    public toObject() {
        return {
            id: this.id,
            filename: this.filename
        };
    }
}
