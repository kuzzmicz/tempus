import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/note.service';
@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent {
  notes?: Note[];
  constructor(private noteService:NoteService){}
  ngOnInit(){
  this.noteService.getNotes().subscribe(next=>{
    const notes: Note[] = next as Note[]
     this.notes=notes;
   })
   }
}
