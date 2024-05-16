type snDealRows =  {
    "SN Journals ID": number,
    "Journal Title": string,
    imprint: string,
    mainDiscipline: string, 
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