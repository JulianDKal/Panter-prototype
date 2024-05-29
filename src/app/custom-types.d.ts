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
    apc: number,
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
    color:string
}

type plotLayout = {
    width:number,
    height:number,
    title:string,
    margin: object
}

type plotData = {
    type:string,
    x?: number[],
    y?:number[],
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
    x: number[],
    y: number[],
    marker?:plotMarkerObj
}

type CountMap = Record<string, number>;
