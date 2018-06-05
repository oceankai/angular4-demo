import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { StoreProvider } from '../../providers/providers';

@Component({
  selector: 'ion-products',
  templateUrl: 'ion-products.html'
})
export class IonProductsComponent {

  @Input() products: any;
  @Input() grid: string = 'grid-2';

  constructor(public navCtrl: NavController) {

  }

  goDetails(item) {
    if (item.type == StoreProvider.TYPE_JOSS) {
      this.navCtrl.push('JossDetailsPage', { 'id': item.id });
    } else {
      this.navCtrl.push('ProductDetailsPage', { 'id': item.id });
    }
  }

} 