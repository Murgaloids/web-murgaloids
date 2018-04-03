import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../../shared/models/file-upload.model';
import { UploadFileService } from '../../shared/services/upload-file.service';

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.scss']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadFileService) { }
  ngOnInit() { }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}
