/**
 * Service API pour le Journal Officiel de la RDC
 * Utilise des données mockées en attendant le backend Django
 */

import axios from "axios";
import type {
  NumeroJournal,
  TexteOfficiel,
  Institution,
  ArchiveAnnee,
  StatistiquesDashboard,
  RechercheParams,
  ReponsePaginee,
} from "@/types/journal";

// Instance Axios configurée
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// DONNÉES MOCKÉES
// ============================================

export const mockInstitutions: Institution[] = [
  {
    id: 1,
    nom: "Présidence de la République",
    sigle: "PR",
    description: "Cabinet du Président de la République Démocratique du Congo",
    ordre: 1,
  },
  {
    id: 2,
    nom: "Gouvernement",
    sigle: "GOV",
    description: "Gouvernement de la République Démocratique du Congo",
    ordre: 2,
  },
  {
    id: 3,
    nom: "Assemblée Nationale",
    sigle: "AN",
    description: "Chambre basse du Parlement",
    ordre: 3,
  },
  {
    id: 4,
    nom: "Sénat",
    sigle: "SEN",
    description: "Chambre haute du Parlement",
    ordre: 4,
  },
  {
    id: 5,
    nom: "Cour Constitutionnelle",
    sigle: "CC",
    description: "Juridiction constitutionnelle suprême",
    ordre: 5,
  },
  {
    id: 6,
    nom: "Ministère de la Justice",
    sigle: "MINJUST",
    description: "Ministère de la Justice et Garde des Sceaux",
    ordre: 6,
  },
];

export const mockJournaux: NumeroJournal[] = [
  {
    id: 1,
    numero: "JO-2026-001",
    date_publication: "2026-01-15",
    annee: 2026,
    titre: "Journal Officiel N°1 - Janvier 2026",
    resume: "Premier numéro de l'année 2026 contenant les textes relatifs à l'organisation administrative.",
    pdf_url: "/documents/jo-2026-001.pdf",
    statut: "publié",
    nombre_textes: 5,
    created_at: "2026-01-14T10:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: 2,
    numero: "JO-2025-024",
    date_publication: "2025-12-20",
    annee: 2025,
    titre: "Journal Officiel N°24 - Décembre 2025",
    resume: "Numéro spécial de fin d'année - Loi de finances 2026.",
    pdf_url: "/documents/jo-2025-024.pdf",
    statut: "publié",
    nombre_textes: 8,
    created_at: "2025-12-19T10:00:00Z",
    updated_at: "2025-12-20T08:00:00Z",
  },
  {
    id: 3,
    numero: "JO-2025-023",
    date_publication: "2025-12-05",
    annee: 2025,
    titre: "Journal Officiel N°23 - Décembre 2025",
    resume: "Nominations et décrets d'application.",
    pdf_url: "/documents/jo-2025-023.pdf",
    statut: "publié",
    nombre_textes: 12,
    created_at: "2025-12-04T10:00:00Z",
    updated_at: "2025-12-05T08:00:00Z",
  },
  {
    id: 4,
    numero: "JO-2025-022",
    date_publication: "2025-11-15",
    annee: 2025,
    titre: "Journal Officiel N°22 - Novembre 2025",
    resume: "Textes relatifs à la décentralisation territoriale.",
    pdf_url: "/documents/jo-2025-022.pdf",
    statut: "publié",
    nombre_textes: 6,
    created_at: "2025-11-14T10:00:00Z",
    updated_at: "2025-11-15T08:00:00Z",
  },
  {
    id: 5,
    numero: "JO-2025-021",
    date_publication: "2025-10-30",
    annee: 2025,
    titre: "Journal Officiel N°21 - Octobre 2025",
    resume: "Arrêtés ministériels et circulaires administratives.",
    pdf_url: "/documents/jo-2025-021.pdf",
    statut: "publié",
    nombre_textes: 9,
    created_at: "2025-10-29T10:00:00Z",
    updated_at: "2025-10-30T08:00:00Z",
  },
];

export const mockTextes: TexteOfficiel[] = [
  {
    id: 1,
    titre: "Loi portant Code minier de la République Démocratique du Congo",
    type: "Loi",
    numero: "007/2025",
    date_signature: "2025-12-10",
    date_publication: "2025-12-20",
    resume: "Nouvelle législation encadrant l'exploitation minière sur le territoire national.",
    contenu: "Article 1 : La présente loi fixe les règles relatives à la prospection, à la recherche, à l'exploitation, à la transformation et au transport des substances minérales...",
    institution: mockInstitutions[2],
    journal_id: 2,
    journal_numero: "JO-2025-024",
    pdf_url: "/documents/loi-007-2025.pdf",
    statut: "publié",
    mots_cles: ["mines", "exploitation", "ressources naturelles"],
    created_at: "2025-12-18T10:00:00Z",
    updated_at: "2025-12-20T08:00:00Z",
  },
  {
    id: 2,
    titre: "Décret portant nomination des membres du Gouvernement",
    type: "Décret",
    numero: "025/2025",
    date_signature: "2025-12-01",
    date_publication: "2025-12-05",
    resume: "Nomination des ministres et vice-ministres du nouveau gouvernement.",
    contenu: "Le Président de la République, Vu la Constitution...",
    institution: mockInstitutions[0],
    journal_id: 3,
    journal_numero: "JO-2025-023",
    pdf_url: "/documents/decret-025-2025.pdf",
    statut: "publié",
    mots_cles: ["nomination", "gouvernement", "ministres"],
    created_at: "2025-12-03T10:00:00Z",
    updated_at: "2025-12-05T08:00:00Z",
  },
  {
    id: 3,
    titre: "Ordonnance relative à l'état d'urgence sanitaire",
    type: "Ordonnance",
    numero: "003/2025",
    date_signature: "2025-11-20",
    date_publication: "2025-11-22",
    resume: "Mesures exceptionnelles en réponse à la crise sanitaire.",
    contenu: "Le Président de la République, Vu l'urgence et la nécessité...",
    institution: mockInstitutions[0],
    journal_id: 4,
    journal_numero: "JO-2025-022",
    pdf_url: "/documents/ordonnance-003-2025.pdf",
    statut: "publié",
    mots_cles: ["urgence", "santé", "mesures exceptionnelles"],
    created_at: "2025-11-20T10:00:00Z",
    updated_at: "2025-11-22T08:00:00Z",
  },
  {
    id: 4,
    titre: "Arrêté ministériel fixant les tarifs douaniers",
    type: "Arrêté",
    numero: "CAB/MIN/FIN/2025/087",
    date_signature: "2025-10-25",
    date_publication: "2025-10-30",
    resume: "Révision des tarifs douaniers à l'importation et à l'exportation.",
    contenu: "Le Ministre des Finances, Vu la loi portant Code des douanes...",
    institution: mockInstitutions[1],
    journal_id: 5,
    journal_numero: "JO-2025-021",
    pdf_url: "/documents/arrete-087-2025.pdf",
    statut: "publié",
    mots_cles: ["douanes", "tarifs", "importation", "exportation"],
    created_at: "2025-10-28T10:00:00Z",
    updated_at: "2025-10-30T08:00:00Z",
  },
  {
    id: 5,
    titre: "Loi de finances pour l'exercice 2026",
    type: "Loi",
    numero: "008/2025",
    date_signature: "2025-12-18",
    date_publication: "2025-12-20",
    resume: "Budget général de l'État pour l'année 2026.",
    contenu: "Titre I : Dispositions générales relatives au budget de l'État...",
    institution: mockInstitutions[2],
    journal_id: 2,
    journal_numero: "JO-2025-024",
    pdf_url: "/documents/loi-008-2025.pdf",
    statut: "publié",
    mots_cles: ["budget", "finances", "exercice 2026"],
    created_at: "2025-12-19T10:00:00Z",
    updated_at: "2025-12-20T08:00:00Z",
  },
  {
    id: 6,
    titre: "Décret portant organisation du Ministère de la Santé",
    type: "Décret",
    numero: "026/2025",
    date_signature: "2025-12-02",
    date_publication: "2025-12-05",
    resume: "Réorganisation des services du Ministère de la Santé Publique.",
    contenu: "Le Premier Ministre, Sur proposition du Ministre de la Santé...",
    institution: mockInstitutions[1],
    journal_id: 3,
    journal_numero: "JO-2025-023",
    pdf_url: "/documents/decret-026-2025.pdf",
    statut: "publié",
    mots_cles: ["organisation", "ministère", "santé"],
    created_at: "2025-12-03T10:00:00Z",
    updated_at: "2025-12-05T08:00:00Z",
  },
  {
    id: 7,
    titre: "Circulaire relative aux marchés publics",
    type: "Circulaire",
    numero: "001/PM/2026",
    date_signature: "2026-01-10",
    date_publication: "2026-01-15",
    resume: "Instructions aux ordonnateurs sur la passation des marchés publics.",
    contenu: "À tous les Ministres, Gouverneurs de province et responsables d'établissements publics...",
    institution: mockInstitutions[1],
    journal_id: 1,
    journal_numero: "JO-2026-001",
    pdf_url: "/documents/circulaire-001-2026.pdf",
    statut: "publié",
    mots_cles: ["marchés publics", "passation", "instructions"],
    created_at: "2026-01-12T10:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: 8,
    titre: "Décision de la Cour Constitutionnelle n°R.Const.456",
    type: "Décision",
    numero: "R.Const.456",
    date_signature: "2026-01-08",
    date_publication: "2026-01-15",
    resume: "Décision relative à la conformité de la loi électorale à la Constitution.",
    contenu: "La Cour Constitutionnelle, siégeant en matière de contrôle de constitutionnalité...",
    institution: mockInstitutions[4],
    journal_id: 1,
    journal_numero: "JO-2026-001",
    pdf_url: "/documents/decision-456-2026.pdf",
    statut: "publié",
    mots_cles: ["constitution", "conformité", "loi électorale"],
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
];

export const mockArchives: ArchiveAnnee[] = [
  { annee: 2026, nombre_journaux: 1, nombre_textes: 5 },
  { annee: 2025, nombre_journaux: 24, nombre_textes: 187 },
  { annee: 2024, nombre_journaux: 24, nombre_textes: 203 },
  { annee: 2023, nombre_journaux: 24, nombre_textes: 195 },
  { annee: 2022, nombre_journaux: 24, nombre_textes: 178 },
  { annee: 2021, nombre_journaux: 24, nombre_textes: 165 },
  { annee: 2020, nombre_journaux: 20, nombre_textes: 142 },
];

// ============================================
// SERVICES API (utilise mock pour l'instant)
// ============================================

/**
 * Récupère les derniers numéros du Journal Officiel
 */
export async function getJournaux(params?: RechercheParams): Promise<ReponsePaginee<NumeroJournal>> {
  // Simulation délai réseau
  await new Promise((resolve) => setTimeout(resolve, 200));

  let data = [...mockJournaux];

  // Filtre par année
  if (params?.annee) {
    data = data.filter((j) => j.annee === params.annee);
  }

  // Filtre par recherche
  if (params?.query) {
    const query = params.query.toLowerCase();
    data = data.filter(
      (j) =>
        j.titre.toLowerCase().includes(query) ||
        j.resume.toLowerCase().includes(query) ||
        j.numero.toLowerCase().includes(query)
    );
  }

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const start = (page - 1) * limit;
  const paginatedData = data.slice(start, start + limit);

  return {
    data: paginatedData,
    total: data.length,
    page,
    limit,
    total_pages: Math.ceil(data.length / limit),
  };
}

/**
 * Récupère un numéro spécifique du Journal
 */
export async function getJournalById(id: number): Promise<NumeroJournal | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockJournaux.find((j) => j.id === id) || null;
}

/**
 * Récupère les textes d'un numéro du Journal
 */
export async function getTextesByJournal(journalId: number): Promise<TexteOfficiel[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockTextes.filter((t) => t.journal_id === journalId);
}

/**
 * Récupère les textes officiels avec filtres
 */
export async function getTextes(params?: RechercheParams): Promise<ReponsePaginee<TexteOfficiel>> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  let data = [...mockTextes];

  // Filtre par type
  if (params?.type) {
    data = data.filter((t) => t.type === params.type);
  }

  // Filtre par institution
  if (params?.institution_id) {
    data = data.filter((t) => t.institution.id === params.institution_id);
  }

  // Filtre par année
  if (params?.annee) {
    data = data.filter((t) => new Date(t.date_publication).getFullYear() === params.annee);
  }

  // Filtre par recherche
  if (params?.query) {
    const query = params.query.toLowerCase();
    data = data.filter(
      (t) =>
        t.titre.toLowerCase().includes(query) ||
        t.resume.toLowerCase().includes(query) ||
        t.numero.toLowerCase().includes(query) ||
        t.mots_cles.some((m) => m.toLowerCase().includes(query))
    );
  }

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const start = (page - 1) * limit;
  const paginatedData = data.slice(start, start + limit);

  return {
    data: paginatedData,
    total: data.length,
    page,
    limit,
    total_pages: Math.ceil(data.length / limit),
  };
}

/**
 * Récupère un texte par son ID
 */
export async function getTexteById(id: number): Promise<TexteOfficiel | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockTextes.find((t) => t.id === id) || null;
}

/**
 * Récupère la liste des institutions
 */
export async function getInstitutions(): Promise<Institution[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockInstitutions;
}

/**
 * Récupère les archives par année
 */
export async function getArchives(): Promise<ArchiveAnnee[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockArchives;
}

/**
 * Récupère les journaux d'une année spécifique
 */
export async function getJournauxByAnnee(annee: number): Promise<NumeroJournal[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockJournaux.filter((j) => j.annee === annee);
}

/**
 * Récupère les statistiques pour le dashboard
 */
export async function getStatistiquesDashboard(): Promise<StatistiquesDashboard> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const texteParType: Record<string, number> = {};
  mockTextes.forEach((t) => {
    texteParType[t.type] = (texteParType[t.type] || 0) + 1;
  });

  return {
    total_journaux: mockJournaux.length,
    total_textes: mockTextes.length,
    total_institutions: mockInstitutions.length,
    journaux_ce_mois: 1,
    textes_ce_mois: 5,
    textes_par_type: texteParType as Record<any, number>,
    derniers_journaux: mockJournaux.slice(0, 3),
    derniers_textes: mockTextes.slice(0, 5),
  };
}
