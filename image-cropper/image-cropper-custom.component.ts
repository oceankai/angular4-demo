import { Component, Input, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ToolsProvider } from '../../../../common-web/tools/tools';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

/**
 * 图片裁剪上传组件
 */
@Component({
    selector: 'image-cropper-custom',
    templateUrl: './image-cropper-custom.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./image-cropper-custom.component.scss']
})
export class ImageCropperCustomComponent {

    // 传值给调用的页面
    @Output()
    emitService = new EventEmitter;

    croppedWidth:number;
    croppedHeight:number;

    // 上传的url地址
    public url?: string = "/api/file/x-service/u"; 
    public uploader: FileUploader;

    //图片
    public imgData: any;

    //图片裁剪配置
    public imgSettings: CropperSettings;

    //图片裁剪元素
    @ViewChild('imgCropper', undefined)
    imgCropper: ImageCropperComponent;

    constructor(
      public activeModal: NgbActiveModal, 
      private toolsPvd: ToolsProvider) {

        //裁剪配置
        this.imgSettings = new CropperSettings();
        this.imgSettings.noFileInput = true;
        this.imgSettings.compressRatio = 1.0;
        this.imgSettings.width = 380;
        this.imgSettings.height = 380;
        //Resulting image width
        this.imgSettings.croppedWidth = 210;
        this.imgSettings.croppedHeight = 210;
        this.imgSettings.canvasWidth = 500;
        this.imgSettings.canvasHeight = 380;
        this.imgSettings.minWidth = 100;
        this.imgSettings.minHeight = 100;
        this.imgSettings.cropperDrawSettings.strokeWidth = 2;
        this.imgSettings.rounded = false;
        this.imgSettings.touchRadius = 40;
        // false 任意矩形 true 正方形
        this.imgSettings.keepAspect = true; 
        this.imgSettings.fileType = 'image/png';
        this.imgData = {};
        
    }

    ngOnInit(): void {

      // 上传设置
      this.uploader = new FileUploader({
        url: this.url,
        method: "POST",
        itemAlias: "upload",
        autoUpload: false
      });

      //上传图片回调函数
      this.uploader.onSuccessItem = this.successItem.bind(this);
    }

    // 文件监听 
    // fileChangeListener($event) {
    //   var image: any = new Image();
    //   var file: File = $event.target.files[0];
    //   var myReader: FileReader = new FileReader();
    //   var that = this;
    //   myReader.onloadend = function (loadEvent: any) {
    //     image.src = loadEvent.target.result;
    //     that.imgSettings.croppedWidth = image.width;
    //     that.imgSettings.croppedHeight = image.height;
    //   };
    //   myReader.readAsDataURL(file);
    // }

    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var blob = new window.Blob([u8arr], { type: mime });
      return blob;
    }

    /**
     * 上传
     */
    uploadImage() {

      if (!this.imgData.image) {
        this.toolsPvd.toastWarning('请先选择图片');
        return;
      }

      //裁剪图片转blob
      let blob = this.dataURLtoBlob(this.imgData.image);
      //创建file
      let fileFromBlob: File = new File([blob], "cropedImage.png");
      //添加裁剪图片file
      this.uploader.addToQueue(new Array<File>(fileFromBlob));
      //上传图片，queue[0]原图，queue[1]裁剪图片
      this.uploader.queue[1].upload();
    }

    // 上传成功回调
    successItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any{
      // 上传文件成功  
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);

        // console.log('图片上传返回URL', tempRes.data.url);
        // 把modal中的数据传递出去
        this.emitService.emit(tempRes.data.url)

        this.toolsPvd.toastSuccess('上传成功');
        this.close();
  
      } else {            
        // 上传文件后获取服务器返回的数据错误        
      }
    }

    /**
     * 关闭
     */
    close(): void {
        this.activeModal.dismiss({ status: 'closed' });
    }


}
