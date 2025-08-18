import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Personal Portfolio",
      description: "My personal showcase featuring a secure contact form with bot protection and modern design",
      technologies: ["React", "TypeScript", "Tailwind", "AWS Lambda"],
      imageUrl: "/portfolio.png",
      githubUrl: "https://github.com/GMazzure/gmazzure.github.io",
      liveUrl: "https://gmazzure.github.io/",
      category: "web",
      status: "live"
    },
    {
      title: "Promptopia",
      description: "AI prompt sharing platform where users can discover, create and share creative prompts",
      technologies: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "OAuth"],
      imageUrl: "/promptopia.png",
      githubUrl: "https://github.com/GMazzure/promptopia",
      category: "web",
      status: "completed"
    },
    {
      title: "Service Intermediation Platform",
      description: "Platform that offers disccount in selected service providers, featuring payments and management tools",
      technologies: ["Next.js", "TypeScript", "PostgreSQL"],
      imageUrl: "/docs/wip.png",
      category: "web",
      status: "wip"
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      live: { text: "Live", color: "bg-green-100 text-green-700" },
      completed: { text: "Completed", color: "bg-blue-100 text-blue-700" },
      wip: { text: "In Progress", color: "bg-yellow-100 text-yellow-700" }
    };
    return badges[status as keyof typeof badges] || badges.completed;
  };

  return (
    <section className="py-16 bg-gray-50" id="projects">
      <div className="container mx-auto px-4">
        <div className="text mb-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Projects</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Here are some projects I've built
          </p>
        </div>      

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="relative">
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getStatusBadge(project.status).color
                }`}>
                  {getStatusBadge(project.status).text}
                </span>
              </div>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}