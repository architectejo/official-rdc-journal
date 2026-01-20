import { Link, useSearchParams } from "react-router-dom";
import { Calendar, ArrowRight, Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { getJournaux } from "@/services/api";
import type { NumeroJournal } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Liste des numéros du Journal Officiel
 */
export default function JournalList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [journaux, setJournaux] = useState<NumeroJournal[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedYear, setSelectedYear] = useState(searchParams.get("annee") || "");

  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getJournaux({
          query: searchQuery || undefined,
          annee: selectedYear ? parseInt(selectedYear) : undefined,
          limit: 20,
        });
        setJournaux(res.data);
        setTotal(res.total);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, selectedYear]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedYear) params.set("annee", selectedYear);
    setSearchParams(params);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* En-tête */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Journal Officiel</h1>
          <p className="text-primary-foreground/80">
            Consultez les numéros publiés du Journal Officiel de la RDC
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtres */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par numéro ou titre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Toutes années" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes années</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="mb-4 text-sm text-muted-foreground">
          {total} numéro{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-24 mb-2" />
                  <div className="h-6 bg-muted rounded w-full" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : journaux.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">Aucun numéro trouvé pour cette recherche.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedYear("");
                  setSearchParams({});
                }}
              >
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journaux.map((journal) => (
              <Card key={journal.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(journal.date_publication)}
                  </div>
                  <CardTitle className="text-lg">{journal.numero}</CardTitle>
                  <CardDescription>{journal.titre}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {journal.resume}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {journal.nombre_textes} texte{journal.nombre_textes > 1 ? "s" : ""}
                    </span>
                    <Button asChild variant="link" size="sm" className="p-0">
                      <Link to={`/journal/${journal.id}`}>
                        Consulter
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
