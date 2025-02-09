import {
  ChartBar,
  House,
  LayoutDashboard,
  Option,
  Projector,
  User2Icon,
  Users2,
} from "lucide-react";

export const sideBarData = [
  {
    group_name: "my business",

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
        title: "Performance",
        url: "/home/performance",
        icon: ChartBar,
      },
      {
        title: "Employees",
        url: "/home/employees",
        icon: Users2,
      },
      {
        title: "Users",
        url: "/home/users",
        icon: User2Icon,
      },
    ],
  },
];
