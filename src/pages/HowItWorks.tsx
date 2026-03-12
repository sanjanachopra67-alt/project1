import { motion } from "framer-motion";
import { Database, Filter, Cpu, BarChart, CheckCircle } from "lucide-react";

const steps = [
  { icon: Database, title: "Data Collection", description: "Student academic records, attendance logs, extracurricular data, and demographic information are collected from institutional databases.", color: "gradient-hero" },
  { icon: Filter, title: "Data Preprocessing", description: "Raw data is cleaned, missing values handled, and categorical variables encoded using label/one-hot encoding.", color: "gradient-hero" },
  { icon: Cpu, title: "Feature Selection", description: "Statistical analysis identifies the most impactful features: study hours, attendance, previous grades, and assignment completion.", color: "gradient-hero" },
  { icon: BarChart, title: "Model Training", description: "Random Forest Regressor is trained on 85% of the data using cross-validation for hyperparameter tuning.", color: "gradient-hero" },
  { icon: CheckCircle, title: "Performance Prediction", description: "The trained model predicts academic scores and categorizes students into performance levels with confidence intervals.", color: "gradient-success" },
];

const HowItWorks = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">How It Works</h1>
        <p className="text-lg text-muted-foreground">
          Our ML pipeline follows a systematic approach from data collection to prediction delivery.
        </p>
      </motion.div>

      {/* Flow diagram */}
      <div className="max-w-2xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 mb-8 last:mb-0"
          >
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                <step.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-2 min-h-[2rem]" />
              )}
            </div>
            <div className="pb-8">
              <span className="text-xs font-semibold text-primary mb-1 block">Step {i + 1}</span>
              <h3 className="font-display font-semibold text-foreground text-lg mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Code snippet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">API Endpoint</h2>
        <div className="bg-foreground rounded-xl p-6 overflow-x-auto">
          <pre className="text-sm text-background font-mono">
{`POST /predict

# Request Body
{
  "study_hours": 25,
  "attendance": 85,
  "previous_grades": 78,
  "extracurricular": 1,
  "internet_access": 1,
  "parental_education": 3,
  "assignment_completion": 90
}

# Response
{
  "predicted_score": 82,
  "performance_level": "Excellent",
  "confidence": 91
}`}
          </pre>
        </div>
      </motion.div>
    </div>
  </div>
);

export default HowItWorks;
