import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent {
  constructor(private noteService: NoteService, private router:Router){}
  createNote(title: string, text: string) {
    this.noteService.createNote(title, text).subscribe(next => {
      const note: Note = next as Note;
      console.log(note);

      this.router.navigate([ '/notes', note._id ]);
    })
  }
}

