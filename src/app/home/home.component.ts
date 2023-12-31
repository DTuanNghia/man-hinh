import { UserService } from './../user.service';
import {
  Component,
  inject,
  Input,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserInfo } from '../userInfo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class homeComponent implements OnInit {
  @Input() userInfo!: UserInfo;
  @Output() formUserEvent = new EventEmitter<any>();

  myForm: FormGroup;

  searchQuery: any;
  isAscending = true;
  isButtonVisible = false;
  modalOpen = false;
  editId!: number;
  name!: string;
  phone!: number;
  email: string = '';
  address: string = '';
  city: string = '';
  district: string = '';
  ward: string = '';
  isDisabled = false;
  selectedValue!: string;
  UserInfoList: any[] = [];
  UserService: UserService = inject(UserService);
  filteredUserList: UserInfo[] = [];
  searchInput: any;
  value: any;
  editData: string = '';

  showConfirmation: boolean = false;
  page = 1;
  pageSize = 5;
  currentPage = 1;
  startItem!: number;
  endItem!: number;

  regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      ward: new FormControl(''),
    });
    this.UserInfoList = this.UserService.getAllUserlist();
    this.filteredUserList = this.UserInfoList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredUserList = this.UserInfoList;
    }
    this.filteredUserList = this.UserInfoList.filter(
      (UserInfo: { email: string }) =>
        UserInfo?.email.toLowerCase().includes(text.toLowerCase())
    );
  }

  sort() {
    if (this.isAscending) {
      this.filteredUserList.sort((a, b) => b.name.localeCompare(a.name));
      console.log('down');
      this.isAscending = false;
    } else {
      this.filteredUserList.sort((a, b) => a.name.localeCompare(b.name));
      console.log('up');
      this.isAscending = true;
    }
  }
  sortEmail() {
    if (this.isAscending) {
      this.filteredUserList.sort((a, b) => b.email.localeCompare(a.email));
      this.isAscending = false;
    } else {
      this.filteredUserList.sort((a, b) => a.email.localeCompare(b.email));
      this.isAscending = true;
    }
  }

  deleteItem(id: number): void {
    const index = this.filteredUserList.findIndex(
      (item: any) => item.id === id
    );
    if (index > -1 && confirm('Bạn có chắc chắn muốn xóa người dùng này ?')) {
      this.UserInfoList.splice(index, 1);
      localStorage.setItem('Data', JSON.stringify(this.UserInfoList));
    }
  }

  edit(id: any): void {
    const data = JSON.parse(localStorage.getItem('Data') || '');
    const userSelected = data.find((item: { id: string }) => item.id === id);
    this.myForm.patchValue(userSelected);
    this.editId = id;
    this.modalOpen = true;
    this.isButtonVisible = true;
  }

  onSubmit() {
    const formData = this.myForm.value; // Lấy giá trị của form
    localStorage.setItem('userData', JSON.stringify(formData));
    const Editdata = localStorage.getItem('userData');
    if (Editdata) {
      const parsedData = JSON.parse(Editdata);
      this.filteredUserList = [
        ...this.UserInfoList.map((item) => {
          if (item.id === this.editId) {
            return { ...item, ...parsedData };
          }
          return item;
        }),
      ];
    }
    if (Editdata) {
      const parsedData = JSON.parse(Editdata);
      if (!this.regexEmail.test(parsedData.email)) {
        alert('Vui lòng nhập đúng định dạng email');
      } else if (!this.regexPhone.test(parsedData.phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ');
      } else {
        alert('Sửa thông tin người dùng thành công');
        localStorage.setItem('Data', JSON.stringify(this.filteredUserList));
        window.location.reload();
        this.closeModal();
      }
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape() {
    this.closeModal();
  }

  showInfo(id: any) {
    const fieldsToDisable = [
      'name',
      'phone',
      'email',
      'address',
      'city',
      'district',
      'ward',
    ];
    fieldsToDisable.forEach((field) => {
      this.myForm.get(field)?.disable();
    });

    const data = JSON.parse(localStorage.getItem('Data') || '');
    const userSelected = data.find((item: { id: string }) => item.id == id);
    this.myForm.patchValue(userSelected);
    this.isButtonVisible = false;
    this.modalOpen = true;
  }

  closeModal() {
    localStorage.removeItem('userData');
    const fieldsToEnable = [
      'name',
      'phone',
      'email',
      'address',
      'city',
      'district',
      'ward',
    ];
    fieldsToEnable.forEach((field) => {
      this.myForm.get(field)?.enable();
    });

    this.modalOpen = false;
    this.myForm.reset();
  }

  preventPropagation(event: Event) {
    event.stopPropagation();
  }

  updateItemCount(): void {
    this.startItem = (this.page - 1) * this.pageSize + 1;
    this.endItem = Math.min(
      this.startItem + this.pageSize - 1,
      this.filteredUserList.length
    );
  }

  ngOnInit(): void {
    this.updateItemCount();
    const data = localStorage.getItem('Data');

    if (data) {
      const parsedData = JSON.parse(data);
      this.filteredUserList = parsedData;
      this.UserInfoList = this.filteredUserList;
    } else {
      localStorage.setItem('Data', JSON.stringify(this.UserInfoList));
    }
  }
}
