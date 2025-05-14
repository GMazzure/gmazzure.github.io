import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Portfolio",
      description: "This is my porfolio, created to show my skills, assets and present myself",
      technologies: ["React", "TypeScript", "Tailwind"],
      imageUrl: "/portfolio.png",
      githubUrl: "https://github.com/GMazzure/gmazzure.github.io",
      liveUrl: "https://gmazzure.github.io/",
    },
    {
      title: "Promptopia",
      description: "Open-source for you to discover, create, and share creative AI prompts",
      technologies: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Google OAuth"],
      imageUrl: "/promptopia.png",
      githubUrl: "https://github.com/GMazzure/promptopia",
      // liveUrl: "https://project1.com",
    },
    
    // Add more projects here
  ];

  return (
    <section className="py-16 bg-gray-50" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}