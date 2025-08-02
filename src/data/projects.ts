import Project from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Storion",
    description: "Bias-aware news aggregation system that informs users about ideological manipulation using custom NLP models and advanced data processing pipelines.",
    technologies: ["Python", "NLP", "Apache Kafka", "Prefect", "Faiss", "HuggingFace", "NER"],
    pageUrl: "/projects/storion",
    githubUrl: "https://github.com/AVDiv/storion"
  },
  {
    id: 2,
    title: "Pneumetra",
    description: "Real-time air quality monitoring and 7-day forecasting dashboard for Sri Lanka's 25 districts using machine learning and cloud infrastructure.",
    technologies: ["Python", "Snowflake", "GCP", "Streamlit", "LSTM", "Random Forest", "XGBoost", "SARIMA"],
    // pageUrl: "#",
    githubUrl: "https://github.com/Zaara-Labs/Pneumetra"
  },
  {
    id: 3,
    title: "Gait-based Authentication",
    description: "Machine learning model for user authentication based on acceleration data using advanced feature extraction and genetic algorithms.",
    technologies: ["MATLAB", "SVM", "Genetic Algorithms", "Feature Engineering", "Biometric Security"],
    // pageUrl: "#",
    githubUrl: "https://github.com/scssandanayake/AI-ML-Coursework/"
  },
  {
    id: 4,
    title: "Process Mining Analysis",
    description: "University student enrollment optimization using process mining techniques to identify bottlenecks and workflow inefficiencies.",
    technologies: ["R", "bupaR", "edeaR", "processmapR", "Alpha Miner", "Heuristic Miner"],
    // pageUrl: "#",
    githubUrl: "https://github.com/scssandanayake/R-Coursework-V2.0-Process-Mining"
  },
  {
    id: 5,
    title: "Tourbro AI Tour Guide",
    description: "RAG-powered tour recommendation system using LLM integration to provide personalized travel suggestions based on user preferences.",
    technologies: ["Langchain", "Gemini", "NextJS", "NestJS", "RAG", "Vector Databases"],
    // pageUrl: "#",
    githubUrl: "https://github.com/AVDiv/TourBro-WebApp"
  },
  {
    id: 6,
    title: "ForecastIQ",
    description: "Weather prediction utilizing time series analysis with ARIMA, SARIMA, and Fourier models for accurate forecasting.",
    technologies: ["Python", "ARIMA", "SARIMA", "Fourier Analysis", "Time Series"],
    // pageUrl: "#",
    githubUrl: "https://github.com/scssandanayake/Weather-Analyzer-And-Predictor"
  }
];