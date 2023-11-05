import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent{

  lists: any;
  tasks: any;
  constructor(private taskService: TaskService, private route: ActivatedRoute){}
     ngOnInit(){}
     createNewList(){
this.taskService.createList('TEST').subscribe((response: any)=>{
    console.log(response);
});
     }
 
}
