import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/utils/global/IGlobal';


@Component({
  selector: 'app-dso-profile',
  templateUrl: './dso-profile.component.html',
  styleUrls: ['./dso-profile.component.css']
})
export class DsoProfileComponent {

  fileName = '';
  imageSrc: string;


  public glob = Global


  @Input() user!:User
  constructor(private userService: UserService, private http: HttpClient){
    this.userService.getUserBy(sessionStorage.getItem("user")!).subscribe(response=>{
      this.user = response;
    });
    this.imageSrc = '';
  }
  
  getFullName() {    
    return this.user?.firstName + " " + this.user?.lastName;
  }

  getEmail() {    
    return this.user?.email;
  }

  getUserName() {    
    return this.user?.username
  }

  getPass() {    
    return this.user?.password
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("UploadImage", file);

        const upload$ = this.http.post("/api/user/UploadImage", formData);

        upload$.subscribe();
    }
}

}
