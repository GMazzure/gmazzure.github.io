import TemplateDefault from "../../components/template/TemplateDefault/TemplateDefault";
import CardApresentacao from "../../components/sections/sectionApresentacao/CardApresentacao";
import ProjectsSection from "../../components/sections/sectionProjects/ProjectsSection";
import SkillsSection from "../../components/sections/sectionSkills/SkillsSection";
import ExperienceSection from "../../components/sections/sectionExperience/ExperienceSection";
import ContactSection from "../../components/sections/sectionContact/ContactSection";

const Home = () => {
  return (
    <TemplateDefault>
      <CardApresentacao />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </TemplateDefault>
  );
}

export default Home;