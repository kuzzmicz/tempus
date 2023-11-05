export class Task{
   
    _id: string = "";
    title: string = "";
    _listId: string = "";
    costructor(_id: string, title: string, _listId: string){
        this._id = _id;
         this.title = title;
         this._listId = _listId;
          }
    
}