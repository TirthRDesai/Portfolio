
import React from "react";
import { FaBootstrap, FaDocker, FaNodeJs, FaPython, FaReact, FaRegUserCircle } from "react-icons/fa";
import { FaC, FaJava } from "react-icons/fa6";
import { RiNextjsLine, RiSupabaseFill, RiTailwindCssFill } from "react-icons/ri";
import { TbBrandCpp, TbBrandDjango, TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import { SiAndroidstudio, SiFlask, SiSelenium, SiTensorflow } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGitAlt } from "react-icons/fa6";

export type Skill = {
	name: string;
	category: "technical" | "soft";
	confidence: number;
	icon: React.ReactNode;
	color?: string;
	keywords?: string[];
	bulletPoints?: string[];
};

export const TECHNOLOGIES: Skill[] = [
	{ 
        name: "Node.js", 
        category: "technical", 
        confidence: 0.8, 
        icon: <FaNodeJs />, 
        keywords: ["Backend", "API", "Server", "WebDev"],
        bulletPoints: [
            "Developed and maintained scalable backend services using Node.js and Express.js",
            "Built RESTful APIs for various applications",
            "Implemented authentication and authorization systems",
            "Integrated with third-party services and APIs",
        ],
    },
	{ 
        name: "React", 
        category: "technical", 
        confidence: 1, 
        icon: <FaReact />,
        bulletPoints: [
            "Developed and maintained scalable frontend services using React.js",
            "Built responsive and user-friendly interfaces",
            "Implemented state management and component architecture",
            "Integrated with backend services and APIs"
        ],
    },
	{ 
        name: "Next.js", 
        category: "technical", 
        confidence: 1, 
        icon: <RiNextjsLine />,
        bulletPoints: [
            "Developed and maintained scalable full-stack services using Next.js",
            "Built responsive and user-friendly interfaces",
            "Implemented state management and component architecture",
            "Integrated with backend services and APIs"
        ],
    },
	{ 
        name: "TypeScript", 
        category: "technical", 
        confidence: 1, 
        icon: <TbBrandTypescript />,
        keywords: ["Type Safety", "Superset", "Frontend", "Backend"],
        bulletPoints: [
            "Experience writing type-safe code to reduce runtime errors",
            "Leveraging interfaces and generics for reusable components",
            "Migrating legacy JavaScript codebases to TypeScript",
        ],
    },
	{   
        name: "Python", 
        category: "technical", 
        confidence: 1, 
        icon: <FaPython />,
        keywords: ["Scripting", "Data Science", "Backend", "Automation"],
        bulletPoints: [
            "Writing clean, pythonic code for various data processing tasks",
            "Automating repetitive workflows with custom scripts",
            "Experience with libraries like Pandas, NumPy, and Requests",
        ],
    },
	{ 
        name: "Django", 
        category: "technical", 
        confidence: 0.6, 
        icon: <TbBrandDjango />,
        keywords: ["Backend", "Python", "MVC", "ORM"],
        bulletPoints: [
            "Familiar with Django's MVT architecture and ORM",
            "Building basic CRUD applications and administration interfaces",
        ],
    },
	{ 
        name: "Flask", 
        category: "technical", 
        confidence: 1, 
        icon: <SiFlask />,
        keywords: ["Backend", "Microservices", "Python", "Lightweight"],
        bulletPoints: [
            "Developing lightweight and fast microservices",
            "Integrating Flask with SQLAlchemy for database management",
            "Building RESTful endpoints for frontend consumption",
        ],
    },
	{ 
        name: "Supabase", 
        category: "technical", 
        confidence: 0.8, 
        icon: <RiSupabaseFill  />,
        keywords: ["BaaS", "PostgreSQL", "Auth", "Realtime"],
        bulletPoints: [
            "Utilizing Supabase for rapid backend development",
            "Implementing row-level security and authentication policies",
            "Leveraging realtime subscriptions for live data updates",
        ],
    },
	{ 
        name: "PostgreSQL", 
        category: "technical", 
        confidence: 0.75, 
        icon: <BiLogoPostgresql />,
        keywords: ["Database", "SQL", "Relational", "Data Modeling"],
        bulletPoints: [
            "Designing normalized database schemas for application data",
            "Writing complex SQL queries for data retrieval and analysis",
            "Optimizing database performance with indexing",
        ],
    },
	{ 
        name: "Docker", 
        category: "technical", 
        confidence: 0.4, 
        icon: <FaDocker />,
        keywords: ["Containerization", "DevOps", "Deployment", "CI/CD"],
        bulletPoints: [
            "Basic experience containerizing applications for consistency",
            "Learning to compose multi-container environments with Docker Compose",
        ],
    },
	{ 
        name: "Java", 
        category: "technical", 
        confidence: 0.8, 
        icon: <FaJava />,
        keywords: ["OOP", "Backend", "Enterprise", "Android"],
        bulletPoints: [
            "Strong understanding of Object-Oriented Programming principles",
            "Experience structuring robust and maintainable Java applications",
            "Familiarity with Java's standard libraries and ecosystem",
        ],
    },
	{ 
        name: "Javascript", 
        category: "technical", 
        confidence: 1, 
        icon: <TbBrandJavascript />,
        keywords: ["Web", "Frontend", "Scripting", "ES6+"],
        bulletPoints: [
            "Deep understanding of ES6+ features and the DOM",
            "Writing clean, asynchronous code using Promises and async/await",
            "Building interactive web experiences without frameworks",
        ],
    },
	{ 
        name: "C++", 
        category: "technical", 
        confidence: 0.7, 
        icon: <TbBrandCpp />,
        keywords: ["Systems", "Performance", "OOP", "Low-level"],
        bulletPoints: [
            "Understanding of memory management and pointers",
            "Implementing efficient algorithms and data structures",
            "Solving competitive programming problems",
        ],
    },
	{ 
        name: "C", 
        category: "technical", 
        confidence: 0.7, 
        icon: <FaC />,
        keywords: ["Systems", "Embedded", "Low-level", "Performance"],
        bulletPoints: [
            "Gaining fundamental knowledge of computer architecture",
            "Writing low-level code for system interaction",
        ],
    },
	{ 
        name: "Android Studio", 
        category: "technical", 
        confidence: 0.7, 
        icon: <SiAndroidstudio />,
        keywords: ["Mobile", "Java/Kotlin", "App Dev", "UI"],
        bulletPoints: [
            "Developed functional Android applications",
            "Experience with Activities, Fragments, and Layouts",
            "Learning modern Android development practices",
        ],
    },
	{ 
        name: "Git", 
        category: "technical", 
        confidence: 0.6, 
        icon: <FaGitAlt />,
        keywords: ["Version Control", "Collaboration", "GitHub", "DevOps"],
        bulletPoints: [
            "Using Git for source code management and version history",
            "Collaborating on projects via GitHub (Pull Requests, Issues)",
        ],
    },
	{ 
        name: "Bootstrap", 
        category: "technical", 
        confidence: 0.6, 
        icon: <FaBootstrap />,
        keywords: ["CSS Framework", "Responsive", "UI", "Grid"],
        bulletPoints: [
            "Rapidly prototyping responsive layouts",
            "Customizing Bootstrap themes for consistent branding",
        ],
    },
	{ 
        name: "Tailwind", 
        category: "technical", 
        confidence: 1, 
        icon: <RiTailwindCssFill />,
        keywords: ["CSS Framework", "Utility-first", "Styling", "Responsive"],
        bulletPoints: [
            "Building custom designs rapidly with utility classes",
            "Creating responsive and dark-mode compatible interfaces",
            "Preferring Tailwind for its flexibility and performance",
        ],
    },
	{ 
        name: "Webscraping", 
        category: "technical", 
        confidence: 0.9, 
        icon: <SiSelenium />,
        keywords: ["Automation", "Data Extraction", "Testing", "Python"],
        bulletPoints: [
            "Building automated scrapers to extract data from websites",
            "Handling dynamic content and navigation flows",
            "Automating form submissions and browser interactions",
        ],
    },
	{ 
        name: "AI/ML", 
        category: "technical", 
        confidence: 0.6, 
        icon: <SiTensorflow />,
        keywords: ["Machine Learning", "Neural Networks", "Data", "AI"],
        bulletPoints: [
            "Experimenting with basic neural network models",
            "Learning the fundamentals of model training and evaluation",
        ],
    },
];

export const SOFT_SKILLS: Skill[] = [
	{ 
        name: "Communication", 
        category: "soft", 
        confidence: 0.8,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Effective at conveying complex technical ideas to non-technical stakeholders",
            "Strong written communication skills for documentation and reports",
            "Active listener who values feedback and clear understanding",
        ],
    },
	{ 
        name: "Problem Solving", 
        category: "soft", 
        confidence: 1,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Analytical approach to breaking down complex issues into manageable parts",
            "Proven ability to debug and troubleshoot high-pressure production issues",
            "Creative thinker who enjoys finding efficient solutions to novel problems",
        ],
    },
	{ 
        name: "Teamwork", 
        category: "soft", 
        confidence: 0.9,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Thrives in collaborative environments and agile workflows",
            "Supportive team player who mentors juniors and shares knowledge",
            "Reliable contributor who prioritizes team goals over individual acclaim",
        ],
    },
	{ 
        name: "Adaptability", 
        category: "soft", 
        confidence: 0.9,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Quick learner who easily adjusts to new technologies and frameworks",
            "Flexible strategies for handling changing project requirements",
            "Resilient in the face of setbacks and shifting priorities",
        ],
    },
	{ 
        name: "Time Management", 
        category: "soft", 
        confidence: 0.75,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Organized approach to task prioritization and deadline management",
            "Efficient at balancing multiple projects simultaneously",
            "Constantly refining workflows to maximize productivity",
        ],
    },
	{ 
        name: "Leadership", 
        category: "soft", 
        confidence: 0.6,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Developing skills in guiding small teams and project initiatives",
            "Learning to delegate tasks effectively while maintaining quality",
        ],
    },
	{ 
        name: "Creativity",  
        category: "soft", 
        confidence: 0.75,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Brings a fresh perspective to UI/UX design challenges",
            "Enjoys experimenting with new tools and visual styles",
            "Finds innovative workarounds for technical limitations",
        ],
    },
	{ 
        name: "Critical Thinking",  
        category: "soft", 
        confidence: 1,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Rigorous evaluation of system architecture and design decisions",
            "Objective analysis of trade-offs in tool selection",
            "Logical approach to validating assumptions and data",
        ],
    },
	{ 
        name: "Emotional Intelligence",  
        category: "soft", 
        confidence: 0.75,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Empathetic to user frustrations and needs",
            "Aware of team dynamics and strives to maintain a positive atmosphere",
            "Reflective on personal interactions and open to interpersonal growth",
        ],
    },
	{ 
        name: "Conflict Resolution",  
        category: "soft", 
        confidence: 0.75,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Constructive approach to resolving code review disagreements",
            "Focuses on shared goals rather than personal differences",
            "Capable of facilitating compromises in technical discussions",
        ],
    },
	{ 
        name: "Work Ethic",  
        category: "soft", 
        confidence: 0.9,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Dedicated to delivering high-quality, bug-free code",
            "Willing to put in extra effort to meet critical milestones",
            "Takes ownership of tasks from conception to deployment",
        ],
    },
	{ 
        name: "Interpersonal Skills",  
        category: "soft", 
        confidence: 0.7,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Friendly and approachable demeanor with colleagues",
            "Building professional relationships through open communication",
            "Working on networking and public speaking",
        ],
    },
	{ 
        name: "Decision Making",  
        category: "soft", 
        confidence: 0.7,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Comfortable making autonomous decisions on smaller modules",
            "Seeks data and consultation for larger architectural choices",
            "Learning to balance speed and perfection in decision loops",
        ],
    },
	{ 
        name: "Stress Management",  
        category: "soft", 
        confidence: 0.65,
        icon: <FaRegUserCircle />,
        bulletPoints: [
            "Practicing techniques to maintain focus under pressure",
            "Learning to better estimate workloads to avoid burnout",
        ],
    },
];
