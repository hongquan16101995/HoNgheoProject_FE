import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, NotFoundComponent],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
