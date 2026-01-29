/**
 * Types pour les utilisateurs et l'authentification
 */

export type UserRole = "admin" | "editor" | "user";

export type SubscriptionType = "free" | "basic" | "premium" | "enterprise";

export type SubscriptionStatus = "active" | "expired" | "cancelled" | "pending";

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  avatar_url?: string;
  telephone?: string;
  organisation?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  type: SubscriptionType;
  status: SubscriptionStatus;
  start_date: string;
  end_date: string;
  amount: number;
  currency: string;
}

export interface Payment {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  payment_method: string;
  description: string;
  created_at: string;
  reference: string;
}

export interface DownloadHistory {
  id: string;
  user_id: string;
  texte_id: number;
  texte_titre: string;
  texte_type: string;
  downloaded_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
