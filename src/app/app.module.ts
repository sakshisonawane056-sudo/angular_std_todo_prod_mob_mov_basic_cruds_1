import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoDashboardComponent } from './component/todo-dashboard/todo-dashboard.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { ProductDashboardComponent } from './component/product-dashboard/product-dashboard.component';
import { MovieDashboardComponent } from './component/movie-dashboard/movie-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MobileDashboardComponent } from './component/mobile-dashboard/mobile-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoDashboardComponent,
    StudentDashboardComponent,
    ProductDashboardComponent,
    MovieDashboardComponent,
    MobileDashboardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
