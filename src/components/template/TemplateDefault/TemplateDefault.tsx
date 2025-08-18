import { Header } from "../Header/Header";

type Props = {
  children: React.ReactNode
};

function TemplateDefault({ children }: Props) {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
    </>
  );
}

export default TemplateDefault;
