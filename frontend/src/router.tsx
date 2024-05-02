import { Chat } from "./pages/chat";
import { Login } from "./pages/login";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Register } from "./pages/register";
import { useGetCurrentUser } from "./hooks/use-get-current-user";

export const Router = () => {
  const { isLoading, data } = useGetCurrentUser();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  console.log("router");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {data?.data ? (
          <>
            <Route index element={<Navigate to="chat" />} />
            <Route path={"chat"} element={<Chat />} />
            <Route path="*" element={<Navigate to="chat" />} />
          </>
        ) : (
          <>
            <Route path={`auth/*`}>
              <Route index element={<Navigate to="login" />} />
              <Route path={"login"} element={<Login />} />
              <Route path={"register"} element={<Register />} />
              <Route path="*" element={<Navigate to="login" />} />
            </Route>
            <Route path="*" element={<Navigate to="auth" />} />
          </>
        )}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
