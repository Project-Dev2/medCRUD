import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css']
})
export class RadiologyComponent implements OnInit {

  id:any
  data:any = []
  loading:boolean = false
  constructor(private route:ActivatedRoute, private service:ApiService) { 
    this.id = this.route.snapshot.paramMap.get("id")
    //console.log(this.id)
  }

  ngOnInit(): void {
    this.getRadiology()
  }

  getRadiology(){
    this.loading = true
    this.service.getRadiologyById(this.id)
    .subscribe(res=>{
      this.loading = false
      this.data = res
    },error => {
      this.loading = false
      alert(error)
    })
  }

  print() {
    window.print();
  }
}
