import Environment from "../components/templates/Environment";

type AppShellComponent = React.FC;

const AppShell: AppShellComponent = () => {
  return (
    <main className="container mx-auto min-h-screen flex flex-row align-center justify-between">
      <div className="flex flex-col justify-center items-center">
        <Environment />
      </div>
    </main>
  );
};

export default AppShell;
