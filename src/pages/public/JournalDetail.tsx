import { Link, useParams } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight, Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { getJournalById, getTextesByJournal } from "@/services/api";
import type { NumeroJournal, TexteOfficiel } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Détail d'un numéro du Journal Officiel
 */
export default function JournalDetail() {
  const { id } = useParams<{ id: string }>();
  const [journal, setJournal] = useState<NumeroJournal | null>(null);
  const [textes, setTextes] = useState<TexteOfficiel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      try {
        const [journalData, textesData] = await Promise.all([
          getJournalById(parseInt(id)),
          getTextesByJournal(parseInt(id)),
        ]);
        setJournal(journalData);
        setTextes(textesData);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="h-8 bg-primary-foreground/20 rounded w-48 mb-2 animate-pulse" />
            <div className="h-6 bg-primary-foreground/20 rounded w-96 animate-pulse" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-20 mb-2" />
                <div className="h-5 bg-muted rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Numéro du Journal non trouvé.</p>
            <Button asChild>
              <Link to="/journal">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la liste
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* En-tête */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-4 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link to="/journal">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Link>
          </Button>

          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-2">
            <Calendar className="w-4 h-4" />
            {formatDate(journal.date_publication)}
          </div>

          <h1 className="text-3xl font-bold mb-2">{journal.numero}</h1>
          <p className="text-primary-foreground/80 text-lg">{journal.titre}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Textes contenus dans ce numéro</CardTitle>
                <CardDescription>
                  {textes.length} texte{textes.length > 1 ? "s" : ""} officiel{textes.length > 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {textes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun texte associé à ce numéro.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {textes.map((texte) => (
                      <Link
                        key={texte.id}
                        to={`/textes/${texte.id}`}
                        className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                {texte.type}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {texte.numero}
                              </span>
                            </div>
                            <h3 className="font-medium text-foreground line-clamp-2">
                              {texte.titre}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {texte.institution.nom}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Numéro</p>
                  <p className="font-medium">{journal.numero}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Date de publication</p>
                  <p className="font-medium">{formatDate(journal.date_publication)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Année</p>
                  <p className="font-medium">{journal.annee}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Nombre de textes</p>
                  <p className="font-medium">{journal.nombre_textes}</p>
                </div>

                <hr className="border-border" />

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Résumé</p>
                  <p className="text-sm text-muted-foreground">{journal.resume}</p>
                </div>

                {journal.pdf_url && (
                  <>
                    <hr className="border-border" />
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger le PDF
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
