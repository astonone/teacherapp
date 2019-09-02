import { File } from './file';

export class Folder {
    private _id: number;
    private _name: string;
    private _files: File[] = [];

    public static createEmptyFolder() {
        return new Folder({
            id : '',
            name: '',
            files: []
        });
    }

    constructor(data: any) {
        this._id = data.id;
        this._name = data.name;
        data.files.forEach(file => {
            this._files.push(new File(file));
        });
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get files(): File[] {
        return this._files;
    }

    set files(value: File[]) {
        this._files = value;
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            files: this.files,
        };
    }
}
