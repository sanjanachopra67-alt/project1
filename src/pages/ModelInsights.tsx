import { motion } from "framer-motion";
import { modelMetrics, featureImportance, sampleData } from "@/lib/predictor";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

const MetricCard = ({ label, value, unit }: { label: string; value: string | number; unit?: string }) => (
  <div className="bg-card border border-border rounded-xl p-5 shadow-card text-center">
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className="text-3xl font-display font-bold text-foreground">
      {value}<span className="text-lg text-muted-foreground">{unit}</span>
    </p>
  </div>
);

const ModelInsights = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">Model Insights</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Evaluation metrics, feature importance, and training data summary for our {modelMetrics.algorithm}.
        </p>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
        <MetricCard label="R² Score" value={modelMetrics.r2} />
        <MetricCard label="MAE" value={modelMetrics.mae} />
        <MetricCard label="RMSE" value={modelMetrics.rmse} />
        <MetricCard label="Accuracy" value={modelMetrics.accuracy} unit="%" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Feature importance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-6 shadow-card"
        >
          <h2 className="font-display font-semibold text-foreground mb-4">Feature Importance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis type="category" dataKey="feature" width={140} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Study hours vs Grade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-6 shadow-card"
        >
          <h2 className="font-display font-semibold text-foreground mb-4">Study Hours vs Grade</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData.sort((a, b) => a.studyHours - b.studyHours)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="studyHours" label={{ value: "Study Hours", position: "bottom", fontSize: 12 }} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis label={{ value: "Grade", angle: -90, position: "insideLeft", fontSize: 12 }} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="grade" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Sample dataset */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 max-w-5xl mx-auto"
      >
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <h2 className="font-display font-semibold text-foreground mb-4">Sample Dataset Preview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Student</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Study Hours</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Attendance %</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((s) => (
                  <tr key={s.name} className="border-b border-border last:border-0">
                    <td className="py-2 px-3 text-foreground">{s.name}</td>
                    <td className="py-2 px-3 text-foreground">{s.studyHours}</td>
                    <td className="py-2 px-3 text-foreground">{s.attendance}%</td>
                    <td className="py-2 px-3 text-foreground font-semibold">{s.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Training: {modelMetrics.trainingSize.toLocaleString()} samples | Test: {modelMetrics.testSize.toLocaleString()} samples | Features: {modelMetrics.features}
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default ModelInsights;
