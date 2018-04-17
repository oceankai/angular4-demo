import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropperCustomComponent } from './image-cropper-custom.component';

describe('ImageCropperCustomComponent', () => {
  let component: ImageCropperCustomComponent;
  let fixture: ComponentFixture<ImageCropperCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
