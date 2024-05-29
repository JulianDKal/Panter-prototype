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

export class ScatterChart extends Chart {
    constructor(layout:plotLayout, data: scatterData[]){
        super(layout, data);
    }
}

export class PieChart extends Chart {
    constructor(layout:plotLayout, data: pieData[]){
        super(layout, data);
    }
}

export class BarChart extends Chart {
    constructor(layout:plotLayout, data: barData[]){
        super(layout, data);
    }
}

