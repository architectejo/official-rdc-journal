import { Link } from "react-router-dom";
import { BookOpen, FileText, Search, Calendar, ArrowRight, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getJournaux, getTextes } from "@/services/api";
import type { NumeroJournal, TexteOfficiel } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Page d'accueil du Journal Officiel de la RDC
 * Design institutionnel sobre et professionnel
 */
export default function Home() {
  const [derniersJournaux, setDerniersJournaux] = useState<NumeroJournal[]>([]);
  const [derniersTextes, setDerniersTextes] = useState<TexteOfficiel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [journauxRes, textesRes] = await Promise.all([
          getJournaux({ limit: 3 }),
          getTextes({ limit: 4 }),
        ]);
        setDerniersJournaux(journauxRes.data);
        setDerniersTextes(textesRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/textes?q=${encodeURIComponent(searchQuery)}`;
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
    <div className="min-h-screen">
      {/* Section Hero */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-sm mb-6">
              <Building2 className="w-4 h-4" />
              <span>République Démocratique du Congo</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Journal Officiel de la République Démocratique du Congo
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Plateforme officielle de publication des lois, décrets, arrêtés et actes
              réglementaires de la République Démocratique du Congo.
            </p>

            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un texte officiel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-primary-foreground text-foreground border-0 h-12"
                  />
                </div>
                <Button type="submit" variant="secondary" size="lg" className="h-12 px-6">
                  Rechercher
                </Button>
              </div>
            </form>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/journal">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Consulter le Journal
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/textes">
                  <FileText className="w-5 h-5 mr-2" />
                  Tous les textes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Derniers numéros */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Derniers numéros publiés</h2>
              <p className="text-muted-foreground mt-1">Les éditions les plus récentes du Journal Officiel</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link to="/journal">
                Voir tous les numéros
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {derniersJournaux.map((journal) => (
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

          <div className="mt-6 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/journal">
                Voir tous les numéros
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Derniers textes */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Derniers textes officiels</h2>
              <p className="text-muted-foreground mt-1">Les textes récemment publiés au Journal Officiel</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link to="/textes">
                Voir tous les textes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-background rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-muted rounded w-20 mb-2" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {derniersTextes.map((texte) => (
                <Link
                  key={texte.id}
                  to={`/textes/${texte.id}`}
                  className="block bg-background rounded-lg p-4 hover:shadow-md transition-shadow border border-border"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                          {texte.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {texte.numero}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                        {texte.titre}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {texte.institution.nom} • {formatDate(texte.date_publication)}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 hidden sm:block" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/textes">
                Voir tous les textes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Accès rapide */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Accès rapide</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Link
              to="/journal"
              className="flex flex-col items-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
            >
              <BookOpen className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-medium text-foreground">Journal Officiel</h3>
              <p className="text-sm text-muted-foreground mt-1">Consulter les numéros</p>
            </Link>

            <Link
              to="/textes"
              className="flex flex-col items-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
            >
              <FileText className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-medium text-foreground">Textes Officiels</h3>
              <p className="text-sm text-muted-foreground mt-1">Lois, décrets, arrêtés</p>
            </Link>

            <Link
              to="/archives"
              className="flex flex-col items-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
            >
              <Calendar className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-medium text-foreground">Archives</h3>
              <p className="text-sm text-muted-foreground mt-1">Historique par année</p>
            </Link>

            <Link
              to="/a-propos"
              className="flex flex-col items-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
            >
              <Building2 className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-medium text-foreground">À Propos</h3>
              <p className="text-sm text-muted-foreground mt-1">Valeur juridique</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
