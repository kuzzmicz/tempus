import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NoteViewComponent } from './pages/note-view/note-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch:"full"},
  {path:'notes', component: NoteViewComponent},
  {path:'new-list', component: NewListComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId/new-task', component: NewTaskComponent},
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
