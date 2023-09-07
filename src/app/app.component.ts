import { Component, OnInit, inject,Input } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() userInfo!: UserInfo;

  title = 'man-hinh';
  Data: any;
  item: any;
  UserService: UserService = inject(UserService);
  filteredUserList: UserInfo[] = [];

  isVisible = false;
  UserInfoList: any = [ ];
  constructor(private readonly userService: UserService) {
    this.UserInfoList = this.UserService.getAllUserlist();
    this.filteredUserList = this.UserInfoList;

  }
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleOk(Data: any): void {
    this.handleData(Data);
    alert('Thêm người dùng thành công');
    this.isVisible = false;
    window.location.reload();
  }
  handleData(name: any) {
    let id = this.UserInfoList.length + 1;
    const item: UserInfo = {
      id: id,
      name: name.name,
      phone: name.phone,
      email: name.email,
      address: name.address,
      city: name.city,
      district: name.district,
      ward: name.ward,
    };
    this.UserInfoList.push(item);

    localStorage.setItem('Data', JSON.stringify(this.UserInfoList));
  }

  ngOnInit(): void {

    const data = localStorage.getItem('Data');
    if (data) {
      const parsedData = JSON.parse(data);
      this.UserInfoList = parsedData;
      console.log(this.UserInfoList);
    }
    else {
    localStorage.setItem('Data', JSON.stringify(this.UserInfoList));

    }
  }
}
export interface UserInfo {
  id: number;
  name: string;
  phone: number;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}
