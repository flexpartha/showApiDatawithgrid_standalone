import { Component, Inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { JSonApiService } from "./j-son-api.service";
import { FormsModule } from "@angular/forms";
import { APP_BASE_HREF, NgFor, NgIf } from "@angular/common";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
})
export class AppComponent implements OnInit {
  title = "showApiDataWithCard";
  environmentName = environment.name;
  number: any = 1;
  number2: any = 1;
  loadData = [];
  loadData1: any;
  LoadData$: Observable<any>;
  // totalnumberofData = new Promise((reslove,reject)=>{
  //   setTimeout(() =>{
  //     reslove(this.loadData1.length);
  //     console.log(this.loadData1.length);
  //   },2000)
  // });
  getEachValue: any;
  pageOfItems: Array<any>;
  showCard = false;
  isVisible = false;

  constructor(
    public jsonService: JSonApiService,
    private succesToaster: ToastrService,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {
    console.log(`APP_BASE_HREF is ${this.baseHref}`);
  }

  ngOnInit() {
    //this.getAllData();
    this.jsonService.getJsonValue(this.number).subscribe(
      (res) => {
        this.loadData1 = res;
      },
      (error) => {
        //console.log(error);
        throw error;
      }
    );
    //this.loadData = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.isVisible = true;
  }

  // onChangePage(pageOfItems: Array<any>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  // }

  onNextResult() {
    this.jsonService.getNextPage().subscribe((res) => {
      console.log("RESNext::----", res);
      this.loadData1 = res;
      this.isVisible = false;
    });
    // this.totalnumberofData = new Promise((reslove,reject)=>{
    //   setTimeout(() =>{
    //     reslove(this.loadData1.length);
    //     console.log(this.loadData1.length)
    //   },2000)
    // });
  }

  onPreviousResult() {
    this.jsonService.getPreviousPage().subscribe((res) => {
      console.log("RESPre::----", res);
      this.loadData1 = res;
      if (res[0].userId == 1) {
        this.isVisible = true;
      }
    });
  }
  getAllData(value: any) {
    this.jsonService.getJsonValue(value).subscribe((res) => {
      console.log("Result", res);
      this.loadData = res;
      this.getEachValue = res.slice(0, value);
      let Title = this.loadData.find((c) => c.title);
      console.log("loadDATA", this.getEachValue);
      console.log("Title", Title);
      if (this.getEachValue.length > 0) {
        this.showCard = true;
      } else {
        this.showCard = false;
      }
    });
  }

  // getAllDatawithAsync(){
  //   this.LoadData$ = this.jsonService.getJsonValue2();
  //   //this.LoadData$ = this.jsonService.getJsonValue(value);
  //   console.log("v::-",this.LoadData$);
  //   // let res:any;
  //   // res = this.asyncLoadData$
  //   // this.getEachValue = res.slice(0,value);
  //   // if(this.getEachValue.length > 0){
  //   //   this.showCard = true;
  //   // }
  //   // else{
  //   //   this.showCard = false;
  //   // }
  // }
}
