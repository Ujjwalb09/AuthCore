import DashboardLayout from "@/components/DashboardLayout";

import { ShieldCheck, Users, Settings, Lock } from "lucide-react";

import DashboardCard from "@/components/DashboardCard";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="flex items-center text-2xl">
          <h1 className="font-bold">Welcome to&nbsp;</h1>
          <h1 className="font-bold text-blue-500">auth</h1>
          <h1 className="font-bold">Core.</h1>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          Your complete access management solution
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <DashboardCard
          icon={<ShieldCheck className="h-4 w-4 text-primary" />}
          heading="Access Management"
          description="Custom permissions for your organization with fine-grained access control."
          buttonText="Learn more"
        />

        <DashboardCard
          icon={<Users className="h-4 w-4 text-blue-500" />}
          heading="Role-Based Control"
          description="Define roles with specific permissions and assign them to users."
          buttonText="Learn more"
        />

        <DashboardCard
          icon={<Settings className="h-4 w-4 text-green-500" />}
          heading="Admin Dashboard"
          description="Manage your organization from a centralized admin panel."
          buttonText="Learn more"
        />

        <DashboardCard
          icon={<Lock className="h-4 w-4 text-purple-500" />}
          heading="User Portal"
          description="Clean interface for users to access their authorized resources."
          buttonText="Learn more"
        />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
