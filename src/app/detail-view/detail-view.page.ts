import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../provider/httpService/http-service.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.page.html',
  styleUrls: ['./detail-view.page.scss'],
})
export class DetailViewPage implements OnInit {
  catDetails : any;

  constructor(
    private http: HttpServiceService,
    public router: Router,
  ) { 

  }

  ngOnInit() {
    this.catDetails = this.http.getParams('catid');
  }

}
