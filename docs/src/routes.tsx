import { RouteObject } from "react-router-dom";
import Overview from "./docs/Overview.mdx";
import SimpleForm from "./simpleForm/SimpleForm.mdx";
import ChakraUIForm from "./chakra/ChakraUIForm.mdx";
import Subform from "./subform/Subform.mdx";

export type Route = {
  menuName: string;
  path: NonNullable<RouteObject["path"]>;
  children?: Route[];
} & RouteObject;

const routes: Route[] = [
  {
    path: "getting-started",
    menuName: "Getting Started",
    children: [
      {
        path: "overview",
        menuName: "Overview",
        element: <Overview />,
      },
    ],
  },
  {
    path: "examples",
    menuName: "Examples",
    children: [
      {
        path: "simple-form",
        menuName: "Simple Form",
        element: <SimpleForm />,
      },
      {
        path: "chakra-ui-form",
        menuName: "Chakra UI Form",
        element: <ChakraUIForm />,
      },
      {
        path: "subform",
        menuName: "Subform",
        element: <Subform />,
      },
    ],
  },
];

export default routes;
