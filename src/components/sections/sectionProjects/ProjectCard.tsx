import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaAws, FaPhp } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiStripe } from "react-icons/si";

type Props = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  status?: string;
};

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveUrl,
}: Props) {
  return (
    <div className="project-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-neutral-800 mb-3">{title}</h3>
        <p className="text-neutral-600 mb-4 leading-relaxed flex-grow">{description}</p>
        
        <div className="mb-6">
          <p className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wide">Built with</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => {
              const getTechIcon = (techName: string) => {
                const icons: { [key: string]: JSX.Element } = {
                  'React': <FaReact className="text-blue-500" />,
                  'TypeScript': <SiTypescript className="text-blue-600" />,
                  'Tailwind': <SiTailwindcss className="text-cyan-500" />,
                  'Next.js': <SiNextdotjs className="text-black" />,
                  'MongoDB': <SiMongodb className="text-green-600" />,
                  'PostgreSQL': <SiPostgresql className="text-blue-700" />,
                  'AWS Lambda': <FaAws className="text-orange-500" />,
                  'Node.js': <FaNodeJs className="text-green-600" />,
                  'Stripe': <SiStripe className="text-purple-600" />,
                  'OAuth': <span className="text-gray-600">🔐</span>,
                  'PHP': <FaPhp className="text-indigo-600" />
                };
                return icons[techName] || <span className="text-gray-500">⚡</span>;
              };
              
              return (
                <div
                  key={tech}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {getTechIcon(tech)}
                  <span>{tech}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex gap-3 mt-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <FaGithub size={16} />
              Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              <FaExternalLinkAlt size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}