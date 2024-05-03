import { adminRoutes } from "./routes/admin-routes";
import { userRoutes } from "./routes/user-routes";
import { RouteItem } from "./types";

export const protectedRoutes: RouteItem[] = [...adminRoutes, ...userRoutes];
