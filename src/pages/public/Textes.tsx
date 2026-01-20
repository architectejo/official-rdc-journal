import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getTextes, getInstitutions } from "@/services/api";
import type { TexteOfficiel, Institution, TypeTexte } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const typesTexte: TypeTexte[] = [
  "Loi",
  "Décret",
  "Arrêté",
  "Ordonnance",
  "Constitution",
  "Circulaire",
  "Décision",
  "Nomination",
];

/**
 * Liste des textes officiels avec filtres
 */
export default function Textes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [textes, setTextes] = useState<TexteOfficiel[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "");
  const [selectedInstitution, setSelectedInstitution] = useState(searchParams.get("institution") || "");
  const [selectedYear, setSelectedYear] = useState(searchParams.get("annee") || "");

  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  useEffect(() => {
    async function fetchInstitutions() {
      const data = await getInstitutions();
      setInstitutions(data);
    }
    fetchInstitutions();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getTextes({
          query: searchQuery || undefined,
          type: selectedType ? (selectedType as TypeTexte) : undefined,
          institution_id: selectedInstitution ? parseInt(selectedInstitution) : undefined,
          annee: selectedYear ? parseInt(selectedYear) : undefined,
          limit: 20,
        });
        setTextes(res.data);
        setTotal(res.total);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, selectedType, selectedInstitution, selectedYear]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedType) params.set("type", selectedType);
    if (selectedInstitution) params.set("institution", selectedInstitution);
    if (selectedYear) params.set("annee", selectedYear);
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedInstitution("");
    setSelectedYear("");
    setSearchParams({});
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
          <h1 className="text-3xl font-bold mb-2">Textes Officiels</h1>
          <p className="text-primary-foreground/80">
            Recherchez et consultez les lois, décrets, arrêtés et actes réglementaires
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtres */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par titre, numéro, mots-clés..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type de texte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les types</SelectItem>
                    {typesTexte.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                  <SelectTrigger className="w-full sm:w-56">
                    <SelectValue placeholder="Institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes institutions</SelectItem>
                    {institutions.map((inst) => (
                      <SelectItem key={inst.id} value={inst.id.toString()}>
                        {inst.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Année" />
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

                <Button type="button" variant="ghost" onClick={resetFilters}>
                  Réinitialiser
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="mb-4 text-sm text-muted-foreground">
          {total} texte{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-background rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-20 mb-2" />
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : textes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">Aucun texte trouvé pour cette recherche.</p>
              <Button variant="link" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {textes.map((texte) => (
              <Link
                key={texte.id}
                to={`/textes/${texte.id}`}
                className="block bg-background rounded-lg p-4 hover:shadow-md transition-shadow border border-border"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                        {texte.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {texte.numero}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(texte.date_publication)}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                      {texte.titre}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {texte.resume}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {texte.institution.nom}
                      {texte.journal_numero && ` • ${texte.journal_numero}`}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 hidden sm:block" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
