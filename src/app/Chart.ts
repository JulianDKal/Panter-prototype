export class Chart {
    //title:string = '';
    layout:plotLayout;
    data:plotData[];

    constructor(layout:plotLayout, data:plotData[]) {
        this.layout = layout;
        this.data = data;
        console.log("Chart was created: " + this.layout.title);
    }
}

