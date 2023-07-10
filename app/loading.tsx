import { Loader2 } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin" size={24} />
    </div>
  );
}

export default loading;
