import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, ArrowRight, Calendar, X, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { getTextes, getInstitutions } from "@/services/api";
import type { TexteOfficiel, Institution, TypeTexte, MatiereJuridique } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

const matieres: MatiereJuridique[] = [
  "Droit constitutionnel",
  "Droit administratif",
  "Droit fiscal",
  "Droit minier",
  "Droit commercial",
  "Droit du travail",
  "Droit pénal",
  "Droit foncier",
  "Droit électoral",
  "Droit de l'environnement",
];

/**
 * Liste des textes officiels avec recherche avancée
 */
export default function Textes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [textes, setTextes] = useState<TexteOfficiel[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "");
  const [selectedInstitution, setSelectedInstitution] = useState(searchParams.get("institution") || "");
  const [selectedYear, setSelectedYear] = useState(searchParams.get("annee") || "");
  const [selectedMatiere, setSelectedMatiere] = useState(searchParams.get("matiere") || "");
  const [dateDebut, setDateDebut] = useState(searchParams.get("date_debut") || "");
  const [dateFin, setDateFin] = useState(searchParams.get("date_fin") || "");
  const [motsCles, setMotsCles] = useState(searchParams.get("mots_cles") || "");

  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  const activeFiltersCount = [
    selectedType,
    selectedInstitution,
    selectedYear,
    selectedMatiere,
    dateDebut,
    dateFin,
    motsCles,
  ].filter(Boolean).length;

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
          query: searchQuery || motsCles || undefined,
          type: selectedType ? (selectedType as TypeTexte) : undefined,
          institution_id: selectedInstitution ? parseInt(selectedInstitution) : undefined,
          annee: selectedYear ? parseInt(selectedYear) : undefined,
          date_debut: dateDebut || undefined,
          date_fin: dateFin || undefined,
          matiere: selectedMatiere || undefined,
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
  }, [searchQuery, selectedType, selectedInstitution, selectedYear, selectedMatiere, dateDebut, dateFin, motsCles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedType) params.set("type", selectedType);
    if (selectedInstitution) params.set("institution", selectedInstitution);
    if (selectedYear) params.set("annee", selectedYear);
    if (selectedMatiere) params.set("matiere", selectedMatiere);
    if (dateDebut) params.set("date_debut", dateDebut);
    if (dateFin) params.set("date_fin", dateFin);
    if (motsCles) params.set("mots_cles", motsCles);
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedInstitution("");
    setSelectedYear("");
    setSelectedMatiere("");
    setDateDebut("");
    setDateFin("");
    setMotsCles("");
    setSearchParams({});
  };

  const removeFilter = (filterName: string) => {
    switch (filterName) {
      case "type":
        setSelectedType("");
        break;
      case "institution":
        setSelectedInstitution("");
        break;
      case "year":
        setSelectedYear("");
        break;
      case "matiere":
        setSelectedMatiere("");
        break;
      case "dateDebut":
        setDateDebut("");
        break;
      case "dateFin":
        setDateFin("");
        break;
      case "motsCles":
        setMotsCles("");
        break;
    }
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
        {/* Recherche et filtres */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Recherche principale */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par titre, numéro, contenu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </div>

              {/* Filtres rapides */}
              <div className="flex flex-wrap gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type de texte" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
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
                  <SelectContent className="bg-background">
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
                  <SelectContent className="bg-background">
                    <SelectItem value="">Toutes années</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres avancés
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Filtres avancés */}
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleContent className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Matière juridique</Label>
                      <Select value={selectedMatiere} onValueChange={setSelectedMatiere}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="">Toutes matières</SelectItem>
                          {matieres.map((matiere) => (
                            <SelectItem key={matiere} value={matiere}>
                              {matiere}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <Input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Date de fin</Label>
                      <Input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Mots-clés</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="mines, budget, santé..."
                          value={motsCles}
                          onChange={(e) => setMotsCles(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Filtres actifs */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                  {selectedType && (
                    <Badge variant="secondary" className="gap-1">
                      Type: {selectedType}
                      <button onClick={() => removeFilter("type")} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedInstitution && (
                    <Badge variant="secondary" className="gap-1">
                      Institution: {institutions.find(i => i.id.toString() === selectedInstitution)?.sigle}
                      <button onClick={() => removeFilter("institution")} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedYear && (
                    <Badge variant="secondary" className="gap-1">
                      Année: {selectedYear}
                      <button onClick={() => removeFilter("year")} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedMatiere && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedMatiere}
                      <button onClick={() => removeFilter("matiere")} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {motsCles && (
                    <Badge variant="secondary" className="gap-1">
                      Mots-clés: {motsCles}
                      <button onClick={() => removeFilter("motsCles")} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>
                    Tout effacer
                  </Button>
                </div>
              )}
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
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-xs text-muted-foreground">
                        {texte.institution.nom}
                        {texte.journal_numero && ` • ${texte.journal_numero}`}
                      </span>
                      {texte.mots_cles.slice(0, 3).map((mot) => (
                        <Badge key={mot} variant="outline" className="text-xs">
                          {mot}
                        </Badge>
                      ))}
                    </div>
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
