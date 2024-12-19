import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <div
      id="error-page"
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <h1>404</h1>
      <p>{error?.statusText || error?.message}</p>
    </div>
  );
}
