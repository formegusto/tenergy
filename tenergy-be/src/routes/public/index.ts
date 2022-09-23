import { AutoRoutes, setAdminCheckMW } from "@routes/common";

export default new AutoRoutes(__dirname, setAdminCheckMW).routes;
