import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-radiology',
  templateUrl: './list-radiology.component.html',
  styleUrls: ['./list-radiology.component.css']
})
export class ListRadiologyComponent implements OnInit {

  displayedColumns: string[] = ['cin', 'name', 'traitement', 'analyse', 'date', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog, private service:ApiService) { }

  ngOnInit(): void {
    this.getAllRadiologys();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllRadiologys();
      }
    })
  }

  getAllRadiologys() {
    this.service.getRadiologys()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error!!")
      }
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRadiology(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllRadiologys();
      }
    })
  }

  deleteRadiology(id:number) {
    this.service.deleteRadiology(id)
    .subscribe({
      next:(res)=>{
        alert(":: Success");
        this.getAllRadiologys();
      },
      error:()=>{
        alert(":: Error!!")
      }
    })
  }
}
