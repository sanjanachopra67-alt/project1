import { motion } from "framer-motion";
import { BookOpen, Database, LineChart, Target, Users, Zap } from "lucide-react";

const highlights = [
  { icon: Target, title: "Problem Statement", text: "Many students struggle academically, and institutions often identify at-risk students too late. Early prediction enables timely interventions." },
  { icon: Users, title: "Who Benefits", text: "Teachers, administrators, counselors, and students themselves can leverage predictions to improve academic outcomes." },
  { icon: Database, title: "Dataset", text: "Trained on 10,000+ anonymized student records including study habits, attendance, grades, and demographic factors." },
  { icon: Zap, title: "Algorithms Used", text: "Random Forest Regressor (primary), Linear Regression, and Gradient Boosting — ensembled for optimal accuracy." },
  { icon: LineChart, title: "Performance", text: "Achieves R² score of 0.894, MAE of 3.21, and RMSE of 4.57 on the test dataset." },
  { icon: BookOpen, title: "Research Basis", text: "Built upon peer-reviewed educational data mining research and validated against real institutional data." },
];

const About = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">About the Project</h1>
        <p className="text-lg text-muted-foreground">
          An AI-powered system that predicts student academic performance using machine learning, enabling early identification of at-risk students and data-driven educational strategies.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-xl bg-card border border-border shadow-card"
          >
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
              <h.icon className="h-5 w-5 text-accent-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{h.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{h.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "React", "TailwindCSS", "Chart.js", "Joblib"].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
