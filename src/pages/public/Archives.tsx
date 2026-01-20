import { Link } from "react-router-dom";
import { Calendar, FolderOpen, FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getArchives, getJournauxByAnnee } from "@/services/api";
import type { ArchiveAnnee, NumeroJournal } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Page des archives par année
 */
export default function Archives() {
  const [archives, setArchives] = useState<ArchiveAnnee[]>([]);
  const [loading, setLoading] = useState(true);
  const [journauxParAnnee, setJournauxParAnnee] = useState<Record<number, NumeroJournal[]>>({});
  const [loadingAnnees, setLoadingAnnees] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getArchives();
        setArchives(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const loadJournauxAnnee = async (annee: number) => {
    if (journauxParAnnee[annee] || loadingAnnees[annee]) return;

    setLoadingAnnees((prev) => ({ ...prev, [annee]: true }));
    try {
      const journaux = await getJournauxByAnnee(annee);
      setJournauxParAnnee((prev) => ({ ...prev, [annee]: journaux }));
    } catch (error) {
      console.error("Erreur lors du chargement des journaux:", error);
    } finally {
      setLoadingAnnees((prev) => ({ ...prev, [annee]: false }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* En-tête */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Archives</h1>
          <p className="text-primary-foreground/80">
            Consultez l'historique des Journaux Officiels classés par année
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-24" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {archives.map((archive) => (
              <AccordionItem
                key={archive.annee}
                value={archive.annee.toString()}
                className="border rounded-lg bg-background px-6"
              >
                <AccordionTrigger
                  className="hover:no-underline py-6"
                  onClick={() => loadJournauxAnnee(archive.annee)}
                >
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-foreground">{archive.annee}</h3>
                        <p className="text-sm text-muted-foreground">
                          {archive.nombre_journaux} numéro{archive.nombre_journaux > 1 ? "s" : ""} • {archive.nombre_textes} texte{archive.nombre_textes > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  {loadingAnnees[archive.annee] ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted rounded animate-pulse" />
                      ))}
                    </div>
                  ) : journauxParAnnee[archive.annee]?.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      Aucun numéro disponible pour cette année.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {journauxParAnnee[archive.annee]?.map((journal) => (
                        <Link
                          key={journal.id}
                          to={`/journal/${journal.id}`}
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FolderOpen className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">{journal.numero}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(journal.date_publication)} • {journal.nombre_textes} texte{journal.nombre_textes > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
