import {
  FaAws,
  FaPhp, FaDocker, FaLaravel,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiApachekafka, SiTypescript, SiJavascript, SiSwagger } from "react-icons/si";
type Experience = {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: JSX.Element[];
};

export default function ExperienceSection() {
  const experiences: Experience[] = [
    {
      company: "Puchta Engenharia",
      position: "Lead Software Engineer",
      period: "Jan 2023 - Present",
      description:
        "I've led technical teams, developed industrial IoT systems, integrated ERP and shop-floor processes following ISA-95 standards, and delivered solutions that improved efficiency and real-time decision-making for manufacturing operations. Whether working on microservices with Kafka, designing APIs with Swagger, or modeling distributed databases, I've always focused on clean code, performance, and maintainability.",
      achievements: [
        "Leading the implementation of RESTful APIs following Clean Architecture concepts, achieving maintainable code that lasts",
        "Architecting IoT data collection platforms that process millions of events daily",
        "Leading development of real-time manufacturing traceability systems for the dairy industry",
        "Designing scalable microservice architectures with event-driven patterns",
      ],
      technologies: [
        <FaNodeJs size={24} title="Node.js" />,
        <FaReact size={24} title="React" />,
        <SiTypescript size={24} title="TypeScript" />,
        <FaAws size={24} title="AWS" />,
        <SiApachekafka size={24} title="Apache Kafka" />,
        <FaPython size={24} title="Python" />,
        <FaPhp size={24} title="PHP" />,
        <FaLaravel size={24} title="Laravel" />,
        <SiSwagger size={24} title="Swagger" />,
      ],
    },
    {
      company: "Puchta Engenharia",
      position: "Software Engineer",
      period: "Jan 2018 - Jan 2023",
      description:
        "I contributed to the design, development, and delivery of custom industrial and enterprise solutions for clients in the food industry, metallurgy, and energy sector. I began working with PHP (Laravel) for backend development during my first two years. As the company embraced new technologies, I transitioned to Node.js and React, taking on full-stack responsibilities and delivering scalable, high-performance web applications.",
      achievements: [
        "Built real-time production monitoring tools, integrating data from industrial equipment into intuitive dashboards",
        "Delivered automation and management solutions that improved operational efficiency in manufacturing and energy operations",
        "Participated in the adoption of modern JavaScript frameworks, helping establish React and Node.js as core technologies",
        "Designed and implemented RESTful APIs and optimized database schemas for SQL and NoSQL",
      ],
      technologies: [
        <FaNodeJs size={24} title="Node.js" />,
        <FaReact size={24} title="React" />,
        <FaLaravel size={24} title="Laravel" />,
        <FaAws size={24} title="AWS" />,
        <FaPython size={24} title="Python" />,
        <FaDocker size={24} title="Docker" />,
      ],
    },
    {
      company: "Universidade Estadual de Ponta Grossa",
      position: "Trainee",
      period: "Feb 2017 - Jan 2018",
      description:
        "Built and maintained Web-based IT systems to digitize and streamline the university processes, reducing the use of paper inside the university, and making the data more transparent and easier to access.",
      achievements: [
        "Created from scratch with Laravel an academic research scholarship selective process for scientific research students",
        "Streamlined all procedures regarding document attachment, analysis, approval, score system and approval notices",
        "Provided technical support to students and university staff regarding the use of IT platforms",
      ],
      technologies: [
        <FaLaravel size={24} title="Laravel" />,
        <FaPhp size={24} title="PHP" />,
        <SiJavascript size={24} title="JavaScript" />,
        <FaPython size={24} title="Python" />,
      ],
    },
  ];

  return (
    <section className="experience-section py-16 bg-white" id="experience">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Experience</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            My professional journey and key achievements
          </p>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800">
                    {exp.position}
                  </h3>
                  <p className="text-emerald-700">{exp.company}</p>
                </div>
                <span className="text-neutral-500">{exp.period}</span>
              </div>
              <p className="text-neutral-600 mb-4">{exp.description}</p>
              <ul className="list-disc list-inside text-neutral-600 mb-4">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <div className="flex gap-4 flex-wrap">
                {exp.technologies.map((tech, i) => (
                  <div key={i} className="group overflow-hidden text-neutral-400 hover:text-emerald-600 transition-all duration-300 cursor-pointer hover:scale-110 w-6 hover:w-auto">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="flex-shrink-0">{tech}</span>
                      <span className="text-sm font-medium">
                        {tech.props.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}