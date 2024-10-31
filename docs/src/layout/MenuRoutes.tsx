import { FC, Fragment } from "react";
import { Route } from "../routes";
import MenuLink from "./MenuLink";
import MenuSection from "./MenuSection";

type Props = {
  basePath?: string;
  routes: Route[];
};

const combinePath = ({
  basePath,
  path,
}: {
  basePath?: string;
  path: Route["path"];
}) => {
  if (!basePath) return path;

  return `${basePath}/${path}`;
};

const MenuRoutes: FC<Props> = ({ routes, basePath }) => {
  return (
    <>
      {routes.map(({ menuName, path, children }) =>
        children ? (
          <Fragment key={combinePath({ path, basePath })}>
            <MenuSection>{menuName}</MenuSection>
            <MenuRoutes basePath={path} routes={children} />
          </Fragment>
        ) : (
          <MenuLink to={combinePath({ path, basePath })} key={path}>
            {menuName}
          </MenuLink>
        ),
      )}
    </>
  );
};

export default MenuRoutes;
