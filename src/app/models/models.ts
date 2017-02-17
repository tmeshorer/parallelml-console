export class Customer {
    constructor(
        public id            : number,
        public user_name     : string,
        public password      : string,
        public first_name    : string,
        public last_name     : string,
        public address       : string,
        public email         : string,
        public phone         : string,
        public company       : string,
        public admin         : boolean,
        public active        : boolean,
        public gid           : number,
        public tid           : number
        ) {}
}

export class Pipeline {
    public id:number;
	public studyid:number;
	public uuid:string;    
	public f1:number;       
	public accuracy:number;       
	public prec:number;            
	public recall:number;            
	public auc:number;               
	public fp:number;                
	public fn:number;                
	public tn:number;                
	public tp:number;                
	public configuration:string;  
	public started:Date;
	public ended:Date;
	public created:Date;
	public updated:Date;

    constructor(
        id              : number,
        studyid         : number,
        uuid            : string,
) {
        this.id = id;
        this.studyid = studyid
        this.uuid = uuid
 }
}


export class Dataset {
    public created:Date;
	public updated:Date;

    columns: Array<DColumn>;

    constructor(
        public id:number,
        public cid:number,
        public path:string,
        public name:string,
) {
    this.columns = new Array<DColumn>();
}

   public addColumn(c:DColumn) {
       this.columns.push(c)
   }

   public setCols(cols:Array<DColumn>) {
       this.columns = cols
   }

}

// Represent a dataset column
export class DColumn {
    public created:Date;
	public updated:Date;
	public types:any;

    constructor(
        public id:number,
        public datasetid:number,
        public name :string,
        public type   : string,
        public ignore : boolean
    ) {
        this.types = [
            { value: 'string', display: 'String' },
            { value: 'integer', display: 'Integer' },
            { value: 'binary', display: 'Binary' },
            { value: 'float', display: 'Float' },
            { value: 'void', display: 'Void' },
            { value: 'unknown', display: 'Unknown' },
        ];

    }

}

export class Node {
    constructor(
        public id:number,
        public partyid : number,
        public name : string,
        public ip : string,
        public port : number) {
    }
}

export class Study {
    // database assigned id
    public id:number;
    // the customer id
    public cid: number;
    // system wide uuid.
    public uuid:string;
    // the human readable name
    public name : string;
    // the source dataset
    public datasetid: number;
    // the stady state
    public state:string;
    // the number in min allowed the experiment to take place
    public evallen:number;
    // how many pipelined were planned
    public pipelines_planned:number;
    // how many pipeline were done
    public pipelines_done:number;
    // when the loss functions
    public objective:string;
    // classification or regression
    public et:string;
    // number of cpu
    public workers:number 
    // precent of training
    public pct_train:number;
    // precent of validition
    public pct_tune:number;
    // precent of testing
    public pct_test:number;
    // should we use cross validation
    public use_cv:boolean;
    // number of folds
    public folds:number;
    // when the study started
    public started: Date;
    // when the study ended 
    public ended:Date;
    // when the study was created, 
    public created:Date;
	// When the study was updated
	public updated:Date;
    // the study columns
    public columns: Array<SColumn>;

    public estimator_types = [
       { value: 'classification', display: 'Classification' },
       { value: 'regression', display: 'Regression'     }  
   ];

   public study_state = [
       {value:'0',display:"N/A"},
       {value:'1',display:"Created"},
       {value:'2',display:"Waiting"},
       {value:'3',display:"Running"},
       {value:'4',display:"Evaluting"},
       {value:'5',display:"Done"},
   ]

   public classification_metrics = [
         {value:'auc',display:'AUC'},
         {value:'f1',display:'F1'},
         {value:'precision',display:'Precision'},
         {value:'recall',display:'Recall'},
   ]

   public regression_metrics = [
         {value:'r_sqr',display:'R Squared'},
         {value:'gini_norm',display:'Gini Norm'},
         {value:'w_gini_norm',display:'Weighted Gini Norm'},
         {value:'w_r_sqr',display:'Weighted R Squared'},
         {value:'w_rmlse',display:'Weighted RMSLE'},
   ]



   public precents = [
         {value:0,display:'0'},
         {value:10,display:'10'},
         {value:20,display:'20'},
         {value:30,display:'30'},
         {value:40,display:'40'},
         {value:50,display:'50'},
         {value:60,display:'60'},
         {value:70,display:'70'},
         {value:80,display:'80'},
         {value:90,display:'90'},
         {value:100,display:'100'},
   ]

   public folds_values = [
         {value:5,display:'5'},
         {value:10,display:'10'},
   ]
   
   constructor(id:number,uuid:string)
   {
         this.id = id;
         this.datasetid=1;
         this.uuid=uuid;
         this.workers=1;
         this.et = 'classification';
         this.evallen=20;
         this.columns = new Array<SColumn>();
         this.objective ='auc';
         this.pct_train = 70;
         this.pct_tune  = 10;
         this.pct_test  =20;
         this.use_cv = true;
         this.name="";
         this.folds=10;
         this.state=this.study_state[this.state].display;
   }
     
   public add(sc:SColumn) {
       this.columns.push(sc)
   }

   public setCols(cols:Array<SColumn>) {
       this.columns = cols
   }
}


export class SColumn {
    public crearted:Date;
    public updated:Date;

    public roles = [
         {value:1,display:'Target'},
         {value:2,display:'Feature'},
    ]


    constructor(
        public id          : number,
        public studyid     : number,
        public dcolumnid   : number,
        public name        : string,
        public dt          : string,
        public role        : number,
	)
     {}
}