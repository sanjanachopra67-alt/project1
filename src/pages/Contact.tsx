import { motion } from "framer-motion";
import { Github, Mail, FileText, User } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Contact & Project Info</h1>
        <p className="text-muted-foreground">
          Get in touch or explore the project resources.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {[
          { icon: User, title: "Developer", text: "Sanjana Chopra", sub: "ECE with AIML Student" },
          { icon: Github, title: "GitHub Repository", text: "github.com/sanjanachopra67-alt", link: "https://github.com/sanjanachopra67-alt" },
          { icon: Mail, title: "Email Contact", text: "sanjanachopra67@gmail.com", link: "mailto:sanjanachopra67@gmail.com" },
          { icon: FileText, title: "Documentation", text: "Full project report & methodology", link: "#" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-card"
          >
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mb-4">
              <item.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                {item.text}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">{item.text}</p>
            )}
            {item.sub && <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* Deployment info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 shadow-card"
      >
        <h2 className="font-display font-semibold text-foreground mb-4">Deployment Instructions</h2>
        <div className="bg-foreground rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-background font-mono">
{`# Clone the repository
git clone https://github.com/username/student-predictor.git
cd student-predictor

# Install Python dependencies
pip install -r requirements.txt

# Train the model (optional)
python train_model.py

# Run the Flask server
python app.py

# The API will be available at http://localhost:5000`}
          </pre>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {["Render", "Railway", "Heroku", "AWS", "PythonAnywhere"].map((p) => (
            <span key={p} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default Contact;
