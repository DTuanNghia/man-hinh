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
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  inputValue: string = '';
  data = '';
  searchQuery: any;

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

  UserInfoList: any[] = [];
  UserService: UserService = inject(UserService);
  filteredUserList: UserInfo[] = [];
  searchInput: any;
  value: any;
  isEditting = false;
  editData: string = '';

  totalPages!: number;
  currentPage: number = 1;
  pageSize: number = 5;
  displayData: any = [];
  pages!: number[];

  regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private route: ActivatedRoute) {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.regexEmail)]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      ward: new FormControl('', Validators.required),
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

  deleteItem(id: number): void {
    const index = this.filteredUserList.findIndex(
      (item: any) => item.id === id
    );
    if (index > -1) {
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
    localStorage.setItem('userData', JSON.stringify(formData)); // Lưu vào LocalStorage
    const Editdata = localStorage.getItem('userData');
    if (Editdata) {
      const parsedData = JSON.parse(Editdata);
      this.filteredUserList = [...this.UserInfoList.map(item => {
        if(item.id === this.editId) {
          return {...item, ...parsedData};
        }
        return item;
      })];
    }
    localStorage.setItem('Data', JSON.stringify(this.filteredUserList));
    window.location.reload();
    this.closeModal();

  }

  @HostListener('document:keydown.escape')
  closeOnEscape() {
    this.closeModal();
    this.myForm.reset()
  }

  openModal(id: any) {
    const data = JSON.parse(localStorage.getItem('Data') || '');
    const userSelected = data.find((item: { id: string }) => item.id == id);
    this.myForm.patchValue(userSelected);
    this.isButtonVisible = false;
    this.modalOpen = true;
  }

  closeModal() {
    localStorage.removeItem('userData');
    this.modalOpen = false;

  }

  preventPropagation(event: Event) {
    event.stopPropagation();
  }
  getCurrentRowCount(): number {
    const rowsPerPage = 5; // Số dòng trên mỗi trang
    const currentPage = this.currentPage;
    return Math.min(
      this.filteredUserList.length - (currentPage - 1) * rowsPerPage,
      rowsPerPage
    );
  }
  previousPage(): void {
    this.currentPage--;
  }

  nextPage() {
    this.currentPage++;
    this.totalPages = Math.ceil(this.UserInfoList.length / this.pageSize);
    this.getCurrentRowCount();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
    });
    const data = localStorage.getItem('Data');

    if (data) {
      const parsedData = JSON.parse(data);
      this.filteredUserList = parsedData;
      this.UserInfoList = this.filteredUserList;
      console.log(parsedData);
    } else {
      localStorage.setItem('Data', JSON.stringify(this.UserInfoList));
    }
  }
}
