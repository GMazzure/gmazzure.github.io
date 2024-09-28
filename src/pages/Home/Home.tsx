import TemplateDefault from "../../components/template/TemplateDefault/TemplateDefault";
import CardApresentacao from "../../components/template/CardApresentacao/CardApresentacao";

type Props = {};

const Home = (props: Props) => {
  return (
    <TemplateDefault>
      <div style={{marginTop: "2em"}}>
        <CardApresentacao></CardApresentacao>
      </div>
    </TemplateDefault>
  );
}

export default Home;