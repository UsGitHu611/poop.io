import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  );
}
