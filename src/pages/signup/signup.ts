import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Injectable()
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  usuario:any = {};
  myForm: FormGroup;
  public loading:Loading;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase
    //public lugaresService: LugaresService
    ) {
      this.myForm = this.formBuilder.group({
        nombre: ['',Validators.required],
        apellido: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required]
      });
 
    }
    
    signup(){
      console.log("Nombre:" + this.myForm.value.nombre);
      console.log("Apellido:" + this.myForm.value.apellido);
      console.log("Email:" + this.myForm.value.email);
      //console.log("Password:" + this.myForm.value.password);

      //data a firebase
      //console.log(this.lugar);
      this.usuario.id = Date.now();
      this.afDB.database.ref('usuarios/' + this.usuario.id).set(this.usuario);

      //autentificacion con email y password
      this.afAuth.auth.createUserWithEmailAndPassword(
        this.myForm.value.email,
        this.myForm.value.password
      ).then(
        res => {
          this.navCtrl.setRoot(HomePage);
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "OK",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();

        //afDB
        

    }
    
    

}


