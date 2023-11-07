import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NoteViewComponent } from './pages/note-view/note-view.component';

import { HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterComponent } from './pages/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NoteViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    CalendarViewComponent,
    MainPageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
