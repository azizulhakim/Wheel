import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
import { CarList } from '../carlist/carlist'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  make: string = "";
  makes: Array<{name: string, value: string}>;

  model: string = "";
  models: Array<{name: string}>;

  zipcode: string = "";

  noAccident: boolean = true;
  oneOwner: boolean = false;
  personalUse: boolean = true;
  serviceRecords: boolean = false;



  constructor(public navCtrl: NavController, public http:HTTP, public alertCtrl: AlertController) {
    this.models = [];

    this.makes = [
      { name: 'Acura', value: 'acura' },
      { name: 'Audi', value: 'audi' },
      { name: 'BMW', value: 'bmw' },
      { name: 'Buick', value: 'buick' },
      { name: 'Cadillac', value: 'cadillac' },
      { name: 'Chevrolet', value: 'chevrolet' },
      { name: 'Chrysler', value: 'chrysler' },
      { name: 'Dodge', value: 'dodge' },
      { name: 'Ford', value: 'ford' },
      { name: 'GMC', value: 'gmc' },
      { name: 'Honda', value: 'honda' },
      { name: 'Hyundai', value: 'hyundai' },
      { name: 'Infiniti', value: 'infiniti' },
      { name: 'Jeep', value: 'jeep' },
      { name: 'Kia', value: 'kia' },
      { name: 'Land Rover', value: 'landrover' },
      { name: 'Lexus', value: 'lexus' },
      { name: 'Lincoln', value: 'lincoln' },
      { name: 'Mazda', value: 'mazda' },
      { name: 'Mercedes-Benz', value: 'mercedes-benz' },
      { name: 'Mini', value: 'mini' },
      { name: 'Mitsubishi', value: 'mitsubishi' },
      { name: 'Nissan', value: 'nissan' },
      { name: 'Pontiac', value: 'pontiac' },
      { name: 'Porsche', value: 'porsche' },
      { name: 'Ram', value: 'ram' },
      { name: 'Subaru', value: 'subaru' },
      { name: 'Toyota', value: 'toyota' },
      { name: 'Volkswagen', value: 'volkswagen' },
      { name: 'Volvo', value: 'volvo' },
      { name: 'Ferrari', value: 'ferrari' },
      { name: 'Jaguar', value: 'jaguar' },
      { name: 'Lamborghini', value: 'lamborghini' },
      { name: 'Suzuki', value: 'suzuki' },
      { name: 'Tesla', value: 'tesla' }
    ];
  }

  makeSelect(make: string) {
    var self = this;

    var api: string = "https://www.carfax.com/api/makes/" + make + "/models";

    this.http.get(api, {}, {})
    .then(data => {
      var carData = JSON.parse(data.data);
      for (var i=0; i < carData["Current Models"].length; i++) {

        self.models.push({
          'name': carData["Current Models"][i].name
        });
      }
    })
    .catch(error => {

      console.log(error);

    });
  }

  modelSelect() {
    console.log(this.model);
  }

  onSearchClick() {
    this.navCtrl.push(CarList, {
      make: this.make,
      model: this.model,
      zipcode: this.zipcode,
      noAccident: this.noAccident,
      oneOwner: this.oneOwner,
      personalUse: this.personalUse,
      serviceRecords: this.serviceRecords
    });
  }
}
