export default function SkillsSection() {
  const skills = {
    "Frontend Development": [
      "React",
      "Vue",
      "Angular",
      "Blade",
      "TypeScript",
      "Tailwind CSS",
    ],
    "Backend Development": ["Node.js", "Laravel", "Flask", "Django", "Node-Red", ".Net"],
    "Persistancy": ["MySQL", "PostgreSQL", "MsSQL", "SQLite", "MongoDB", "influxDB","Redis", "ELK stack"],
    "Tools & Others": ["Docker","Kafka", "AWS", "Grafana", "Portainer", "ProxMox", "Swagger", "Git"],
  };

  return (
    <section className="skills-section py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="skill-category">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white rounded-full shadow-sm text-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}