import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";

@Injectable()
export class LugaresService {
    constructor(public afDB: AngularFireDatabase,
                private angularFireStorage: AngularFireStorage){
    }
    public getLugares(){
        return this.afDB.list('/lugares/');
    }
    public getLugar(id){
        return this.afDB.object('/lugares/' + id);
    }
    public createLugar(lugar){
        return this.afDB.database.ref('/lugares/' + lugar.id).set(lugar);
    }
    public editLugar(lugar){
        return this.afDB.database.ref('/lugares/' + lugar.id).set(lugar);
    }
    public deleteLugar(lugar){
        return this.afDB.database.ref('/lugares/' + lugar.id).remove();
    }

    public uploadPicture(picture_name, image){
        return this.angularFireStorage.ref('/pictures/' + picture_name)
          .putString(image, 'data_url');
    }
    public getDownloadURL(picture_name){
        return this.angularFireStorage.ref('/pictures/' + picture_name)
          .getDownloadURL();
    }
}