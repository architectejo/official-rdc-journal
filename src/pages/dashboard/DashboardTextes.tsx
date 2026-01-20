import { mockTextes } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

export default function DashboardTextes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Textes Officiels</h1>
          <p className="text-muted-foreground">Gérer les textes officiels</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />Nouveau texte</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {mockTextes.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 rounded border">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm line-clamp-1">{t.titre}</p>
                    <p className="text-xs text-muted-foreground">{t.type} • {t.numero}</p>
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
