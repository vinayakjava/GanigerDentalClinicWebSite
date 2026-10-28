// Dr. Ganiger's credentials as supplied by the clinic (2026-10-28). Institution, conference and publication
// names are proper names and stay in English in both languages; translatable labels are in the dictionaries.

export const EDUCATION = [
  { id: "sslc", institution: "KRES High School, Ainapur", year: "2009" },
  { id: "puc", institution: "SMPU (SDM), Dharwad", year: "2011" },
  {
    id: "bds",
    institution: "Maratha Mandal's N. G. H. Institute of Dental Sciences & Research Centre, Belgaum",
    year: "2016",
  },
  { id: "mds", institution: "Sri Hasanamba Dental College and Hospital, Hassan, Karnataka", year: "2020" },
] as const;

export type QualificationId = (typeof EDUCATION)[number]["id"];

export const CONFERENCES = [
  {
    event: "46th Indian Prosthodontic Society Conference, Mangaluru, Karnataka",
    year: "2019",
    kind: "tableClinic",
    title: "Alleviation of elevating pain: occlusal splint therapy for conservative treatment of TMJ disorders",
  },
  {
    event:
      "6th Karnataka Prosthodontic Society Conference, HKE's S. Nijalingappa Institute of Dental Sciences and Research, Kalaburagi",
    year: "2018",
    kind: "ePoster",
    title: "Ocular prosthesis – fabrication techniques",
  },
  {
    event: "21st IPS National PG Convention, Sankalchand Patel University, Visnagar, Gujarat",
    year: "2019",
    kind: "scientificPaper",
    title: "Timing the tremors – prosthodontic management of Parkinson's patient: a case report",
  },
  {
    event: "7th Annual State Conference, Baywatch Resort, Goa",
    year: "2019",
    kind: "ePoster",
    title: "Auricular prosthesis",
  },
] as const;

export type PresentationKind = (typeof CONFERENCES)[number]["kind"];

export const PUBLICATIONS = [
  { title: "Quackery a quandary – fate of dentistry even in 21st century: a case series" },
  {
    title:
      "Simplified technique of iris fabrication and custom made ocular prosthesis for patient with evisceration: a case report",
  },
  {
    title: "A lobe of sound – prosthetic rehabilitation of partial auriculectomy defect: a case report",
    journal: "BMJ",
  },
  {
    title:
      "Implant supported overdenture with cross arch teeth arrangement in rehabilitation of severely atrophied mandibular ridge: a case report",
    journal: "IJDSIR",
    year: "2022",
  },
  {
    title: "Early management of bone loss around implants using laser therapy: a case report",
    journal: "RGUHS Journal of Dental Science",
    year: "2022",
  },
] as const;
