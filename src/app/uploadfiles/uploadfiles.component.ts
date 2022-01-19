import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DBFile } from '../entities/dbfile';
import { ApiService } from '../_services/api.service';
import { UploadfilesService } from '../_services/uploadfiles.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Thematic } from '../entities/thematic';
import { Subthematic } from '../entities/subthematic';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})

export class UploadfilesComponent implements OnInit {
  selectedFiles: FileList[]=[];
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;
  columnsToDisplay= ['fileName', 'fileType', 'delete'];
  dbFiles : DBFile[] = []; 
  thematics : Thematic[] = [];  
  subThematics :Subthematic[] = [];
  value: string; 
  thmId:number;
  th:Subthematic;
  selectedthematic:any;
 
  constructor(private uploadService: UploadfilesService,private api:ApiService) { }
  ngOnInit(): void {
    this.uploadService.getFiles().subscribe(
      results=> {
        this.dbFiles=results;
        console.log(results);
      } 
    );
    this.uploadService.getThematics().subscribe(
      data=>{
        this.thematics=data
        console.log(data);
      }
    );
  }

  onChangeThematics(thematicid:any){
    this.uploadService.getSubthematics(thematicid).subscribe(
      dat=>{
        this.subThematics=dat
        console.log(dat);
      }
    );
  }
  onChangeThematics2(thematicid:any){
    console.log(thematicid);
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  
  upload(idx, file,thematicid:number) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file,thematicid).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
         // this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });

    }
    uploadFiles() {
      this.message = '';
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i],this.selectedthematic);
      }
    }

  delFile(id){
    this.api.delFile(id.value).subscribe(
      res=>{
        this.dbFiles=res;
        this.ReloadPage();
      });
  }

    ReloadPage(){
      window.location.reload();
    }

    onChangeThematics1(subthematicid:any){
      this.uploadService.getFilesBySubThematicId(subthematicid).subscribe(
        result=>{
          this.dbFiles=result;
        }
      );
    }
      

    
}


