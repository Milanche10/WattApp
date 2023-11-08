import { ChangeDetectorRef, Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Global, ModalData } from '../../global/IGlobal';
import { ModalTypes } from '../../global/IGlobal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public global = Global

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private dialogRef: MatDialogRef<ModalComponent>,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }

  closeModal() {
    this.dialogRef.close()
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges()
  }

  get closeModalFunction() {
    return this.closeModal.bind(this)
  }

}

@Injectable({
  providedIn: 'root'
})
export class ModalOpener {
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ModalComponent, any> | undefined;

  constructor (
    private matDialog: MatDialog
  ) { 
    this.dialogConfig.id = "modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "650px";
  }

  ngAfterViewInit() {
    document.onclick = (args: any) : void => {
      if(args.target.tagName === 'BODY') {
          this.modalDialog?.close()
      }
  }
  }

  setUpCustomConfig(configs: MatDialogConfig) {
    this.dialogConfig = configs
  }

  openModal(data: any, type: ModalTypes, configs? : MatDialogConfig) {
    const dataParam: ModalData = {
      data: data,
      modalType: type
    }

    if(configs != undefined) {
      this.dialogConfig = configs
    }
    this.dialogConfig.data = dataParam
    
    this.modalDialog = this.matDialog.open(ModalComponent, this.dialogConfig);
  }
}