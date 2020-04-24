import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {User} from '../../dto/user';
import {FeedbackService} from "../../services/feedback.service";
import {Feedback} from "../../dto/feedback";
import {FeedbackList} from "../../dto/feedback-list";

@Component({
    selector: 'feedback',
    templateUrl: './feedback.component.html',
    styleUrls: [
        './feedback.component.css'
    ]
})

export class FeedbackComponent implements OnInit {

    public user: User;

    public feedbacks: Feedback[] = [];
    public msg = {userName:'', contactData:'', text:''};
    public isSent: boolean;

    constructor(private router: Router,
                private userService: UserService,
                private feedbackService: FeedbackService,
                private shared: SharedService) {
        this.user = this.shared.getLoggedUser();
        this.isSent = false;
    }

    ngOnInit() {
        this.loadFeedbacks();
    }

    loadFeedbacks() {
        this.feedbackService.list().subscribe(data => {
            this.feedbacks = new FeedbackList(data).feedbacks;
        });
    }

    isEmptyFeedbackList() {
        return this.feedbacks.length === 0;
    }

    deleteFeedback(id: number) {
        this.feedbackService.delete(id).subscribe(result => {
            this.loadFeedbacks();
        });
    }

    send() {
        this.isSent = false;
        this.feedbackService.create(this.msg).subscribe(result => {
            this.msg = {userName:'', contactData:'', text:''};
            this.isSent = true;
        });
    }

    isValid() {
        return this.msg.userName.trim() !== '' && this.msg.contactData.trim() !== '' &&this.msg.text.trim() !== '';
    }
}
