import React from "react";
import { Button } from "@/components/ui/button";
const DashboardCard = ({
  icon,
  heading,
  description,
  buttonText,
}: {
  icon: React.ReactNode;
  heading: string;
  description: string;
  buttonText: string;
}) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-2">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
          <h2 className="text-lg font-semibold">{heading}</h2>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-2">{description}</p>
      <div className="w-full flex items-center justify-center">
        <Button variant="outline" size="sm" className="w-1/2 text-xs">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default DashboardCard;
