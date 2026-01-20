/**
 * Types pour le Journal Officiel de la RDC
 * Définitions strictes TypeScript
 */

// Types de textes officiels
export type TypeTexte =
  | "Loi"
  | "Décret"
  | "Arrêté"
  | "Ordonnance"
  | "Constitution"
  | "Circulaire"
  | "Décision"
  | "Nomination";

// Statut de publication
export type StatutPublication = "brouillon" | "en_revision" | "publié" | "archivé";

// Institution émettrice
export interface Institution {
  id: number;
  nom: string;
  sigle: string;
  description: string;
  ordre: number;
}

// Numéro du Journal Officiel
export interface NumeroJournal {
  id: number;
  numero: string;
  date_publication: string;
  annee: number;
  titre: string;
  resume: string;
  pdf_url: string | null;
  statut: StatutPublication;
  nombre_textes: number;
  created_at: string;
  updated_at: string;
}

// Texte officiel
export interface TexteOfficiel {
  id: number;
  titre: string;
  type: TypeTexte;
  numero: string;
  date_signature: string;
  date_publication: string;
  resume: string;
  contenu: string;
  institution: Institution;
  journal_id: number | null;
  journal_numero: string | null;
  pdf_url: string | null;
  statut: StatutPublication;
  mots_cles: string[];
  created_at: string;
  updated_at: string;
}

// Archive par année
export interface ArchiveAnnee {
  annee: number;
  nombre_journaux: number;
  nombre_textes: number;
}

// Statistiques pour le dashboard
export interface StatistiquesDashboard {
  total_journaux: number;
  total_textes: number;
  total_institutions: number;
  journaux_ce_mois: number;
  textes_ce_mois: number;
  textes_par_type: Record<TypeTexte, number>;
  derniers_journaux: NumeroJournal[];
  derniers_textes: TexteOfficiel[];
}

// Paramètres de recherche
export interface RechercheParams {
  query?: string;
  type?: TypeTexte;
  institution_id?: number;
  annee?: number;
  date_debut?: string;
  date_fin?: string;
  page?: number;
  limit?: number;
}

// Réponse paginée
export interface ReponsePaginee<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
