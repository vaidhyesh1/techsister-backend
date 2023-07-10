import { ClassValue, clsx } from "clsx";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function addUser(data: any) {
  console.log("data on util", data);
  try {
    const response = await axios.post("/api/user", data);
    if (response.status === 200) {
      toast.success("Sign up successful");
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function updateUser(data: any) {
  console.log("data on util", data);
  try {
    const response = await axios.post("/api/update", data);
    if (response.status === 200) {
      toast.success("Update successful");
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
