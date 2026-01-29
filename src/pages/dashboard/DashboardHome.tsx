import { BookOpen, FileText, Building2, TrendingUp, Download, Users, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { getStatistiquesDashboard } from "@/services/api";
import { mockDashboardStats } from "@/services/mockUsers";
import type { StatistiquesDashboard } from "@/types/journal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { PublicationsChart, RevenueChart, TextesByTypeChart, DownloadsChart } from "@/components/charts/DashboardCharts";

// Données mockées pour les graphiques
const publicationsData = [
  { mois: "Août", publications: 18 },
  { mois: "Sept", publications: 22 },
  { mois: "Oct", publications: 15 },
  { mois: "Nov", publications: 28 },
  { mois: "Déc", publications: 32 },
  { mois: "Jan", publications: 12 },
];

const revenueData = [
  { mois: "Août", revenus: 450000 },
  { mois: "Sept", revenus: 520000 },
  { mois: "Oct", revenus: 380000 },
  { mois: "Nov", revenus: 650000 },
  { mois: "Déc", revenus: 780000 },
  { mois: "Jan", revenus: 420000 },
];

const downloadsData = [
  { jour: "Lun", telechargements: 45 },
  { jour: "Mar", telechargements: 52 },
  { jour: "Mer", telechargements: 38 },
  { jour: "Jeu", telechargements: 65 },
  { jour: "Ven", telechargements: 48 },
  { jour: "Sam", telechargements: 25 },
  { jour: "Dim", telechargements: 18 },
];

export default function DashboardHome() {
  const [stats, setStats] = useState<StatistiquesDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStatistiquesDashboard();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const textesParType = stats?.textes_par_type
    ? Object.entries(stats.textes_par_type).map(([type, count]) => ({ type, count }))
    : [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CD", {
      style: "currency",
      currency: "CDF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble du Journal Officiel</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Numéros du JO"
          value={loading ? "—" : stats?.total_journaux || 0}
          icon={BookOpen}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          label="Textes Officiels"
          value={loading ? "—" : stats?.total_textes || 0}
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          label="Utilisateurs"
          value={loading ? "—" : mockDashboardStats.totalUsers}
          icon={Users}
        />
        <StatCard
          label="Revenus ce mois"
          value={loading ? "—" : formatCurrency(mockDashboardStats.revenueThisMonth)}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PublicationsChart data={publicationsData} />
        <RevenueChart data={revenueData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {textesParType.length > 0 && <TextesByTypeChart data={textesParType} />}
        <DownloadsChart data={downloadsData} />
      </div>

      {/* Derniers contenus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Derniers numéros</CardTitle>
            <CardDescription>Numéros récemment publiés</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-12 bg-muted rounded animate-pulse" />)}</div>
            ) : (
              <div className="space-y-2">
                {stats?.derniers_journaux.map((j) => (
                  <div key={j.id} className="flex items-center justify-between p-3 rounded bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{j.numero}</p>
                      <p className="text-xs text-muted-foreground">{j.nombre_textes} textes</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(j.date_publication).toLocaleDateString("fr-FR")}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Derniers textes</CardTitle>
            <CardDescription>Textes récemment ajoutés</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-12 bg-muted rounded animate-pulse" />)}</div>
            ) : (
              <div className="space-y-2">
                {stats?.derniers_textes.slice(0, 3).map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded bg-muted/50">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{t.titre}</p>
                      <p className="text-xs text-muted-foreground">{t.type} • {t.numero}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
