//der typ enthält alle Spalten einer csv Datei die dann von PapaParse geparsed wird
type snDealRows =  {
    "SN Journals ID": number,
    "Journal Title": string,
    imprint: string,
    "Main Discipline": string, 
    homepageURL: string, 
    pISSN: string, 
    eISSN: string,
    "Publishing Model": string, 
    activeFrom: string, 
    fachArztZeitschrift: string, 
    "APC": string,
    bmcDiscount: string, 
    "OA License Type": string,
    standardWorkflow: string, 
    changesWithTerm: string,
    changeValidFrom: string,
    comments: string
}

type wileyDealRows = {
    "Status": string,
    "Revenue Model": string,
    "Ownership": string, 
    "Owned By": string, 
    "EUR APC": string,
    "License Type Offered": string,
    "General Subject Category": string
}

type CsvParsedEventHandler = (results: ParseResult<snRowsData | wileyDealRows>) => void;

//typen die Plotly für einen Graphen erwartet:
type plotMarkerObj = {
    color?:string,
    opacity?:number,
    line?: {
        color:string,
        width:number
    },
    colors?:string[]
}

type plotLayout = {
    width?:number,
    height?:number,
    title?:string,
    margin: object,
    xaxis?: {
        autorange?: string | boolean,
        dtick?: number, //An jedem wievielten Datenpunkt steht ein label
        title?: object,
        tickangle?: number | string, //in welchem winkel steht ein label?
        tickfont?: {
            size:number,
            color?:string
        }
    },
    yaxis?: {
        dtick?: number,
        title?: object
    },
    legend?: {
        x: number, // zwischen 0 und 1
        y: number, //zwischen 0 und 1
        xanchor?: string, //'h' oder 'v'
        yanchor?: string, 
        orientation?: string 
      }
    barmode?:string,
    showlegend?:boolean
}

type plotData = {
    type:string,
    x?: number[] | string[],
    y?:number[] | string[],
    text?, //can display text on individual datapoints e.g. columns of bar chart
    hoverinfo?, //determines which trace information appears on hover
    values?:number[],
    labels?:string[],
    marker?:plotMarkerObj
}

type scatterData = {
    type: 'scatter',
    x: number[] | string[],
    y: number[],
    name?: string,
    marker?:plotMarkerObj,
    fill?:string,
    fillcolor?:string,
    line?: {
        color: string
    }
}

type pieData = {
    type: 'pie',
    values: number[],
    labels: string[],
    marker?:plotMarkerObj,
    hole?: number
}

type boxData = {
    type: 'box',
    y?: string[],
    x?: number[]
    name?: string,
    marker?:plotMarkerObj,
    orientation?: string
}

type barData = {
    type: 'bar',
    x: string[] | number[],
    y: number[] | string[],
    text?, //Text in der Box
    marker?:plotMarkerObj,
    name?:string, //Name in der Legende
    orientation?:string
}

type CountMap = Record<string, number>;

type stringStringNumberMap = { [subject: string]: { [license: string]: number, sum:number } }
