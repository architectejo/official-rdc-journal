import { mockInstitutions } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";

export default function DashboardInstitutions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Institutions</h1>
          <p className="text-muted-foreground">Gérer les institutions émettrices</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />Nouvelle institution</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {mockInstitutions.map((inst) => (
              <div key={inst.id} className="flex items-center justify-between p-4 rounded border">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{inst.nom}</p>
                    <p className="text-sm text-muted-foreground">{inst.sigle} • {inst.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Modifier</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
