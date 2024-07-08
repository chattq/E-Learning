import { adminRoutes } from "./routes/admin-routes";
import { courseRoutes } from "./routes/course-routes";
import { siderbarRouters } from "./routes/siderbar-routers";
import { userRoutes } from "./routes/user-routes";
import { RouteItem } from "./types";

export const protectedRoutes: RouteItem[] = [
  ...adminRoutes,
  ...userRoutes,
  ...siderbarRouters,
  ...courseRoutes,
];
