import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const CommonPage = () => {
  const { name } = useParams();

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold mb-2 text-primary">{name} Access</h1>
        <p className="text-muted-foreground">
          You are viewing the placeholder page for:
        </p>
        <div className="mt-4 bg-muted px-6 py-3 rounded-lg shadow-md">
          <span className="font-mono text-sm text-accent-foreground">
            {name}
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommonPage;
