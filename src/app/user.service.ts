import { Injectable } from '@angular/core';
// import { UserInfo } from './userInfo';
import { UserInfo } from './userInfo';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  protected UserInfoList: UserInfo[] = [
    {
      id: 1,
      name: 'Dinh Tuan Nghiaa',
      phone: 1123456,
      email: 'nghia123@gmail.com',
      address: '16 Hoa Binh , Kham Thien ,Dong Da',
      city: 'hn',
      district: 'huyen1',
      ward: 'xa1',
    },
    {
      id: 2,
      name: ' Tuan Nghia',
      phone: 123456789,
      email: 'nghia1@gmail.com',
      address: '16 Hoa Binh , Kham Thien ,Dong Da',
      city: 'hcm',
      district: 'huyen2',
      ward: 'xa2',
    },
    {
      id: 3,
      name: ' Nghia',
      phone: 12345689,
      email: 'nghia2@gmail.com',
      address: '16 Hoa Binh , Kham Thien ,Dong Da',
      city: 'hn',
      district: 'huyen1',
      ward: 'xa2',
    },
    {
      id: 4,
      name: 'Dinh Nghia',
      phone: 123456753,
      email: 'nghia3@gmail.com',
      address: '16 Hoa Binh , Kham Thien ,Dong Da',
      city: 'hcm',
      district: 'quan1',
      ward: 'xa3',
    },
    {
      id: 5,
      name: 'Dinh Nghia',
      phone: 123456753,
      email: 'nghia3@gmail.com',
      address: '16 Hoa Binh , Kham Thien ,Dong Da',
      city: 'hcm',
      district: 'quan2',
      ward: 'xa1',
    },
    {
      id: 6,
      name: 'Dinh Nghia',
      phone: 123456753,
      email: 'nghia3@gmail.com',
      address: '16 Hoa Binh , Kham Thien ,Dong Da',
      city: 'hn',
      district: 'quan1',
      ward: 'xa3',
    },
  ];

  ngOnInit(): void {}
  getAllUserlist(): UserInfo[] {
    return this.UserInfoList;
  }
  updateUser(user: any): void {
    const index = this.UserInfoList.findIndex((u) => u.id === user.id);
    if (index !== 0) {
      this.UserInfoList[index] = user;
      console.log(index);
    }
  }
  getUserlistByEmail(email: string): UserInfo | undefined {
    return this.UserInfoList.find((UserInfo) => UserInfo.email === email);
  }
  saveData(key: string, formData: any) {
    localStorage.setItem('Data', JSON.stringify(formData));
  }
}
