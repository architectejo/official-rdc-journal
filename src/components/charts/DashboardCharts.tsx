import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CHART_COLORS = [
  "hsl(215, 70%, 25%)",
  "hsl(215, 60%, 40%)",
  "hsl(215, 50%, 55%)",
  "hsl(215, 40%, 65%)",
  "hsl(145, 60%, 40%)",
  "hsl(40, 90%, 50%)",
];

interface PublicationsChartProps {
  data: { mois: string; publications: number }[];
}

/**
 * Graphique des publications par mois
 */
export function PublicationsChart({ data }: PublicationsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Publications par mois</CardTitle>
        <CardDescription>Nombre de textes publiés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 88%)" />
              <XAxis
                dataKey="mois"
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(215, 20%, 88%)" }}
              />
              <YAxis
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(215, 20%, 88%)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(215, 20%, 88%)",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="publications" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface RevenueChartProps {
  data: { mois: string; revenus: number }[];
}

/**
 * Graphique des revenus
 */
export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Revenus mensuels</CardTitle>
        <CardDescription>En Francs Congolais (CDF)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 88%)" />
              <XAxis
                dataKey="mois"
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(215, 20%, 88%)" }}
              />
              <YAxis
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(215, 20%, 88%)" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(215, 20%, 88%)",
                  borderRadius: "6px",
                }}
                formatter={(value: number) => [`${value.toLocaleString()} CDF`, "Revenus"]}
              />
              <Line
                type="monotone"
                dataKey="revenus"
                stroke={CHART_COLORS[4]}
                strokeWidth={2}
                dot={{ fill: CHART_COLORS[4], strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface TextesByTypeChartProps {
  data: { type: string; count: number }[];
}

/**
 * Graphique en camembert par type de texte
 */
export function TextesByTypeChart({ data }: TextesByTypeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Textes par type</CardTitle>
        <CardDescription>Répartition des publications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
                nameKey="type"
                label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(215, 20%, 88%)",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface DownloadsChartProps {
  data: { jour: string; telechargements: number }[];
}

/**
 * Graphique des téléchargements
 */
export function DownloadsChart({ data }: DownloadsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Téléchargements</CardTitle>
        <CardDescription>7 derniers jours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 88%)" />
              <XAxis
                dataKey="jour"
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 11 }}
                axisLine={{ stroke: "hsl(215, 20%, 88%)" }}
              />
              <YAxis
                tick={{ fill: "hsl(215, 15%, 45%)", fontSize: 11 }}
                axisLine={{ stroke: "hsl(215, 20%, 88%)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(215, 20%, 88%)",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="telechargements" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
