import { Outlet } from "react-router-dom";
import BaseLayout from "./BaseLayout";

const BaseLayoutOutlet = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default BaseLayoutOutlet;
