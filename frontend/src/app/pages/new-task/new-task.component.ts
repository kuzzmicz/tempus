import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  constructor(private taskService: TaskService, private route:ActivatedRoute, private router:Router){}
   listId!: string;
   ngOnInit(){
  this.route.params.subscribe(
    (params: Params) => {
       this.listId = params['listId'];
    })
  }
  createTask(title: string,){
    this.taskService.createTask(title, this.listId).subscribe(next=>{
      const newTask: Task = next as Task;
      this.router.navigate(['../'], {relativeTo: this.route});
    });
    }
}
