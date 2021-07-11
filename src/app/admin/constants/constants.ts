import { SelectItem } from "primeng/api";




export const LINGUE_ITEMS: SelectItem[] = [
  { label: "Tutte", value: null },
  { label: "Agrigento", value: "Agrigento" },
  { label: "Alessandria", value: "Alessandria" },
  { label: "Ancona", value: "Ancona" },
  { label: "Aosta", value: "Aosta" },
  { label: "Arezzo", value: "Arezzo" },
  { label: "Ascoli Piceno", value: "Ascoli Piceno" },
  { label: "Asti", value: "Asti" },
  { label: "Avellino", value: "Avellino" },
  { label: "Bari", value: "Bari" },
  { label: "Barletta-Andria-Trani", value: "Barletta-Andria-Trani" },
  { label: "Belluno", value: "Belluno" },
  { label: "Benevento", value: "Benevento" },
  { label: "Bergamo", value: "Bergamo" },
  { label: "Biella", value: "Biella" },
  { label: "Bologna", value: "Bologna" },
  { label: "Bolzano", value: "Bolzano" },
 

];

export const PAESI_IT: SelectItem[] = [
  { label: "paese", value: null },
  { label: "Italia", value: "Italia" },
  { label: "Europa", value: "Europa" },
  { label: "Asia", value: "Asia" },
  { label: "Sud America", value: "Sud America" },
  { label: "Nord America", value: "Nord America" },
  { label: "Africa", value: "Africa" },
];

export const PAESI_EN: SelectItem[] = [
  { label: "paese", value: null },
  { label: "Italy", value: "Italy" },
  { label: "Europe", value: "Europe" },
  { label: "Asia", value: "Asia" },
  { label: "South America", value: "South America" },
  { label: "North America", value: "North America" },
  { label: "Africa", value: "Africa" },
];

export const POSIZIONI_ITEMS: SelectItem[] = [
  { label: "Nessuna posizione", value: null },
  { label: "Header", value: "header" },
  { label: "Banner", value: "banner" },
  { label: "Top", value: "top" },
  { label: "Middle", value: "middle" },
  { label: "Bottom", value: "bottom" },
];

export const TEMPLATE_ITEMS: SelectItem[] = [
  { label: "Nessuno", value: null },
  { label: "Default", value: "default" },
  { label: "Allegato Con Tab", value: "with-tabs" },
  { label: "Allegato Con Tab / Ora", value: "with-tabs-time" },
  { label: "Allegato Con Tab senza Data", value: "with-tabs-without-date" },
  { label: "Galleria Fotografica", value: "picture-gallery" },
  { label: "Con Allegati", value: "with-uploads" },
  { label: "Societa Trasparente", value: "societa-trasparente" },
  { label: "Storia", value: "story" },
  { label: "Full Width", value: "full-width" },
  { label: "Titoli SRI", value: "titoli-sri" },
  { label: "Disclaimer", value: "disclaimer " },
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
export const COLORI_ITEMS: any[] = [
  { label: "green1", value: "green1", color: "#70A829" },
  { label: "green2", value: "green2", color: "#BDCD00" },
  { label: "grey1", value: "grey1", color: "#748C8F" },
  { label: "blue1", value: "blue1", color: "#2BABA5" },
  { label: "blue2", value: "blue2", color: "#619BB3" },
  { label: "orange", value: "orange", color: "#ff9e18" },
  { label: "red_dark", value: "red_dark", color: "#815366" },
  { label: "rose", value: "rose", color: "#ec9bad" },
  { label: "pink", value: "pink", color: "#e50695" },
  { label: "red1", value: "red1", color: "#d50037" },
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
