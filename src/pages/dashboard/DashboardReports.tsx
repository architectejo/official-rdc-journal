import { useState } from "react";
import { Download, FileText, BarChart3, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  PublicationsChart,
  RevenueChart,
  TextesByTypeChart,
  DownloadsChart,
} from "@/components/charts/DashboardCharts";

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

const textesParType = [
  { type: "Loi", count: 25 },
  { type: "Décret", count: 45 },
  { type: "Arrêté", count: 35 },
  { type: "Ordonnance", count: 15 },
  { type: "Circulaire", count: 20 },
  { type: "Décision", count: 12 },
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

const reportTypes = [
  {
    id: "publications",
    title: "Rapport des publications",
    description: "Statistiques détaillées des textes publiés",
    icon: FileText,
  },
  {
    id: "revenue",
    title: "Rapport financier",
    description: "Revenus, abonnements et transactions",
    icon: BarChart3,
  },
  {
    id: "users",
    title: "Rapport utilisateurs",
    description: "Activité et engagement des utilisateurs",
    icon: FileText,
  },
  {
    id: "downloads",
    title: "Rapport téléchargements",
    description: "Documents les plus consultés",
    icon: Download,
  },
];

/**
 * Page des rapports et statistiques
 */
export default function DashboardReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rapports</h1>
          <p className="text-muted-foreground">
            Statistiques et analyses détaillées
          </p>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label>Période</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="1month">1 mois</SelectItem>
                  <SelectItem value="3months">3 mois</SelectItem>
                  <SelectItem value="6months">6 mois</SelectItem>
                  <SelectItem value="1year">1 an</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Année</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PublicationsChart data={publicationsData} />
        <RevenueChart data={revenueData} />
        <TextesByTypeChart data={textesParType} />
        <DownloadsChart data={downloadsData} />
      </div>

      {/* Export de rapports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exporter des rapports</CardTitle>
          <CardDescription>
            Générez des rapports détaillés au format PDF ou Excel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <report.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-medium mb-1">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {report.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
