import { format } from "date-fns";

export const formatDate = (date: Date | string) => {
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch {
    return "--";
  }
};
