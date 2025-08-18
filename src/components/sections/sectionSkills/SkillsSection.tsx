import { FaReact, FaNodeJs, FaPhp, FaPython, FaDocker, FaAws, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiRedux, SiNextdotjs, SiExpress, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiInfluxdb, SiApachekafka, SiGrafana, SiSwagger, SiTerraform, SiJest } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { useState } from "react";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillCategories = [
    { id: "all", label: "Main Stack", icon: "⚡" },
    { id: "frontend", label: "Frontend", icon: "🎨" },
    { id: "backend", label: "Backend", icon: "⚙️" },
    { id: "database", label: "Database", icon: "🗄️" },
    { id: "tools", label: "Tools & DevOps", icon: "🛠️" }
  ];

  const mainSkills = [
    { name: "Next.js", category: "frontend", icon: <SiNextdotjs className="text-black" /> },
    { name: "React", category: "frontend", icon: <FaReact className="text-blue-500" /> },
    { name: "Node.js", category: "backend", icon: <FaNodeJs className="text-green-600" /> },
    { name: "TypeScript", category: "frontend", icon: <SiTypescript className="text-blue-600" /> },
    { name: "Docker", category: "tools", icon: <FaDocker className="text-blue-500" /> },
    { name: "Tailwind CSS", category: "frontend", icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: "SQL Databases", category: "database", icon: <SiPostgresql className="text-blue-700" /> },
    { name: "NoSQL Databases", category: "database", icon: <SiMongodb className="text-green-600" /> },
    { name: "AWS", category: "tools", icon: <FaAws className="text-orange-500" /> },
  ];

  const allSkills = [
    // Frontend
    { name: "Next.js", category: "frontend", icon: <SiNextdotjs className="text-black" /> },
    { name: "React", category: "frontend", icon: <FaReact className="text-blue-500" /> },
    { name: "TypeScript", category: "frontend", icon: <SiTypescript className="text-blue-600" /> },
    { name: "Tailwind CSS", category: "frontend", icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: "Redux", category: "frontend", icon: <SiRedux className="text-purple-600" /> },
    
    // Backend
    { name: "Next.js", category: "backend", icon: <SiNextdotjs className="text-black" /> },
    { name: "Node.js", category: "backend", icon: <FaNodeJs className="text-green-600" /> },
    { name: "Express", category: "backend", icon: <SiExpress className="text-gray-700" /> },
    { name: "PHP", category: "backend", icon: <FaPhp className="text-indigo-600" /> },
    { name: "Python", category: "backend", icon: <FaPython className="text-yellow-500" /> },
    
    // Database
    { name: "PostgreSQL", category: "database", icon: <SiPostgresql className="text-blue-700" /> },
    { name: "MySQL", category: "database", icon: <SiMysql className="text-blue-600" /> },
    { name: "SQL Server", category: "database", icon: <DiMsqlServer className="text-red-600" /> },
    { name: "MongoDB", category: "database", icon: <SiMongodb className="text-green-600" /> },
    { name: "Redis", category: "database", icon: <SiRedis className="text-red-500" /> },
    { name: "InfluxDB", category: "database", icon: <SiInfluxdb className="text-blue-500" /> },
    
    // Tools
    { name: "Docker", category: "tools", icon: <FaDocker className="text-blue-500" /> },
    { name: "AWS", category: "tools", icon: <FaAws className="text-orange-500" /> },
    { name: "Kafka", category: "tools", icon: <SiApachekafka className="text-black" /> },
    { name: "Grafana", category: "tools", icon: <SiGrafana className="text-orange-600" /> },
    { name: "Git", category: "tools", icon: <FaGitAlt className="text-orange-500" /> },
    { name: "Swagger", category: "tools", icon: <SiSwagger className="text-green-600" /> },
    { name: "Azure DevOps", category: "tools", icon: <span className="text-blue-600">☁️</span> },
    { name: "Kong API Gateway", category: "tools", icon: <span className="text-green-600">🦍</span> },
    { name: "Terraform", category: "tools", icon: <SiTerraform className="text-purple-600" /> },
    { name: "Jest", category: "tools", icon: <SiJest className="text-red-600" /> },
    { name: "Node-RED", category: "tools", icon: <span className="text-red-500">🔴</span> }
  ];

  const filteredSkills = activeCategory === "all" 
    ? mainSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  return (
    <section className="skills-section py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Skills & Technologies</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Technologies I work with across different domains
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-white rounded-lg shadow-sm">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-emerald-600 text-white"
                    : "text-neutral-600 hover:text-emerald-600"
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border text-center"
            >
              <div className="text-4xl mb-3 flex justify-center">{skill.icon}</div>
              <h3 className="font-semibold text-neutral-800 text-sm">{skill.name}</h3>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No skills found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}