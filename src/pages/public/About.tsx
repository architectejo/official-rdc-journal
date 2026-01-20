import { Scale, BookOpen, Shield, Building2, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Page À Propos - Rôle et valeur juridique du Journal Officiel
 */
export default function About() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* En-tête */}
      <div className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">À Propos du Journal Officiel</h1>
            <p className="text-lg text-primary-foreground/80">
              Comprendre le rôle et la valeur juridique du Journal Officiel
              de la République Démocratique du Congo
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Mission du Journal Officiel</CardTitle>
                  <CardDescription>Publication officielle des textes de loi</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Le Journal Officiel de la République Démocratique du Congo est l'instrument
                officiel de publication des textes législatifs et réglementaires. Il assure
                la publicité légale des actes émanant des pouvoirs publics et garantit ainsi
                l'accessibilité du droit à tous les citoyens.
              </p>
              <p>
                Cette plateforme numérique s'inscrit dans la modernisation de l'administration
                publique et vise à faciliter l'accès aux textes officiels pour tous les citoyens,
                professionnels du droit et institutions.
              </p>
            </CardContent>
          </Card>

          {/* Valeur juridique */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Valeur Juridique</CardTitle>
                  <CardDescription>Force exécutoire et opposabilité</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                La publication au Journal Officiel confère aux textes leur caractère exécutoire
                et les rend opposables aux tiers. Conformément à la Constitution et aux lois
                de la République, un texte n'entre en vigueur qu'après sa publication au
                Journal Officiel, sauf disposition contraire expresse.
              </p>
              <p>
                <strong>Principe fondamental :</strong> « Nul n'est censé ignorer la loi » — ce
                principe ne peut s'appliquer que si les textes sont effectivement accessibles
                au public, d'où l'importance capitale du Journal Officiel.
              </p>
            </CardContent>
          </Card>

          {/* Types de textes */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Textes Publiés</CardTitle>
                  <CardDescription>Catégories d'actes officiels</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { type: "Lois", description: "Adoptées par le Parlement et promulguées par le Président" },
                  { type: "Ordonnances", description: "Actes du Président ayant force de loi" },
                  { type: "Décrets", description: "Actes réglementaires du Gouvernement" },
                  { type: "Arrêtés", description: "Décisions ministérielles et administratives" },
                  { type: "Décisions", description: "Actes des juridictions constitutionnelles" },
                  { type: "Nominations", description: "Désignations aux fonctions officielles" },
                ].map((item) => (
                  <div key={item.type} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{item.type}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Institutions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Institutions Concernées</CardTitle>
                  <CardDescription>Organes émetteurs des textes officiels</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>Les textes publiés au Journal Officiel émanent des institutions suivantes :</p>
              <ul>
                <li><strong>Présidence de la République</strong> — Ordonnances et décrets présidentiels</li>
                <li><strong>Gouvernement</strong> — Décrets et arrêtés gouvernementaux</li>
                <li><strong>Parlement</strong> — Lois votées par l'Assemblée Nationale et le Sénat</li>
                <li><strong>Cour Constitutionnelle</strong> — Arrêts et décisions</li>
                <li><strong>Ministères</strong> — Arrêtés et circulaires ministériels</li>
              </ul>
            </CardContent>
          </Card>

          {/* Garanties */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Garanties d'Authenticité</CardTitle>
                  <CardDescription>Fiabilité et intégrité des textes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Les textes publiés sur cette plateforme sont des reproductions fidèles des
                originaux. Des mesures rigoureuses sont mises en œuvre pour garantir :
              </p>
              <ul>
                <li>L'intégrité des textes publiés</li>
                <li>La traçabilité des modifications</li>
                <li>L'archivage pérenne des documents</li>
                <li>La conformité avec les versions officielles imprimées</li>
              </ul>
              <p>
                <em>
                  Note : En cas de divergence entre la version numérique et la version papier
                  originale, cette dernière fait foi.
                </em>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
