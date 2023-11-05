import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent{

  lists?: List[];
  tasks?: Task[];
  constructor(private taskService: TaskService, private route: ActivatedRoute){}
     ngOnInit(){
      this.route.params.subscribe(
        (params: Params) => {
        console.log(params['listId']);
        if(params['listId'] != undefined){
        this.taskService.getTasks(params['listId']).subscribe(next=>{
          const tasks: Task[] = next as Task[];
          this.tasks = tasks; 
        })}
        }

       
      )
 this.taskService.getLists().subscribe(next=>{
  const lists: List[] = next as List[]
   this.lists=lists;
 })
 }
 onTaskClick(task: Task){
   this.taskService.complete(task).subscribe(()=>{
    console.log('the task was completed');
    task.completed = !task.completed;
   });
}}
