import { RouteObject } from "react-router-dom";
import SimpleForm from "./simpleForm/SimpleForm.mdx";
import ChakraUIForm from "./chakra/ChakraUIForm.mdx";
import Subform from "./subform/Subform.mdx";

const routes: ({
  menuName: string;
  path: NonNullable<RouteObject>;
} & RouteObject)[] = [
  {
    path: "get-started",
    menuName: "Get Started",
    element: <SimpleForm />,
  },
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
];

export default routes;
