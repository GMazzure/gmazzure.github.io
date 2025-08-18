import {
  FaAws,
  FaPhp, FaDocker, FaLaravel,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiApachekafka, SiNodered, SiGrafana, SiPostgresql, SiJavascript, SiMongodb } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
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
      position: "IT Lead",
      period: "2023 - Present",
      description:
        "Leading development teams and designing solutions for the Industry.",
      achievements: [
        "Designed and implemented systems from scratch, enabling seamless integration and live updates to and from IoT devices",
        "Enhanced developer productivity and collaboration by introducing detailed API documentation using Swagger;",
        "Reduced incident resolution time by at least 80% by implementing real-time notifications via Telegram integrated with centralized logging systems.",
        "Led teams up to 6 developers;",
        "Mentoring of junior developers;",
      ],
      technologies: [
        <SiJavascript size={24} title="Javascript" />,
        <FaPython size={24} title="Python" />,
        <FaPhp size={24} title="Php" />,

        <FaNodeJs size={24} title="NodeJS" />,
        <FaReact size={24} title="React" />,
        <FaLaravel size={24} title="Laravel" />,
        <SiNodered size={24} title="NodeRed" />,

        <SiApachekafka size={24} title="Apache Kafka" />,

        <FaAws size={24} title="Aws" />,

        <SiMongodb size={24} title="MongoDB" />,
        <DiMsqlServer size={24} title="SqlServer" />,
        <SiPostgresql size={24} title="PostgreSQL" />,

        <SiGrafana size={24} title="Grafana" />,
        <FaDocker size={24} title="Docker" />,
      ],
    },
    {
      company: "Puchta Engenharia",
      position: "Full Stack Developer",
      period: "2018 - 2023",
      description:
        "Software development in the Industry 4.0 area, bringing connectivity via IoT",
      achievements: [
        "Reduced deployment time by 90% by automating custom integration services using Docker containers and Git repositories;",
        "Built a custom API-based integration with ERP TOTVs, for bilateral exchange of data and updates;",
        "Created real-time monitoring dashboards with Grafana, improving decision-making for industrial operations;",
        "Streamlined Kafka-based event-driven microservices, processing over 100 thousand events daily;",
      ],
      technologies: [
        <SiJavascript size={24} title="Javascript" />,
        <FaPython size={24} title="Python" />,
        <FaPhp size={24} title="Php" />,

        <FaNodeJs size={24} title="NodeJS" />,
        <FaReact size={24} title="React" />,
        <FaLaravel size={24} title="Laravel" />,
        <SiNodered size={24} title="NodeRed" />,

        <SiMongodb size={24} title="MongoDB" />,
        <DiMsqlServer size={24} title="SqlServer" />,
        <SiPostgresql size={24} title="PostgreSQL" />,

        <SiGrafana size={24} title="Grafana" />,
        <FaDocker size={24} title="Docker" />,
      ],
    },
    {
      company: "IT Center (State University of Ponta Grossa)",
      position: "Trainee",
      period: "2017 - 2018",
      description:
        "Development and maintanance of software to support students and university staff",
      achievements: [
        "Created a solution that made the selection process for scholarship holders paper free and easier to apply, with full digitalization of the process;",
        "Answered at least 100 calls helping staff and students to use the university information systems."
      ],
      technologies: [
        <FaPhp size={24} title="Php" />,
        <SiJavascript size={24} title="Javascript" />,
        <FaLaravel size={24} title="Laravel" />,
        <DiMsqlServer size={24} title="SqlServer" />,
      ],
    },
  ];

  return (
    <section className="experience-section py-16 bg-gray-50" id="experience">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-8">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
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
                  <div key={i} className="text-neutral-600 hover:text-emerald-600 transition-colors duration-300 cursor-help">
                    {tech}
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