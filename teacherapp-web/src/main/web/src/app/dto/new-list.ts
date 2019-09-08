import { New } from './new';

export class NewsList {
    private _news: New[] = [];

    constructor(data: any) {
        data.newsDTO.forEach(note => {
            this._news.push(new New(note));
        });
    }

    get news(): New[] {
        return this._news;
    }

    set news(value: New[]) {
        this._news = value;
    }
}
