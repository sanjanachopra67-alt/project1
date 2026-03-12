import { useState } from "react";
import { motion } from "framer-motion";
import { sampleData } from "@/lib/predictor";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, LineChart, Line,
} from "recharts";

const Dashboard = () => {
  const [filter, setFilter] = useState<"all" | "high" | "mid" | "low">("all");

  const filtered = sampleData.filter((s) => {
    if (filter === "high") return s.grade >= 80;
    if (filter === "mid") return s.grade >= 50 && s.grade < 80;
    if (filter === "low") return s.grade < 50;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-display font-bold text-foreground mb-3">Dashboard</h1>
          <p className="text-muted-foreground">Interactive visualizations of student performance data.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {(["all", "high", "mid", "low"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "gradient-hero text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Students" : f === "high" ? "High (80+)" : f === "mid" ? "Average (50-79)" : "Low (<50)"}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Attendance vs Grades scatter */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Attendance vs Grades</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="attendance" name="Attendance" unit="%" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="grade" name="Grade" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Scatter data={filtered} fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Study hours bar */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Study Hours Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filtered}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="studyHours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Study Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grade trend */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card lg:col-span-2">
            <h3 className="font-display font-semibold text-foreground mb-4">Grade Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filtered}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="grade" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                  <Line type="monotone" dataKey="attendance" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ fill: "hsl(var(--secondary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
