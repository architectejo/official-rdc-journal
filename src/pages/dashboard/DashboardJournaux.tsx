import { mockJournaux } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";

export default function DashboardJournaux() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Numéros du Journal</h1>
          <p className="text-muted-foreground">Gérer les numéros du Journal Officiel</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />Nouveau numéro</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {mockJournaux.map((j) => (
              <div key={j.id} className="flex items-center justify-between p-4 rounded border">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{j.numero}</p>
                    <p className="text-sm text-muted-foreground">{j.titre}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded">{j.statut}</span>
                  <Button variant="ghost" size="sm">Modifier</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
