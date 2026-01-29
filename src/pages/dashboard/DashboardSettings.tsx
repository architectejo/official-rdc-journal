import { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Globe,
  Mail,
  Database,
  Key,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

/**
 * Page des paramètres du système
 */
export default function DashboardSettings() {
  const { toast } = useToast();
  const [siteName, setSiteName] = useState("Journal Officiel de la RDC");
  const [siteEmail, setSiteEmail] = useState("contact@jordc.cd");
  const [language, setLanguage] = useState("fr");
  const [timezone, setTimezone] = useState("Africa/Kinshasa");

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newPublicationAlert, setNewPublicationAlert] = useState(true);
  const [paymentAlert, setPaymentAlert] = useState(true);
  const [securityAlert, setSecurityAlert] = useState(true);

  // Sécurité
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const handleSave = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Les modifications ont été appliquées avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">
          Configuration générale du système
        </p>
      </div>

      {/* Paramètres généraux */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Général
          </CardTitle>
          <CardDescription>Paramètres de base du site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="site-name">Nom du site</Label>
              <Input
                id="site-name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-email">Email de contact</Label>
              <Input
                id="site-email"
                type="email"
                value={siteEmail}
                onChange={(e) => setSiteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Langue</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fuseau horaire</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="Africa/Kinshasa">Africa/Kinshasa (UTC+1)</SelectItem>
                  <SelectItem value="Africa/Lubumbashi">Africa/Lubumbashi (UTC+2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Gérez les alertes et notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des emails pour les événements importants
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Nouvelles publications</Label>
              <p className="text-sm text-muted-foreground">
                Alerte lors de la publication d'un nouveau texte
              </p>
            </div>
            <Switch
              checked={newPublicationAlert}
              onCheckedChange={setNewPublicationAlert}
              disabled={!emailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Paiements</Label>
              <p className="text-sm text-muted-foreground">
                Alerte pour les transactions et abonnements
              </p>
            </div>
            <Switch
              checked={paymentAlert}
              onCheckedChange={setPaymentAlert}
              disabled={!emailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertes de sécurité</Label>
              <p className="text-sm text-muted-foreground">
                Notifications pour les événements de sécurité
              </p>
            </div>
            <Switch
              checked={securityAlert}
              onCheckedChange={setSecurityAlert}
              disabled={!emailNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Sécurité
          </CardTitle>
          <CardDescription>Options de sécurité avancées</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Exiger une vérification supplémentaire pour la connexion admin
              </p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Expiration de session (minutes)</Label>
              <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 heure</SelectItem>
                  <SelectItem value="120">2 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Key className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Clés API</p>
                <p className="text-sm text-muted-foreground">
                  Gérer les clés d'accès pour les intégrations
                </p>
              </div>
              <Button variant="outline" size="sm">
                Gérer
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Database className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Sauvegarde des données</p>
                <p className="text-sm text-muted-foreground">
                  Dernière sauvegarde: 28 janvier 2026
                </p>
              </div>
              <Button variant="outline" size="sm">
                Sauvegarder
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone dangereuse */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Zone dangereuse
          </CardTitle>
          <CardDescription>
            Actions irréversibles - Procédez avec précaution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
            <div>
              <p className="font-medium">Vider le cache</p>
              <p className="text-sm text-muted-foreground">
                Supprimer tous les fichiers en cache
              </p>
            </div>
            <Button variant="outline">Vider</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
            <div>
              <p className="font-medium">Réinitialiser les statistiques</p>
              <p className="text-sm text-muted-foreground">
                Remettre à zéro tous les compteurs
              </p>
            </div>
            <Button variant="destructive">Réinitialiser</Button>
          </div>
        </CardContent>
      </Card>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
