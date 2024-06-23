declare module "@heroicons/react/outline" {
  import { ComponentType, SVGAttributes } from "react";

  interface IconProps extends SVGAttributes<SVGElement> {
    size?: number;
  }

  export const AcademicCapIcon: ComponentType<IconProps>;
  export const AdjustmentsIcon: ComponentType<IconProps>;
  export const UserIcon: any;
  export const LogoutIcon: any;
  export const ChevronUpIcon: any;
  export const ChevronDownIcon: any;
}
