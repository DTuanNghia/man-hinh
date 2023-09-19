import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { homeComponent } from './home/home.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Route } from '@angular/router';
import { UserService } from './user.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgxPaginationModule } from 'ngx-pagination';

// ng zorro
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//ng material
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
registerLocaleData(en);

const routes: Route[] = [
  { path: 'home', component: homeComponent },
  { path: 'user', component: UserEditComponent },
];

@NgModule({
  declarations: [AppComponent, homeComponent, UserEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NzModalModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzTabsModule,
    NzPaginationModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, UserService],

  bootstrap: [AppComponent],
})
export class AppModule {}
