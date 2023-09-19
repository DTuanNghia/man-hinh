import { Component, Input, OnInit, EventEmitter, Output,ViewChild,ElementRef } from '@angular/core';
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
  @ViewChild('mySelect') mySelect!: ElementRef;
  @ViewChild('mySelect1') mySelect1!: ElementRef;

  isOpen: boolean = false;

  newData: any;
  name?: string;
  phone?: number;
  email: string = '';
  address?: string;
  city: string = 'Chọn giá trị';
  district: string = 'Chọn giá trị';
  ward: string = 'Chọn giá trị';
  isDirty = false;
  selectedOption!: string;
  emailIsValid?: boolean;

  regexEmail =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  checkInput(): void {
    const selectedValue = this.mySelect?.nativeElement.value;
    const selectedValue1 = this.mySelect1?.nativeElement.value;
    if (
      !this.name ||
      !this.address ||
      selectedValue === "none" ||
      selectedValue1 === "none"
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
