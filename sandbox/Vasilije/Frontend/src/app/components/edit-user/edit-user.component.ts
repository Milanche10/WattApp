import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  @Input() user?: User;
  @Output() usersUpdated = new EventEmitter<User[]>();

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {

  }

  updateUser(user: User) {
    this.userService
      .updateUser(user)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
  }

  deleteUser(user: User) {
    this.userService
      .deleteUser(user)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
  }

  createUser(user: User) {
    this.userService
      .createUser(user)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
  }
}
