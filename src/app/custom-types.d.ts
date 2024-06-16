//der typ enthält alle Spalten einer csv Datei die dann von PapaParse geparsed wird
type snDealRows =  {
    "SN Journals ID": number,
    "Journal Title": string,
    imprint: string,
    "Main Discipline": string, 
    homepageURL: string, 
    pISSN: string, 
    eISSN: string,
    publishingModel: string, 
    activeFrom: string, 
    fachArztZeitschrift: string, 
    "APC": string,
    bmcDiscount: string, 
    oaLicenseType: string,
    standardWorkflow: string, 
    changesWithTerm: string,
    changeValidFrom: string,
    comments: string
}

type CsvParsedEventHandler = (results: ParseResult<snRowsData>) => void;

//typen die Plotly für einen Graphen erwartet:
type plotMarkerObj = {
    color:string,
    opacity?:number,
    line?: {
        color:string,
        width:number
    }
}

type plotLayout = {
    width:number,
    height:number,
    title:string,
    margin: object,
    xaxis?: {
        autorange?: string | boolean,
        dtick?: number, //An jedem wievielten Datenpunkt steht ein label
        title?: object,
        tickangle?: number | string, //in welchem winkel steht ein label?
        tickfont?: {
            size:number,
            color:string
        }
    }
}

type plotData = {
    type:string,
    x?: number[] | string[],
    y?:number[],
    text?, //can display text on individual datapoints e.g. columns of bar chart
    hoverinfo?, //determines which trace information appears on hover
    values?:number[],
    labels?:string[],
    marker?:plotMarkerObj
}

type scatterData = {
    type: 'scatter',
    x: number[],
    y: number[],
    marker?:plotMarkerObj
}

type pieData = {
    type: 'pie',
    values: number[],
    labels: string[],
    marker?:plotMarkerObj
}

type barData = {
    type: 'bar',
    x: string[],
    y: number[],
    text?,
    marker?:plotMarkerObj
}

type CountMap = Record<string, number>;
