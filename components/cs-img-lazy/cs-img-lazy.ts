import {
  Component,
  Input
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';

@Component({
  selector: 'cs-img-lazy',
  templateUrl: 'cs-img-lazy.html'
})
export class CsImgLazyComponent {

  @Input() default: string; // 占位图片
  @Input() src: string // 要显示的图片

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {

    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      this.default = this.src;
    }

  }

}
