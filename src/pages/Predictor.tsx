import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { predict, type StudentInput, type PredictionResult } from "@/lib/predictor";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, Award, CheckCircle, Loader2, TrendingUp } from "lucide-react";

const Predictor = () => {
  const [form, setForm] = useState<StudentInput>({
    studyHours: 20,
    attendance: 80,
    previousGrades: 75,
    extracurricular: 1,
    internetAccess: 1,
    parentalEducation: 2,
    assignmentCompletion: 80,
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 1200));
    const prediction = predict(form);
    setResult(prediction);
    setLoading(false);
  };

  const update = (key: keyof StudentInput, value: number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const levelIcon = result
    ? result.performanceLevel === "Excellent"
      ? Award
      : result.performanceLevel === "Good"
      ? TrendingUp
      : result.performanceLevel === "Average"
      ? CheckCircle
      : AlertTriangle
    : null;

  const levelColor = result
    ? result.performanceLevel === "Excellent"
      ? "text-secondary"
      : result.performanceLevel === "Good"
      ? "text-primary"
      : result.performanceLevel === "Average"
      ? "text-muted-foreground"
      : "text-destructive"
    : "";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-display font-bold text-foreground mb-3">
            Student Performance Predictor
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter student information below and our ML model will predict their academic performance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-xl p-6 shadow-card"
          >
            <h2 className="font-display font-semibold text-foreground text-lg mb-6">Student Information</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Study Hours per Week: <span className="text-primary font-bold">{form.studyHours}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={form.studyHours}
                  onChange={(e) => update("studyHours", +e.target.value)}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 hrs</span><span>40 hrs</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Attendance: <span className="text-primary font-bold">{form.attendance}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.attendance}
                  onChange={(e) => update("attendance", +e.target.value)}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span><span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Previous Grades: <span className="text-primary font-bold">{form.previousGrades}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.previousGrades}
                  onChange={(e) => update("previousGrades", +e.target.value)}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span><span>100</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Assignment Completion: <span className="text-primary font-bold">{form.assignmentCompletion}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.assignmentCompletion}
                  onChange={(e) => update("assignmentCompletion", +e.target.value)}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span><span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Parental Education Level
                </label>
                <select
                  value={form.parentalEducation}
                  onChange={(e) => update("parentalEducation", +e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value={0}>No Formal Education</option>
                  <option value={1}>High School</option>
                  <option value={2}>Bachelor's Degree</option>
                  <option value={3}>Master's Degree</option>
                  <option value={4}>Doctorate</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!form.extracurricular}
                    onChange={(e) => update("extracurricular", e.target.checked ? 1 : 0)}
                    className="accent-primary w-4 h-4"
                  />
                  Extracurricular Activities
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!form.internetAccess}
                    onChange={(e) => update("internetAccess", e.target.checked ? 1 : 0)}
                    className="accent-primary w-4 h-4"
                  />
                  Internet Access
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full gradient-hero text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                "Predict Performance"
              )}
            </button>
          </motion.form>

          {/* Results */}
          <div>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Score card */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-card text-center">
                    <p className="text-sm text-muted-foreground mb-2">Predicted Score</p>
                    <p className="text-6xl font-display font-bold text-foreground">{result.predictedScore}</p>
                    <div className={`flex items-center justify-center gap-2 mt-3 text-lg font-semibold ${levelColor}`}>
                      {result.performanceLevel === "Excellent" ? <Award className="h-5 w-5" /> : result.performanceLevel === "Good" ? <TrendingUp className="h-5 w-5" /> : result.performanceLevel === "Average" ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                      {result.performanceLevel}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Confidence: {result.confidence}%
                    </p>
                  </div>

                  {/* Chart */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                    <h3 className="font-display font-semibold text-foreground mb-4">Feature Contributions</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.featureContributions} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis
                            type="category"
                            dataKey="feature"
                            width={130}
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: 12,
                            }}
                          />
                          <Bar dataKey="contribution" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Risk alert */}
                  {result.predictedScore < 50 && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-destructive">Risk Alert</p>
                        <p className="text-sm text-muted-foreground">
                          This student is predicted to perform below average. Consider early intervention strategies.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card border border-border border-dashed rounded-xl p-12 text-center"
                >
                  <BarChart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fill out the form and click "Predict Performance" to see results here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
