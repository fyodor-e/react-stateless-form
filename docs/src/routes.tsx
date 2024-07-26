import { RouteObject } from "react-router-dom";
import SimpleForm from "./SimpleForm";

const routes: ({
  menuName: string;
  path: NonNullable<RouteObject>;
} & RouteObject)[] = [
  {
    path: "simple-form",
    menuName: "Simple Form",
    element: <SimpleForm />,
  },
];

export default routes;
