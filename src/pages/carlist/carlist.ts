import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-carlist',
  templateUrl: 'carlist.html'
})

export class CarList {
  make: string = "";
  model: string = "";
  zipcode: string = "";
  noAccident: boolean = true;
  oneOwner: boolean = false;
  personalUse: boolean = true;
  serviceRecords: boolean = false;

  jsonAll: string = "";

  cars: Array<{}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP) {
    this.make = navParams.get('make');
    this.model = navParams.get('model');
    this.zipcode = navParams.get('zipcode');
    this.noAccident = navParams.get('noAccident');
    this.oneOwner = navParams.get('oneOwner');
    this.personalUse = navParams.get('personalUse');
    this.serviceRecords = navParams.get('serviceRecords');

    var api = this.makeApi();

    console.log(api);

    this.cars = [];

    this.fetchCarModels(api);
  }

  makeApi() {
    return 'https://www.carfax.com/api/vehicles?' +
                  'zip=' + this.zipcode +
                  '&make=' + this.make +
                  '&model=' + this.model +
                  '&dynamicRadius=true&radius=50&sort=BEST' +
                  '&noAccidents=' + this.noAccident +
                  '&oneOwner=' + this.oneOwner +
                  '&personalUse=' + this.personalUse +
                  '&serviceRecords=' + this.serviceRecords;
  }

  fetchCarModels(api: string) {
    var self = this;
    this.http.get(api, {}, {})
      .then(data => {
        var carData = JSON.parse(data.data);
        self.jsonAll = "" + carData.listings[0].vin;
        for (var i=0; i<carData.listings.length; i++) {
          self.jsonAll = "" + carData.listings[i].images.medium[0];
          self.cars.push({
            year: '2015',
            make: carData.listings[i].make,
            model: carData.listings[i].model,
            trim: carData.listings[i].trim,
            vin: carData.listings[i].vin,
            mileage: carData.listings[i].mileage,
            listPrice: carData.listings[i].listPrice,
            currentPrice: carData.listings[i].currentPrice,
            image: carData.listings[i].images.medium[0],
            accidentHistory: carData.listings[i].accidentHistory,
            serviceHistory: carData.listings[i].serviceHistory,
            vehicleUseHistory: carData.listings[i].vehicleUseHistory,
            ownerHistory: carData.listings[i].ownerHistory
          });
        }

      })
      .catch(error => {
        self.jsonAll = "error: " + JSON.stringify(error);
      });
  }
}
