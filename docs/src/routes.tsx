import { RouteObject } from "react-router-dom";
import Overview from "./docs/Overview.mdx";
import SimpleForm from "./simpleForm/SimpleForm.mdx";
import ChakraUIForm from "./chakra/ChakraUIForm.mdx";
import Subform from "./subform/Subform.mdx";
import FormWithArray from "./formWithArray/FormWithArray.mdx";
import CustomUseConvert from "./customUseConvert/CustomUseConvert.mdx";
import FormStateInRedux from "./formStateInRedux/FormStateInRedux.mdx";

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
        path: "form-with-array",
        menuName: "Form with Array",
        element: <FormWithArray />,
      },
      {
        path: "subform",
        menuName: "Subform",
        element: <Subform />,
      },
      {
        path: "custom-use-convert",
        menuName: "Custom useConvert",
        element: <CustomUseConvert />,
      },
      {
        path: "form-state-in-redux",
        menuName: "Form State in Redux",
        element: <FormStateInRedux />,
      },
    ],
  },
];

export default routes;
