import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private webRequestService: WebRequestService) {

   }
   
   createNote(title: string, text: string){
    return this.webRequestService.post('notes', {title, text});
   }
 
   getNotes(){
     return this.webRequestService.get('notes');
   }
}
