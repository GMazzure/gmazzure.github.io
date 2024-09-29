import TemplateDefault from "../../components/template/TemplateDefault/TemplateDefault";
import CardApresentacao from "../../components/sections/sectionApresentacao/CardApresentacao";

type Props = {};

const Home = (props: Props) => {
  return (
    <TemplateDefault>
      <CardApresentacao></CardApresentacao>     
    </TemplateDefault>
  );
}

export default Home;