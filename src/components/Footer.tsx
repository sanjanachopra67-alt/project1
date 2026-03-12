import { Brain, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-foreground mb-3">
            <Brain className="h-5 w-5 text-primary" />
            EduPredict<span className="text-primary">AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Predicting student academic performance using machine learning and historical data.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/predictor" className="hover:text-foreground transition-colors">Predictor</Link>
            <Link to="/insights" className="hover:text-foreground transition-colors">Model Insights</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Connect</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Github className="h-4 w-4" /> GitHub Repository
            </a>
            <a href="mailto:developer@example.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" /> developer@example.com
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EduPredictAI. Built with Python, Scikit-learn & React.
      </div>
    </div>
  </footer>
);

export default Footer;
