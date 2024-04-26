import { Component, Input, OnInit } from '@angular/core';
import { ViewCarService } from './view-car.service';
import { ActivatedRoute } from '@angular/router';
import { ICarData } from 'src/app/auth/auth.service';
import { DatePipe, formatDate } from '@angular/common';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.scss'],
  providers: [DatePipe, ConfirmationService, MessageService]
})
export class ViewCarComponent implements OnInit{

  carData: ICarData[] = [];
  carImages: any[] = [];
  price!: number;
  responsiveOptions: any[] = [];
  fromMinDate = new Date();
  currentDate = new Date();
  toMinDateValue = new Date();
  toMinDate = new Date();

  constructor(private service: ViewCarService, private router: ActivatedRoute, private datePipe: DatePipe, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  getCarData() {
     // ! negacja, !! bolean, + number
    const carId = +this.router.snapshot.params['id'];
    this.service.getCar(carId).subscribe(res => {
      const { brand, capacity, doors, drive, fuel, model, price, year, images } = res.data.attributes;
      this.price = price;
      this.carData.push({ brand: brand.data.attributes.name, capacity, doors, drive, fuel, model, price, year });
      this.carImages = images.data.map(obj => ({ url: `http://localhost:1337${obj.attributes.url}` }));
    });
  }

  updateMinDate() {
    this.toMinDateValue.setDate(this.currentDate.getDate() + 1);
    this.toMinDate = new Date(this.toMinDateValue);
    console.log(this.toMinDate);
  }

  calculateDays(startDate: Date, endDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
  
    // Convert the dates to UTC to account for any time zone differences
    const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endUtc = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
    // Calculate the difference in days
    const diffDays = Math.floor((endUtc - startUtc) / oneDay);
  
    return diffDays;
  }

  confirmBooking() {
    const fromDate = formatDate(this.currentDate, 'dd.MM.yyyy', 'en');
    const toDate = formatDate(this.toMinDate, 'dd.MM.yyyy', 'en');
    const loanLength = this.calculateDays(this.currentDate, this.toMinDate);
    const totalCost = this.price * loanLength;
    const dayOrDays = loanLength === 1 ? ' day' : ' days';

    this.confirmationService.confirm({
      message: `Are you sure that you want to proceed?<br><br>Loan starts: ${fromDate}<br> Loan ends: ${toDate}<br>Loan length: ${loanLength + dayOrDays}<br>Loan cost: ${totalCost} zł`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          const carId = +this.router.snapshot.params['id'];
          const fromDateNew = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
          const toDateNew = formatDate(this.toMinDate, 'yyyy-MM-dd', 'en');
          console.log('id: ' + carId, 'loan: ' + loanLength, 'cost: ' + totalCost, ' ' + fromDateNew);
          const formData = new FormData();
          formData.append('data', JSON.stringify({car: carId, from: fromDateNew, to: toDateNew, length: loanLength, cost: totalCost}));
          this.service.postBooking(formData).subscribe(res => {
            if (res.status === 200) {
              return this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Booking successfull' });
            } else {
              return this.messageService.add({ severity: 'error', summary: `Error ${res.status}`, detail: 'Booking failed' });
            }
          });
      },
      reject: (type: any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
  });
  }
  
  
  ngOnInit(): void {
    this.getCarData();
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '567px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  console.log(this.carData);
  this.currentDate
  this.toMinDate.setDate(this.currentDate.getDate() + 1);
  }
}
