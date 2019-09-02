import { Folder } from './folder';

export class FoldersList {
    private _folders: Folder[] = [];

    constructor(data: any) {
        data.folders.forEach(folder => {
            this._folders.push(new Folder(folder));
        });
    }

    get folders(): Folder[] {
        return this._folders;
    }

    set folders(value: Folder[]) {
        this._folders = value;
    }
}
