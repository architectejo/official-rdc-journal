import { cn } from "@/lib/utils";

type StatusType =
  | "published" | "draft" | "archived" | "review"
  | "active" | "expired" | "cancelled" | "pending"
  | "completed" | "failed" | "refunded";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  published: { label: "Publié", className: "bg-success/10 text-success" },
  draft: { label: "Brouillon", className: "bg-muted text-muted-foreground" },
  archived: { label: "Archivé", className: "bg-muted text-muted-foreground" },
  review: { label: "En révision", className: "bg-warning/10 text-warning" },
  active: { label: "Actif", className: "bg-success/10 text-success" },
  expired: { label: "Expiré", className: "bg-destructive/10 text-destructive" },
  cancelled: { label: "Annulé", className: "bg-muted text-muted-foreground" },
  pending: { label: "En attente", className: "bg-warning/10 text-warning" },
  completed: { label: "Complété", className: "bg-success/10 text-success" },
  failed: { label: "Échoué", className: "bg-destructive/10 text-destructive" },
  refunded: { label: "Remboursé", className: "bg-muted text-muted-foreground" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

/**
 * Badge de statut réutilisable
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: "bg-muted text-muted-foreground" };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
