export class Chart {
    title:string = '';
    layout:object = {};
    data:object[] = [{}];
    width: number;
    height: number;

    constructor(titleName:string, Width:number, Height:number) {
        console.log("Chart was created!");
        this.title = titleName;
        this.width = Width;
        this.height = Height;
    }
}