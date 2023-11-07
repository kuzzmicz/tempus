import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NoteViewComponent } from './pages/note-view/note-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewNoteComponent } from './pages/new-note/new-note.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path:'notes', component: NoteViewComponent},
  {path:'new-note', component: NewNoteComponent},
  {path:'new-list', component: NewListComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'notes/:noteId', component: NoteViewComponent},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId/new-task', component: NewTaskComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'calendar', component: CalendarViewComponent}, 
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
