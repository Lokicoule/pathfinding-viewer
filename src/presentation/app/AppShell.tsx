import Environment from "../components/templates/Environment";
import Layout from "../components/templates/Layout";

type AppShellComponent = React.FC;

const AppShell: AppShellComponent = () => {
  return (
    <Layout>
      <Environment />
    </Layout>
  );
};

export default AppShell;
