import { Injectable, Inject, EventEmitter } from '@angular/core';
import { CSVService } from './csv.service';
import * as Papa from 'papaparse';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  dataReady: EventEmitter<void> = new EventEmitter<void>();
  public isProcessing:boolean = true;

  //Springer Datensatz 2019-12-31:
  firstDataObj?:Papa.ParseResult<snDealRows>;
  mainDisciplines:string[] = [];
  apcPrices:string[] = [];
  publishingModels19:string[] = [];
  licenseTypes19:string[] = [];
  
  //Springer Datensatz 2020-04-17:
  secondDataObj?:Papa.ParseResult<snDealRows>;
  publishingModels20:string[] = [];
  apcPrices20:string[] = [];

  //Springer Datensatz 2022-04-04
  thirdDataObj?:Papa.ParseResult<snDealRows>;
  publishingModels22:string[] = [];
  apcPrices22:string[] = [];

  //Springer Datensatz 2023-05-04
  fourthDataObj?:Papa.ParseResult<snDealRows>;
  publishingModels23:string[] = [];
  mainDisciplines23:string[] = [];
  apcPrices23:string[] = [];

  //Wiley Datensatz 2020
  wileyFirstObj?:Papa.ParseResult<wileyDealRows>
  wileyAPCs2020:string[] = [];
  wPublishingModels20:string[] = [];

  //Wiley Datensatz 2021
  wileySecondObj?:Papa.ParseResult<wileyDealRows>
  wileyAPCs2021:string[] = [];
  wPublishingModels21:string[] = [];

  //Wiley Datensatz 2022
  wileyThirdObj?:Papa.ParseResult<wileyDealRows>
  wileyAPCs2022:string[] = [];
  wPublishingModels22:string[] = [];

  //Wiley Datensatz 2023
  wileyFourthObj?:Papa.ParseResult<wileyDealRows>
  wMainDisciplines23:string[] = [];
  wileyAPCs2023:string[] = [];
  wileyLicenses23:string[] = [];
  wPublishingModels23:string[] = [];

  eventCount:number = 0;
  constructor(private csvService:CSVService) 
  {
    csvService.loadCsvFiles();
    csvService.onGotCsvData = (results) => {
      switch (this.eventCount) {
        case 0:
              this.firstDataObj = results;
          if(this.firstDataObj){
            for (let i = 0; i < this.firstDataObj.data.length; i++) {
              this.mainDisciplines[i] = this.firstDataObj.data[i]["Main Discipline"];
              this.apcPrices[i] = this.firstDataObj.data[i]["APC"];
              this.publishingModels19[i] = this.firstDataObj.data[i]["Publishing Model"];
              this.licenseTypes19[i] = this.firstDataObj.data[i]["OA License Type"];
            }

          }
          //console.log(this.firstDataObj);
          this.eventCount++;
          break;
        case 1:
          this.secondDataObj = results;
          if(this.secondDataObj){
            for (let i = 0; i < this.secondDataObj.data.length; i++) {
              this.publishingModels20[i] = this.secondDataObj.data[i]["Publishing Model"];
              this.apcPrices20[i] = this.secondDataObj.data[i]["APC"]
            }
          }
          //console.log(this.secondDataObj);
          this.eventCount++;
          break;
        case 2:
          this.thirdDataObj = results;
          if(this.thirdDataObj){
            for (let i = 0; i < this.thirdDataObj.data.length; i++) {
              this.publishingModels22[i] = this.thirdDataObj.data[i]["Publishing Model"];
              this.apcPrices22[i] = this.thirdDataObj.data[i]["APC"]
            }
          }
          //console.log(this.thirdDataObj);
          this.eventCount++;
          break;
        case 3:
          this.fourthDataObj = results;
          if(this.fourthDataObj){
            for (let i = 0; i < this.fourthDataObj.data.length; i++) {
              this.publishingModels23[i] = this.fourthDataObj.data[i]["Publishing Model"];
              this.mainDisciplines23[i] = this.fourthDataObj.data[i]["Main Discipline"];
              this.apcPrices23[i] = this.fourthDataObj.data[i]["APC"]
            }
          }
          //console.log(this.fourthDataObj);

          this.eventCount++;
          break;

          //Ab hier werden wiley Datensätze gespeichert
        case 4:
          this.wileyFirstObj = results;
          if(this.wileyFirstObj){
            for(let i = 0; i < this.wileyFirstObj.data.length; i++){
              this.wileyAPCs2020[i] = this.wileyFirstObj.data[i]["EUR APC"]
              this.wPublishingModels20[i] = this.wileyFirstObj.data[i]["Revenue Model"]
            }
          }
          this.eventCount++;
          break;
        case 5:
          this.wileySecondObj = results;
          if(this.wileySecondObj){
            for(let i = 0; i < this.wileySecondObj.data.length; i++){
              this.wileyAPCs2021[i] = this.wileySecondObj.data[i]["EUR APC"]
              this.wPublishingModels21[i] = this.wileySecondObj.data[i]["Revenue Model"];
            }
          }
          this.eventCount++;
          break;
        case 6:
          this.wileyThirdObj = results;
          if(this.wileyThirdObj){
            for(let i = 0; i < this.wileyThirdObj.data.length; i++){
              this.wileyAPCs2022[i] = this.wileyThirdObj.data[i]["EUR APC"]
              this.wPublishingModels22[i] = this.wileyThirdObj.data[i]["Revenue Model"];
            }
          }
          this.eventCount++;
          break;
        case 7:
          this.wileyFourthObj = results;
          if(this.wileyFourthObj){
            for (let i = 0; i < this.wileyFourthObj.data.length; i++) {
              this.wMainDisciplines23[i] = this.wileyFourthObj.data[i]["General Subject Category"];
              this.wileyAPCs2023[i] = this.wileyFourthObj.data[i]["EUR APC"];
              this.wileyLicenses23[i] = this.wileyFourthObj.data[i]["License Type Offered"];
              this.wPublishingModels23[i] = this.wileyFourthObj.data[i]["Revenue Model"]
            }
          }
          this.dataReady.emit(); //event is sent to the portfolio component so the charts etc. can get rendered
          this.isProcessing = false;
          this.eventCount++;
          break;
        default:
          console.log("Additional csv data that is not being processed");
          break;
      }

      }
    //this.dataReady.emit();
  }

  //----------------------------------------------------------------------------------------
  //Methoden für Datenverarbeitung
  //----------------------------------------------------------------------------------------
  getAvgPrice(prices:string[]):number {
    let sum = 0;
    let count = 0
    prices.forEach((price) => {
      let priceVal = parseInt(price);
      if(!isNaN(priceVal) && priceVal != 0){
        sum += priceVal;
        count++;
      }
    })

    return sum / count;
  }

  //rechnet Durchschnittspreis aus für z.B. die APC preise und gibt CountMap zurück
  generateAvgPriceMap(keys:string[], values:string[]):CountMap {
    const cumulativeMap: { [key: string]: { sum: number; count: number } } = {};
    const counts: CountMap = {};
    let price;

    for (let index = 0; index < keys.length; index++) {
      if(!cumulativeMap[keys[index]]){
        cumulativeMap[keys[index]] = { sum: 0, count: 0 };
      }

      price = parseInt(values[index]);

      if(!isNaN(price)){
        cumulativeMap[keys[index]].sum += price;
        cumulativeMap[keys[index]].count += 1;
      }
      
    }

    for (const str in cumulativeMap){
      if (cumulativeMap.hasOwnProperty(str) && cumulativeMap[str].count >= 10 ) {
        const { sum, count } = cumulativeMap[str];
        counts[str] = sum / count;
      }
    }
    
    return counts;
  }
  
  generateDisciplinesMap(disciplines:string[], publishingModels:string[], threshold:number): stringStringNumberMap {
    const countMap: { [subject: string]: { [license: string]: number, sum:number } } = {};
    for(let i = 0; i < disciplines.length; i++) {
      const subject = disciplines[i];
      const license = publishingModels[i];
      if(!countMap[subject]){
        countMap[subject] = {sum: 0};
      }

      if(!countMap[subject][license]){
        countMap[subject][license] = 0;
      }

      countMap[subject][license] += 1;
      countMap[subject].sum += 1;
    }

    Object.keys(countMap).forEach((key) => {
      if(countMap[key].sum < threshold) delete countMap[key];
    })

    return countMap
    //console.log(countMap);
  }


  //gibt die Häufigkeiten der Einträge als oben definierter CountMap typ zurück
  //z.B. result = {"Mathematik": 345, "Physics":  124, ...}
  countOccurrences(arr: string[], threshold:number): CountMap {
    const counts: CountMap = {};
    for (const item of arr) {
      if (counts[item]) {
        counts[item]++;
      } else {
        counts[item] = 1;
      }
    }

    for (let key in counts) {
      if(counts[key] < threshold) delete counts[key];
    }

    return counts;
  }

  convertToNumbers(arr:string[]): number[] {
    const numArr:number[] = []
    let num = 0
    let counter = 0
    for (let i = 0; i < arr.length; i++) {
      num = parseInt(arr[i])
      if(!isNaN(num)) {
        numArr[counter] = num;
        counter++;
      }
    }

    return numArr;
  }

}

