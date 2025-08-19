import { Header } from "../Header/Header";

type Props = {
  children: React.ReactNode
};

function TemplateDefault({ children }: Props) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}

export default TemplateDefault;
