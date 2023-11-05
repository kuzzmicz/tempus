import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: string){
   return this.webRequestService.post('lists', {title});
  }

  getLists(){
    return this.webRequestService.get('lists');
  }

  getTasks(listId: string){
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

}
