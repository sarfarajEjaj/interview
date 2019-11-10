import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../provider/httpService/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: boolean = false;
  catList: any;
  catDisplayList: any;
  searchItem: any;

  constructor(
    private http: HttpServiceService,
    public router: Router,
  ) {
    this.getAllBreed();
  }

  getAllBreed() {
    this.http.getRequest('breeds')
      .subscribe(res => {
        console.log(res);
        this.data = true;
        this.catList = res;
        this.catDisplayList = res;
      },
        err => {
          console.log(err);
        });
  }

  selectCat(item: any) {
    this.http.setParams('catid', item);
    this.router.navigate(['/detail-view'])
  }

  searchCat(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.catDisplayList = this.catList.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.catDisplayList = this.catList;
    }
  }
}
