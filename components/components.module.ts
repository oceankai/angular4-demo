import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonProductsComponent } from './ion-products/ion-products';
import { CsImgLazyComponent } from './cs-img-lazy/cs-img-lazy';

@NgModule({
  declarations: [IonProductsComponent, CsImgLazyComponent],
	imports: [
		IonicModule
	],
  exports: [IonProductsComponent, CsImgLazyComponent]
})
export class ComponentsModule { }
