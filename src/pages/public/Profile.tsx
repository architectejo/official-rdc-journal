import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  Download,
  CreditCard,
  Settings,
  LogOut,
  Calendar,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockUsers, mockSubscriptions, mockDownloadHistory, mockPayments } from "@/services/mockUsers";

/**
 * Page profil utilisateur (mock)
 */
export default function Profile() {
  // Simuler un utilisateur connecté
  const user = mockUsers[2]; // Paul Tshisekedi
  const subscription = mockSubscriptions.find((s) => s.user_id === user.id);
  const downloads = mockDownloadHistory.filter((d) => d.user_id === user.id);
  const payments = mockPayments.filter((p) => p.user_id === user.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CD", {
      style: "currency",
      currency: "CDF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const subscriptionLabel = {
    free: "Gratuit",
    basic: "Basic",
    premium: "Premium",
    enterprise: "Entreprise",
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* En-tête */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary-foreground/20">
              <AvatarFallback className="text-2xl bg-primary-foreground text-primary">
                {user.prenom[0]}
                {user.nom[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {user.prenom} {user.nom}
              </h1>
              <p className="text-primary-foreground/80">{user.email}</p>
              {subscription && (
                <Badge className="mt-2 bg-primary-foreground/20 hover:bg-primary-foreground/30">
                  <Crown className="w-3 h-3 mr-1" />
                  {subscriptionLabel[subscription.type]}
                </Badge>
              )}
            </div>
            <div className="flex-1" />
            <Button variant="secondary" asChild className="hidden md:flex">
              <Link to="/login">
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="downloads">Téléchargements</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  {user.telephone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{user.telephone}</span>
                    </div>
                  )}
                  {user.organisation && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{user.organisation}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      Membre depuis {formatDate(user.created_at)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Abonnement */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Abonnement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {subscription ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <Badge variant="secondary">
                          {subscriptionLabel[subscription.type]}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Statut</span>
                        <Badge
                          variant={
                            subscription.status === "active" ? "default" : "secondary"
                          }
                          className={
                            subscription.status === "active"
                              ? "bg-success text-success-foreground"
                              : ""
                          }
                        >
                          {subscription.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Expire le
                        </span>
                        <span className="text-sm font-medium">
                          {formatDate(subscription.end_date)}
                        </span>
                      </div>
                      <Button className="w-full" variant="outline">
                        Gérer l'abonnement
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Aucun abonnement actif
                      </p>
                      <Button>Souscrire</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Statistiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Activité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Documents téléchargés
                    </span>
                    <span className="text-2xl font-bold">{downloads.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Paiements effectués
                    </span>
                    <span className="text-2xl font-bold">{payments.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Téléchargements */}
          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle>Historique des téléchargements</CardTitle>
                <CardDescription>
                  Documents que vous avez téléchargés
                </CardDescription>
              </CardHeader>
              <CardContent>
                {downloads.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun téléchargement
                  </div>
                ) : (
                  <div className="space-y-4">
                    {downloads.map((dl) => (
                      <div
                        key={dl.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-medium">{dl.texte_titre}</p>
                            <p className="text-sm text-muted-foreground">
                              {dl.texte_type} • {formatDate(dl.downloaded_at)}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/textes/${dl.texte_id}`}>Voir</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paiements */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Historique des paiements</CardTitle>
                <CardDescription>Vos transactions et factures</CardDescription>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun paiement
                  </div>
                ) : (
                  <div className="space-y-4">
                    {payments.map((pay) => (
                      <div
                        key={pay.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{pay.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {pay.payment_method} • {formatDate(pay.created_at)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Réf: {pay.reference}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(pay.amount)}</p>
                          <Badge
                            variant={
                              pay.status === "completed" ? "default" : "secondary"
                            }
                            className={
                              pay.status === "completed"
                                ? "bg-success text-success-foreground"
                                : pay.status === "pending"
                                ? "bg-warning text-warning-foreground"
                                : ""
                            }
                          >
                            {pay.status === "completed"
                              ? "Payé"
                              : pay.status === "pending"
                              ? "En attente"
                              : pay.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Paramètres du compte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="font-medium">Modifier le profil</p>
                    <p className="text-sm text-muted-foreground">
                      Mettre à jour vos informations personnelles
                    </p>
                  </div>
                  <Button variant="outline">Modifier</Button>
                </div>
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="font-medium">Changer le mot de passe</p>
                    <p className="text-sm text-muted-foreground">
                      Modifier votre mot de passe de connexion
                    </p>
                  </div>
                  <Button variant="outline">Modifier</Button>
                </div>
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Gérer vos préférences de notification
                    </p>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-destructive">
                      Supprimer le compte
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cette action est irréversible
                    </p>
                  </div>
                  <Button variant="destructive">Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
