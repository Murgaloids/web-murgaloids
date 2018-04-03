import { Component, OnInit } from '@angular/core';
import { FileUpload } from '../../shared/models/file-upload.model';
import { UploadFileService } from '../../shared/services/upload-file.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {

  fileUploads: any[];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    // Use snapshotChanges().map() to store the key
    this.uploadService.getFileUploads(6).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

}
