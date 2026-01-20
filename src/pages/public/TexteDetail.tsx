import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Calendar, Building2, BookOpen, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTexteById } from "@/services/api";
import type { TexteOfficiel } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Détail d'un texte officiel
 */
export default function TexteDetail() {
  const { id } = useParams<{ id: string }>();
  const [texte, setTexte] = useState<TexteOfficiel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getTexteById(parseInt(id));
        setTexte(data);
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
            <div className="h-6 bg-primary-foreground/20 rounded w-24 mb-4 animate-pulse" />
            <div className="h-8 bg-primary-foreground/20 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-6 bg-primary-foreground/20 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!texte) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Texte non trouvé.</p>
            <Button asChild>
              <Link to="/textes">
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
            <Link to="/textes">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux textes
            </Link>
          </Button>

          <div className="flex items-center flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-primary-foreground/20 text-primary-foreground">
              {texte.type}
            </span>
            <span className="text-primary-foreground/70">
              {texte.numero}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {texte.titre}
          </h1>

          <div className="flex items-center flex-wrap gap-4 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {texte.institution.nom}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Publié le {formatDate(texte.date_publication)}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Résumé */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Résumé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {texte.resume}
                </p>
              </CardContent>
            </Card>

            {/* Contenu du texte */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contenu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {texte.contenu}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mots-clés */}
            {texte.mots_cles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mots-clés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {texte.mots_cles.map((mot, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                      >
                        {mot}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Type</p>
                  <p className="font-medium">{texte.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Numéro</p>
                  <p className="font-medium">{texte.numero}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Date de signature</p>
                  <p className="font-medium">{formatDate(texte.date_signature)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Date de publication</p>
                  <p className="font-medium">{formatDate(texte.date_publication)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Institution</p>
                  <p className="font-medium">{texte.institution.nom}</p>
                </div>

                {texte.journal_numero && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Journal Officiel</p>
                    <Link
                      to={`/journal/${texte.journal_id}`}
                      className="font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      <BookOpen className="w-4 h-4" />
                      {texte.journal_numero}
                    </Link>
                  </div>
                )}

                <hr className="border-border" />

                <div className="space-y-2">
                  {texte.pdf_url && (
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger le PDF
                    </Button>
                  )}
                  <Button className="w-full" variant="ghost">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
