import { Feedback } from './feedback';

export class FeedbackList {
    private _feedbacks: Feedback[] = [];

    constructor(data: any) {
        data.feedbacksDTO.forEach(feedback => {
            this._feedbacks.push(new Feedback(feedback));
        });
    }

    get feedbacks(): Feedback[] {
        return this._feedbacks;
    }

    set feedbacks(value: Feedback[]) {
        this._feedbacks = value;
    }
}