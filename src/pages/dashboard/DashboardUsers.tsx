import { useState } from "react";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTable, Column } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ConfirmModal } from "@/components/common/Modal";
import { mockUsers, mockSubscriptions } from "@/services/mockUsers";
import type { User } from "@/types/user";

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  editor: "Éditeur",
  user: "Utilisateur",
};

/**
 * Gestion des utilisateurs
 */
export default function DashboardUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.organisation?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getUserSubscription = (userId: string) => {
    return mockSubscriptions.find((s) => s.user_id === userId);
  };

  const columns: Column<User>[] = [
    {
      key: "user",
      header: "Utilisateur",
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {user.prenom[0]}
              {user.nom[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {user.prenom} {user.nom}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "organisation",
      header: "Organisation",
      render: (user) => (
        <span className="text-sm">{user.organisation || "—"}</span>
      ),
    },
    {
      key: "role",
      header: "Rôle",
      render: (user) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
          {roleLabels[user.role]}
        </span>
      ),
    },
    {
      key: "subscription",
      header: "Abonnement",
      render: (user) => {
        const sub = getUserSubscription(user.id);
        if (!sub) return <span className="text-sm text-muted-foreground">—</span>;
        return (
          <StatusBadge
            status={sub.status as "active" | "expired" | "cancelled" | "pending"}
          />
        );
      },
    },
    {
      key: "last_login",
      header: "Dernière connexion",
      render: (user) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(user.last_login)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-12",
      render: (user) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background">
            <DropdownMenuItem>
              <Pencil className="w-4 h-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setDeleteModal({ open: true, user })}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs et les rôles
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg">Liste des utilisateurs</CardTitle>
              <CardDescription>{filteredUsers.length} utilisateur(s)</CardDescription>
            </div>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher un utilisateur..."
              className="w-full sm:w-72"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredUsers.map((u) => ({ ...u, id: u.id }))}
            emptyMessage="Aucun utilisateur trouvé"
          />
        </CardContent>
      </Card>

      <ConfirmModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ open, user: null })}
        title="Supprimer l'utilisateur"
        description={`Êtes-vous sûr de vouloir supprimer ${deleteModal.user?.prenom} ${deleteModal.user?.nom} ? Cette action est irréversible.`}
        onConfirm={() => {
          // Logique de suppression (mock)
          console.log("Suppression de:", deleteModal.user?.id);
        }}
        confirmText="Supprimer"
        variant="destructive"
      />
    </div>
  );
}
