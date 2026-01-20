import { BookOpen, FileText, Building2, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getStatistiquesDashboard } from "@/services/api";
import type { StatistiquesDashboard } from "@/types/journal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

  const statCards = [
    { label: "Numéros du JO", value: stats?.total_journaux || 0, icon: BookOpen, color: "text-primary" },
    { label: "Textes Officiels", value: stats?.total_textes || 0, icon: FileText, color: "text-primary" },
    { label: "Institutions", value: stats?.total_institutions || 0, icon: Building2, color: "text-primary" },
    { label: "Ce mois", value: stats?.textes_ce_mois || 0, icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble du Journal Officiel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {loading ? "—" : stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
