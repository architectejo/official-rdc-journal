import { useState } from "react";
import { Download, Filter, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StatCard } from "@/components/common/StatCard";
import { mockPayments, mockDashboardStats } from "@/services/mockUsers";
import type { Payment } from "@/types/user";
import { CreditCard, TrendingUp, Users, DollarSign } from "lucide-react";

/**
 * Gestion des paiements
 */
export default function DashboardPayments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !statusFilter || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CD", {
      style: "currency",
      currency: "CDF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns: Column<Payment>[] = [
    {
      key: "reference",
      header: "Référence",
      render: (payment) => (
        <span className="font-mono text-sm">{payment.reference}</span>
      ),
    },
    {
      key: "user",
      header: "Utilisateur",
      render: (payment) => (
        <div>
          <p className="font-medium">{payment.user_name}</p>
          <p className="text-xs text-muted-foreground">{payment.user_email}</p>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (payment) => (
        <span className="text-sm">{payment.description}</span>
      ),
    },
    {
      key: "payment_method",
      header: "Méthode",
      render: (payment) => (
        <span className="text-sm">{payment.payment_method}</span>
      ),
    },
    {
      key: "amount",
      header: "Montant",
      className: "text-right",
      render: (payment) => (
        <span className="font-semibold">{formatCurrency(payment.amount)}</span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (payment) => (
        <StatusBadge
          status={payment.status as "pending" | "completed" | "failed" | "refunded"}
        />
      ),
    },
    {
      key: "created_at",
      header: "Date",
      render: (payment) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(payment.created_at)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-12",
      render: () => (
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Receipt className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Paiements</h1>
          <p className="text-muted-foreground">
            Suivi des transactions et abonnements
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Revenus totaux"
          value={formatCurrency(mockDashboardStats.totalRevenue)}
          icon={DollarSign}
        />
        <StatCard
          label="Ce mois"
          value={formatCurrency(mockDashboardStats.revenueThisMonth)}
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          label="Abonnements actifs"
          value={mockDashboardStats.activeSubscriptions}
          icon={CreditCard}
        />
        <StatCard
          label="Utilisateurs payants"
          value={mockPayments.filter((p) => p.status === "completed").length}
          icon={Users}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg">Transactions récentes</CardTitle>
              <CardDescription>{filteredPayments.length} transaction(s)</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Rechercher..."
                className="w-full sm:w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="">Tous</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                  <SelectItem value="refunded">Remboursé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredPayments}
            emptyMessage="Aucune transaction trouvée"
          />
        </CardContent>
      </Card>
    </div>
  );
}
