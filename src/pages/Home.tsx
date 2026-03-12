import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Brain, GraduationCap, TrendingUp } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const features = [
  {
    icon: Brain,
    title: "ML-Powered Predictions",
    description: "Random Forest algorithm trained on 10,000+ student records for high-accuracy predictions.",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    description: "Understand which factors most impact performance with feature importance analysis.",
  },
  {
    icon: GraduationCap,
    title: "Early Intervention",
    description: "Identify at-risk students early and take proactive steps to improve outcomes.",
  },
  {
    icon: TrendingUp,
    title: "89.4% Accuracy",
    description: "Our model achieves industry-leading accuracy with continuous improvement cycles.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-4">
                AI-Based Student Performance Predictor
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                Predict Student Performance with{" "}
                <span className="text-gradient">Machine Learning</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Leverage historical academic data and advanced ML algorithms to forecast student outcomes — enabling early interventions and better educational strategies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/predictor"
                  className="inline-flex items-center gap-2 gradient-hero text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity animate-pulse-glow"
                >
                  Try the Predictor <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src={heroIllustration}
                alt="AI and Education illustration showing neural network connected to graduation cap"
                className="w-full max-w-md animate-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
              Why Use EduPredictAI?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge machine learning with educational data analytics.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-background border border-border shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
              Ready to Predict Performance?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Enter student data and get instant predictions powered by our trained Random Forest model.
            </p>
            <Link
              to="/predictor"
              className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Start Predicting <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
