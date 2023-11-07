import DashboardContent from "../components/DashboardContent";

const Dashboard = () => {
  return (
    <div className="h-screen pt-20 pb-10 px-16">
      <header className="text-rnBack text-5xl h-[10%] pl-[3.5%] flex items-center  font-bold">
        Dashboard
      </header>
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
