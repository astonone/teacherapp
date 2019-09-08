import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
import { User } from '../../dto/user';
import { LocalDate } from '../../dto/local-date';
import { Observable } from 'rxjs';
import { FileService } from '../../services/file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public loggedUser: User;
  public birthday: Date;
  public isAccountDataNotCorrect: boolean;
  public isAccountInfoDataNotCorrect: boolean;
  public uploadedFile: any;
  public isEmpty: boolean;
  public isError: boolean;
  public isSuccess: boolean;
  public isSuccessLoading: boolean;
  public isLoading: boolean;
  public isSaving: boolean;
  public isSuccessAccountSaving: boolean;
  public photos: Observable<string[]>;
  public portfolioUser: User = User.createEmptyUser();

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private shared: SharedService,
              private userService: UserService,
              private fileService: FileService,
              private router: Router) {
      this.loadPortfolioUser();
      this.isAccountDataNotCorrect = false;
      this.isAccountInfoDataNotCorrect = false;
      this.loggedUser = this.shared.getLoggedUser();
      this.birthday = this.loggedUser.userDetails.birthday.toDate();
  }

   ngOnInit() {
       if (this.shared.getLoggedUser() === null) {
           this.router.navigate(['home']);
       }
   }

   loadPortfolioUser() {
      this.userService.getPortfolioUser().subscribe(data => {
          this.portfolioUser = new User(data);
          this.getPhoto();
      });
   }

    public saveUserInfo() {
      if (this.validUserInfo()) {
          if (this.birthday !== null) {
              this.loggedUser.userDetails.birthday = LocalDate.fromDate(this.birthday);
          }
          this.userService.updateUserInfo(this.loggedUser)
              .subscribe(data => {
                  this.isSuccess = true;
                  this.isAccountInfoDataNotCorrect = false;
                  this.loggedUser = new User(data);
                  this.shared.updateLoggedUser(this.loggedUser);
                  this.getPhoto();
                  if (this.birthday !== null) {
                    this.birthday = this.loggedUser.userDetails.birthday.toDate();
                  }
              }, error => {
                  this.isAccountInfoDataNotCorrect = true;
                  this.isSuccess = false;
              });
      } else {
          this.isAccountInfoDataNotCorrect = true;
          this.isSuccess = false;
      }
  }

  private validUserInfo() {
      return !(this.loggedUser.userDetails.firstName === '') || !(this.loggedUser.userDetails.lastName === '') ||
          !(this.birthday !== null);
  }

  public saveAccount() {
      const email = this.loggedUser.email;
      const password = this.loggedUser.newPassword;
     this.userService.updateUser(this.loggedUser.toObject())
         .subscribe(data => {
             this.isAccountDataNotCorrect = false;
             this.isSuccessAccountSaving = true;
             this.loggedUser = new User(data);
             this.shared.getStorage().setItem('token', btoa(email + ':' + password));
             this.shared.updateLoggedUser(this.loggedUser);
             this.getPhoto();
         }, error => {
             this.isAccountDataNotCorrect = true;
             this.isSuccessAccountSaving = true;
         });
  }

  public deleteAccount() {
      this.userService.deleteUser(this.loggedUser.id)
          .subscribe(() => {
             this.shared.logout();
          });
  }

  public selectFile(event) {
     this.selectedFiles = event.target.files;
     this.isError = false;
     this.isSuccess = false;
     this.isLoading = false;
     this.isSaving = false;
  }

  public upload() {
     this.progress.percentage = 0;

     this.currentFileUpload = this.selectedFiles.item(0);
     this.fileService.uploadPortfolioPhoto(this.currentFileUpload)
         .subscribe(event => {
         if (event.type === HttpEventType.UploadProgress) {
             this.progress.percentage = Math.round(100 * event.loaded / event.total);
             this.isLoading = true;
             if (this.progress.percentage === 100) {
                 this.isLoading = false;
                 this.isSaving = true;
             }
         } else if (event instanceof HttpResponse) {
             this.userService.getPortfolioUser()
                 .subscribe(data => {
                     this.portfolioUser = new User(data);
                     this.isError = false;
                     this.isEmpty = false;
                     this.isSuccessLoading = true;
                     this.isLoading = false;
                     this.isSaving = false;
                 });
         }
        }, error => {
             this.isError = true;
             this.isEmpty = false;
         });

     this.selectedFiles = undefined;
  }

  public deleteFile() {
     if (!this.loggedUser.isEmptyPhotoLink()) {
         this.fileService.deletePortfolioPhoto()
             .subscribe(data => {
                 this.isEmpty = false;
                 this.isSuccess = false;
                 this.loggedUser = new User(data);
                 this.shared.updateLoggedUser(this.loggedUser);
             });
     } else {
         this.isEmpty = true;
         this.isSuccess = false;
     }
  }

  private getPhoto() {
     this.photos = this.fileService.getPortfolioFile();
  }
}
