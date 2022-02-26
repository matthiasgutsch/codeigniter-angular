import { SelectItem } from "primeng/api";

import { environment } from "../../../environments/environment";
export const APP_API = "api/v1/";


export const CLIENTS_API = environment.baseUrl + APP_API + "locations";
export const APPOINTMENTS_API = environment.baseUrl + APP_API + "appointments";
export const LOCATIONS_API = environment.baseUrl + APP_API + "locations";


export const PARAM_WORKS_PATH = '/admin/settings/works/'
export const PARAM_CHECKINS_PATH = '/admin/checkins/'
export const PARAM_TIMESHEETS_PATH = '/admin/timesheets/'
export const PARAM_BILLINGS_PATH = '/admin/billings/'
export const PARAM_PRODUCTS_PATH = '/admin/products/'

export const FISCAL_CODE_VALIDATOR_REGEX =
  /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$/g;



export const API_DATE_FORMAT = 'yyyy-MM-DD[T]HH:mm:ss';
export const CHIPS_DATE_FORMAT = 'DD/MM/yyyy HH:mm';


export const PAGES: SelectItem[] = [
  { label: "Tipo di lavorazione", value: "/admin/settings/works", icon: "pi pi-list" },
  { label: "Tipo di Appuntamento", value: "/admin/settings/appointment-type", icon: "pi pi-list" },
  { label: "Luogo di lavorazione", value: "/admin/settings/locations", icon: "pi pi-list" },
  { label: "Dati clienti aggiuntivi", value: "/admin/settings/personal-data", icon: "pi pi-list" },

];



export const PAGES_PRODUCT: SelectItem[] = [
  
  { label: "Tags", value: "/admin/settings/tags", icon: "pi pi-list" },
  { label: "Marchi / Brands", value: "/admin/settings/brands", icon: "pi pi-list" },
  { label: "Categorie", value: "/admin/settings/categories", icon: "pi pi-list" },
  { label: "Dati technici", value: "/admin/settings/technical-data", icon: "pi pi-list" },
  { label: "Magazzino", value: "/admin/settings/warehouses", icon: "pi pi-list" },

];

export const PAGES_COMPANY: SelectItem[] = [
  
  { label: "Dati aziendali", value: "/admin/settings/company", icon: "pi pi-list" },


];

export const DASHBOARD: SelectItem[] = [
  { label: "Clienti", value: "./clients", icon: "" },
  { label: "Appuntamenti", value: "./appointments" }

];

export const TYPE_LIST: SelectItem[] = [
  { label: "Tutte", value: null },
  { label: "Visita", value: "Visita" },
  { label: "Intervento", value: "Intervento" },
  { label: "Visita di controllo", value: "Visita di controllo" },
  { label: "Amministrazione", value: "Amministrazione" },
  { label: "Altro", value: "Altro" }
];


export const STATUS_PROJECTS: SelectItem[] = [
  { label: "Tutte", value: null },
  { label: "Fase di Esecuzione", value: "Esecuzione" },
  { label: "Fase di Contrattazione", value: "Contrattazione" },
  { label: "Fase di Elaborazione", value: "Elaborazione" },
  { label: "Amministrazione", value: "Amministrazione" },
  { label: "Altro", value: "Altro" }
];



export const PRIORITY_LIST: SelectItem[] = [
  { label: "Da Fare", value: "1" },
  { label: "25 %", value: "2" },
  { label: "75 %", value: "3" },
  { label: "Done", value: "4" }

];



export const STATUS_PRODUCTS: SelectItem[] = [
  { label: "Disponibile", value: "1" },
  { label: "Esaurito", value: "2" },
  { label: "Esauriro temporaneamente", value: "3" },
  { label: "In ordinazione", value: "4" },
  { label: "Altro", value: "5" }
];


export const TIMESHEETS_TYPE: SelectItem[] = [
  { label: "Lavoro", value: "1" },
  { label: "Ferie", value: "2" },
  { label: "Permesso", value: "3" },
  { label: "Straordinari", value: "4" },
  { label: "Altro", value: "5" }
];



  export const STATE_LIST = [
  {label: "Si", value: "1"}, 
  {label: "No", value: "0"}];
  

  export const BILLING_LIST = [
    {label: "Fattura", value: "Fattura"}, 
    {label: "Ricevuta", value: "Ricevuta"}];



  export const BUSINESS_STATE_LIST = [
    {label: "Business", value: "1"}, 
    {label: "Privato", value: "0"}];

    export const EMPLOYEE_TYPE_LIST = [
      {label: "Dipendente", value: "0"}, 
      {label: "Socio", value: "1"}];

export const SEX_LIST: SelectItem[] = [
  { label: "Tutte", value: null },
  { label: "Uomo", value: "Uomo" },
  { label: "Donna", value: "Donna" },
];


export const ANNO_ITEMS: SelectItem[] = [
  { label: "nessuno", value: "" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
  { label: "2018", value: "2018" },
  { label: "2017", value: "2017" },
  { label: "2016", value: "2016" },
  { label: "2015", value: "2015" },
  { label: "2014", value: "2014" },
  { label: "2013", value: "2013" },
  { label: "2012", value: "2012" },
  { label: "2011", value: "2011" },
  { label: "2010", value: "2010" },
  { label: "2009", value: "2009" },
];

export const TIPO_CONTENUTO_MILTILINGUA_ITEMS: SelectItem[] = [
  { label: "...", value: "..." },
  { label: "Attività", value: "Attività" },
  { label: "Contenuti Generici", value: "Contenuti Generici" },
  { label: "Gallerie", value: "Gallerie" },
  { label: "Servizi", value: "Servizi" },
  { label: "Video", value: "Video" },
];

export const TIPO_CONTENUTO_ITEMS: SelectItem[] = [
  { label: "...", value: "..." },
  { label: "Attività", value: "Attività" },
  { label: "Contenuti Generici", value: "Contenuti Generici" },
  { label: "Documenti", value: "Documenti" },
  { label: "News", value: "News" },
  { label: "Sedi", value: "Sedi" },
  { label: "Servizi", value: "Servizi" },
  { label: "Settori", value: "Settori" },
  { label: "Sotto Attività", value: "Sotto Attività" },
  { label: "Sotto Servizi", value: "Sotto Servizi" },
  { label: "Storie", value: "Storie" },
];

export const MENU_ITEMS: any[] = [
  {
    link: "allegati",
    not: "",
    title: "Allegati",
    icon: "fa fa-paperclip",
    description: "Gestione dei Allegati",
  },
  {
    link: "attivita",
    not: "sotto",
    title: "Attività",
    icon: "fa fa-cogs",
    description: "Gestione delle Attività",
  },
  {
    link: "blog",
    not: "",
    title: "Blog",
    icon: "fa fa-book",
    description: "Blog",
  },
  {
    link: "contenuti-generici",
    not: "",
    title: "Contenuti Generici",
    icon: "fa fa-connectdevelop",
    description: "Gestione dei Contenuti Generici",
  },

  {
    link: "careers",
    not: "",
    title: "Careers",
    icon: "fa fa-file-o",
    description: "Offerte di lavoro",
  },
  {
    link: "formrequestcareer",
    not: "",
    title: " Curriculum",
    icon: "fa fa-envelope-o",
    description: "Curriculum",
  },

  {
    link: "documenti",
    not: "",
    title: "Documenti",
    icon: "fa fa-file-o",
    description: "Gestione dei Documenti",
  },
  {
    link: "multilingue",
    not: "",
    title: "Multilingue",
    icon: "fa fa-language",
    description: "Gestione delle Multilingue",
  },
  {
    link: "news",
    not: "",
    title: "News",
    icon: "fa fa-newspaper-o",
    description: "Gestione delle News",
  },
  {
    link: "sedi",
    not: "",
    title: "Sedi",
    icon: "fa fa-home",
    description: "Gestione delle Sedi",
  },
  {
    link: "servizi",
    not: "sotto",
    title: "Servizi",
    icon: "fa fa-server",
    description: "Gestione dei Servizi",
  },
  {
    link: "settori",
    not: "",
    title: "Settori",
    icon: "fa fa-wpforms",
    description: "Gestione dei Settori",
  },
  {
    link: "sottoattivita",
    not: "",
    title: "Sotto Attività",
    icon: "fa fa-cog",
    description: "Gestione delle Sotto Attività",
  },
  {
    link: "sottoservizi",
    not: "",
    title: "Sotto Servizi",
    icon: "fa fa-th-list",
    description: "Gestione dei Sotto Servizi",
  },
  {
    link: "storie",
    not: "",
    title: "Storia",
    icon: "fa fa-history",
    description: "Gestione della Storia",
  },
  {
    link: "video",
    not: "",
    title: "Video",
    icon: "fa fa-youtube",
    description: "Gestione dei Video",
  },
  {
    link: "gallerie",
    not: "",
    title: "Gallerie di Foto",
    icon: "fa fa-picture-o",
    description: "Gestione delle Gallerie di Foto",
  },
  {
    link: "formrequest",
    not: "",
    title: "Richieste",
    icon: "fa fa-envelope-o",
    description: "Richieste",
  },
];

export const APP_VERSION = "2.0";
export const EDITOR_CONFIGURATION =
  'selector:"textarea", plugins: "table",  menubar: "false", height: 400, toolbar: "table | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent"';
