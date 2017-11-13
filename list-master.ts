import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { PlvdetailsPage } from '../plvdetails/plvdetails';
// https://stackoverflow.com/questions/43609853/angular-4-and-ionic-3-no-provider-for-http
import { Http } from '@angular/http'; 

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})

export class ListMasterPage {

  items;
  itemsearched;
  session:any = {};
  projets;

  proj = ['Reims', 'Amsterdam', 'Sao Paulo'];
  objet01 = {ville: 'Bordeaux', prix: '69€'};
  objet02 = {ville: 'Lille', prix: '45€'};
  objs = [this.objet01, this.objet02];

  tempproj: Array<any> = [];
  //let tempproj: Array<any> = [];
  //tempproj;


  constructor(public navCtrl: NavController, private navParams: NavParams, public http: Http) {
    //this.tempproj = Array[];
	//let tempproj: Array<any> = [];
    this.http = http;
    this.session = navParams.data;
    //this.session.mail = navParams.get('fooId');
    console.log('Mail recu' + this.session['mail']);

    //this.initializeItems();
    console.log('OKOK' + this.tempproj + 'OKOK');
    this.getprojets();

  }

  getprojets() {
    var link = 'http://genda.fr/aqui/getprojets.php';
    var myData = JSON.stringify({value: 'true'});
    this.http.post(link, myData).subscribe(data => {
    // https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
    this.tempproj = data["_body"]; 
    console.log('blabla ' + this.tempproj + ' blabla');
    }, error => {
    console.log("Oooops!");
    });

  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
        this.items = [];
    }
  }
  

  showplvdetails() {
    this.navCtrl.push('PlvdetailsPage');
  }
}
