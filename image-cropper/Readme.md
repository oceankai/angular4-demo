使用的页面：
	

	constructor(
    private ngbModalService: NgbModal) {

     
  }

 addImg() {
    let imageCropComponent = this.ngbModalService.open(ImageCropperCustomComponent, { size: 'lg', backdrop: 'static', keyboard: false });

    imageCropComponent.componentInstance.url = '/api/file/x-service/u';
    imageCropComponent.componentInstance.emitService.subscribe((emmitedValue)=>{
      console.log('图片裁剪之后', emmitedValue);
      this.editData.img.push(emmitedValue);
    });

    imageCropComponent.result.then((result) => {
      console.log('result', result);
    }, (reason) => {
      console.log('reason', reason);
    });
  }