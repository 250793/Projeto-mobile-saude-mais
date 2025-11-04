import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface NotificationFabProps {
  onClick: () => void;
  hasUnreadNotifications?: boolean;
}

export function NotificationFab({ onClick, hasUnreadNotifications = false }: NotificationFabProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={onClick}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <div className="relative">
          <Bell className="w-6 h-6" />
          {hasUnreadNotifications && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              !
            </Badge>
          )}
        </div>
      </Button>
    </div>
  );
}