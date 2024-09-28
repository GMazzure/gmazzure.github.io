import { Header } from "../Header/Header";

type Props = {
  children: React.ReactNode
};

function TemplateDefault({ children }: Props) {
  return (
    <>
      <Header></Header>
      <div style={{padding: "0 2em"}}>{children}</div>
    </>
  );
}

export default TemplateDefault;
