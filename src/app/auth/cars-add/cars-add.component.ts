import { Component, OnInit } from '@angular/core';
import { CarsAddService } from './cars-add.service';
import { MessageService } from 'primeng/api';
import { map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-cars-add',
  templateUrl: './cars-add.component.html',
  styleUrls: ['./cars-add.component.scss'],
  providers: [MessageService]
})
export class CarsAddComponent implements OnInit{

  form = this.service.createForm();
  file: any;
  canPost: boolean = false;

  constructor(private service: CarsAddService, private message: MessageService) { }

  addNewCar() {
    let brandId: number = 0;
    let imagesIds: any[] = [];
    const formData = new FormData();
    // const data = this.form.value;
    const { images, name } = this.form.value;

    if (name)
      this.service.getBrand(name).subscribe(res => {
        console.log(res);

        if (!res.data.length) {
          console.log('wpisuje');
          this.service.postBrand(this.form.controls.name.value).subscribe(res => {
            brandId = res.data.id
            this.create(brandId);
          });
        } else {
          console.log('pobiera id');
          const [id] = res.data.map(response => response.id);
          this.create(id);
        }
      })



  }

  createBrand() {
    const { name } = this.form.value;

    if (name)
    this.service.getBrand(name).pipe(
      switchMap(value => {
        if(value && value.data.length) {
          return of(value.data[0].id);
        } else {
          return this.service.postBrand(name).pipe(
            map(obj => obj.data.id)
          )
        }
      }),
      switchMap(id => this.create(id))
    ).subscribe(res => {
      if(res.status === 200) {
        return this.message.add({ severity: 'success', summary: 'Success', detail: 'Car uploaded successfully'});
      } else {
        return this.message.add({ severity: 'error', summary: `Error ${res.status}`, detail: 'Car upload failed'});
      }
    });

  }

  create(id: number) {

    const { ...data } = this.form.value;
    const formData = new FormData();
    formData.append('data', JSON.stringify({...data, brand: id}));
    
    for (let i = 0; i < this.file.length; i++) {
      formData.append(`files.images`, this.file[i], this.file[i].name);
    }
    return this.service.postCar(formData)/*.subscribe(res => {
      if(res.status === 200) {
        return this.message.add({ severity: 'success', summary: 'Success', detail: 'Car uploaded successfully'});
      } else {
        return this.message.add({ severity: 'error', summary: `Error ${res.status}`, detail: 'Car upload failed'});
      }
    })*/;

    // this.service.postImages(form).subscribe(res => res.map(obj => imagesIds.push(obj.id)));

  }

  getImages(event: any) {
    this.file = event.target.files;
    console.log(this.file);
  }

  ngOnInit(): void {
      this.form.statusChanges.subscribe(result => {
        if (this.file !== undefined && this.file.length >= 4) {
          return result === 'VALID' ? this.canPost = true : this.canPost = false;
        } else {
          return this.canPost = false;
        }
      });
  }
}
