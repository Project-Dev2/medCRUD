import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  radiologyForm!:FormGroup;
  actionBtn : string = "Enregistrer"
  constructor(private formBuilder:FormBuilder, 
              private service:ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.radiologyForm = this.formBuilder.group({
      cin:['', Validators.required],
      name:['', Validators.required],
      traitement:['', Validators.required],
      analyse:['', Validators.required],
      date:['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Actualiser";
      this.radiologyForm.controls['cin'].setValue(this.editData.cin);
      this.radiologyForm.controls['name'].setValue(this.editData.name);
      this.radiologyForm.controls['traitement'].setValue(this.editData.traitement);
      this.radiologyForm.controls['analyse'].setValue(this.editData.price);
      this.radiologyForm.controls['date'].setValue(this.editData.date);
    }
  }

  addRadiology() {
    if(!this.editData){
      if(this.radiologyForm.valid){
        this.service.postRadiology(this.radiologyForm.value)
        .subscribe({
          next:(res)=>{
            alert(":: Success")
            this.radiologyForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert(":: Error")
          }
        })
      }
    }else{
      this.updateRadiology()
    }
  }

  updateRadiology() {
    this.service.updateRadiology(this.radiologyForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert(":: Success");
        this.radiologyForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert(":: Error");
      }
    })
  }
}
