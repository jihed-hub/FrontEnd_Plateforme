import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBFile } from 'src/app/entities/dbfile';
import { Subthematic } from 'src/app/entities/subthematic';
import { Thematic } from 'src/app/entities/thematic';
import { UploadfilesService } from 'src/app/_services/uploadfiles.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  dbFiles : DBFile[] = []; 
  subThematics :Subthematic[] = [];
  thematics : Thematic[] = [];  

  
  constructor(private router:Router,private uploadService: UploadfilesService) { }

  ngOnInit(): void {
    this.uploadService.getFilesUser().subscribe(
      results=> {
        this.dbFiles=results;
        console.log(results);
      } 
    );
    this.uploadService.getThematicsUser().subscribe(
      data=>{
        this.thematics=data
        console.log(data);
      }
    );
  }
  onChangeThematics1(subthematicid:any){
    this.uploadService.getFilesBySubThematicId(subthematicid).subscribe(
      result=>{
        this.dbFiles=result;
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
  public gotohome(){
    this.router.navigate([""])
  }


}
