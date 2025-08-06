import Project from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Storion",
    description: "Bias-aware news aggregation system that informs users about ideological manipulation using custom NLP models and advanced data processing pipelines.",
    technologies: ["Python", "NLP", "Apache Kafka", "Prefect", "Faiss", "HuggingFace", "NER"],
    // image: "projects/storion.png",
    pageUrl: "/projects/storion",
    githubUrl: "https://github.com/AVDiv/storion"
  },
  {
    id: 2,
    title: "Vacant Lot Detection",
    description: "Trained deep learning based computer vision models for detecting vacant lots in urban areas using satellite imagery.",
    technologies: ["Computer Vision", "Deep Learning", "DeepLabsV3", "YOLO", "PyTorch"],
    image: "/thumbnails/vacant_lot.webp",
    // pageUrl: "#",
    githubUrl: "https://github.com/Zaara-Labs/Vacant-Lot-Segmentation-Competition-Solafune"
  },
  {
    id: 3,
    title: "Gait-based Authentication",
    description: "Machine learning model for user authentication based on acceleration data using advanced feature extraction and genetic algorithms.",
    technologies: ["MATLAB", "SVM", "Genetic Algorithms", "Feature Engineering", "Biometric Security"],
    image: "/thumbnails/gaitbased.webp",
    // pageUrl: "#",
    githubUrl: "https://github.com/scssandanayake/AI-ML-Coursework/"
  },
  {
    id: 4,
    title: "Pneumetra",
    description: "Real-time air quality monitoring and 7-day forecasting dashboard for Sri Lanka's 25 districts using machine learning and cloud infrastructure.",
    technologies: ["Python", "Snowflake", "GCP", "Streamlit", "LSTM", "Random Forest", "XGBoost", "SARIMA"],
    image: "/thumbnails/aqi.webp",
    // pageUrl: "#",
    githubUrl: "https://github.com/Zaara-Labs/Pneumetra"
  },
  {
    id: 5,
    title: "Process Mining Analysis",
    description: "University student enrollment optimization using process mining techniques to identify bottlenecks and workflow inefficiencies.",
    technologies: ["R", "bupaR", "edeaR", "processmapR", "Alpha Miner", "Heuristic Miner"],
    image: "/thumbnails/process.webp",
    // pageUrl: "#",
    githubUrl: "https://github.com/scssandanayake/R-Coursework-V2.0-Process-Mining"
  },
  {
    id: 6,
    title: "Tourbro AI Tour Guide",
    description: "RAG-powered tour recommendation system using LLM integration to provide personalized travel suggestions based on user preferences.",
    technologies: ["Langchain", "Gemini", "NextJS", "NestJS", "RAG", "Vector Databases"],
    // pageUrl: "#",
    githubUrl: "https://github.com/AVDiv/TourBro-WebApp"
  },
  {
    id: 7,
    title: "ForecastIQ",
    description: "Weather prediction utilizing time series analysis with ARIMA, SARIMA, and Fourier models for accurate forecasting.",
    technologies: ["Python", "ARIMA", "SARIMA", "Fourier Analysis", "Time Series"],
    image: "/thumbnails/rainfall.webp",
    // pageUrl: "#",
    githubUrl: "https://github.com/scssandanayake/Weather-Analyzer-And-Predictor"
  },
  {
    id: 8,
    title: "Loan Repayment Analysis",
    description: "Predicting whether customers will repay their bank loans. Supporting for both banks and customers matches today's financial landscape.",
    technologies: ["Machine Learning", "Classification", "EDA", "Feature Engineering", "Python", "Streamlit"],
    image: "/thumbnails/loan.webp",
    // pageUrl: "#",
    githubUrl: "https://github.com/scssandanayake/Loan-Repayment-Prediction-Analyzer"
  },
];