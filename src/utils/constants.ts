import {
  ChartBar,
  House,
  LayoutDashboard,
  Option,
  Projector,
  User,
  User2Icon,
  Users2,
} from "lucide-react";

export const sideBarData = [
  {
    group_name: "key performance validator",

    menu: [
      {
        title: "Dashboard",
        url: "/home",
        icon: LayoutDashboard,
        submenu: [
          { title: "dashboard", url: "/home" },
          { title: "home screen", url: "/" },
        ],
      },
      {
        title: "Employees",
        url: "/home/employees",
        icon: Users2,
      },
      {
        title: "Departments",
        url: "/home/departments",
        icon: House,
      },

      {
        title: "Projects",
        url: "/home/projects",
        icon: Projector,
      },
      {
        title: "kpi categories",
        url: "/home/kpi",
        icon: Option,
      },
      {
        title: "my performance",
        url: "/home/performance",
        icon: User,
      },

    ],
  },
];
