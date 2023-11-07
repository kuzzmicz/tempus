export class Note{
   
    _id: string = "";
    title: string = "";
    text: string = "";
    costructor(_id: string, title: string, text:string){
        this._id = _id;
         this.title = title;
         this.text = text;
          }
    
}