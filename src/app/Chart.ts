export class Chart {
    //title:string = '';
    layout:plotLayout;
    data:plotData[];

    constructor(layout:plotLayout, data:plotData[]) {
        console.log("Chart was created!");
        this.layout = layout;
        this.data = data;
    }
}