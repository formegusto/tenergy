import { AutoRoutes, setLoginCheckMW } from "@routes/common";

export default new AutoRoutes(__dirname, setLoginCheckMW).routes;
