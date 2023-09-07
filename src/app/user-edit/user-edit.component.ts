import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { UserInfo } from '../userInfo';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @Input() userInfo!: UserInfo;
  @Output() formUserEvent = new EventEmitter<any>();

  newData: any;
  name?: string;
  phone?: number;
  email: string = '';
  address?: string;
  city: string = 'Chọn giá trị';
  district: string = 'Chọn giá trị';
  ward: string = 'Chọn giá trị';
  isDirty = false;
  emailIsValid?: boolean;

  regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private appComponent: AppComponent) {}

  onSave() {

    const UserData = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
      city: this.city,
      district: this.district,
      ward: this.ward,
    };
    
    this.formUserEvent.emit(UserData);

  }
  onInputChange() {
    this.isDirty = true;
  }

  selectOption(option: string) {
    this.city = option;
  }
  selectOption1(option: string) {
    this.district = option;
  }
  selectOption2(option: string) {
    this.ward = option;
  }

  checkInput(): void {
    if (
      !this.name ||
      !this.address ||
      this.city === 'Chọn giá trị' ||
      this.district === 'Chọn giá trị'
    ) {
      alert('Vui lòng điền đầy đủ thông tin');
    } else if (!this.regexEmail.test(this.email)) {
      alert('Vui lòng nhập đúng định dạng email');
    } else {
      this.onSave();
    }
  }
  handleCancel() {
    this.appComponent.isVisible = false;
  }
  ngOnInit() {}
}
