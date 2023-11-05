import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NoteViewComponent } from './pages/note-view/note-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch:"full"},
  {path:'notes', component: NoteViewComponent},
  {path:'new-list', component: NewListComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'lists', component: TaskViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
