import { Component, lazy } from "react";

export const routes = [
  {
    to: "/movistarTotal",
    path: "/movistarTotal",
    Component: lazy(() => import("../MovistarTotal/pages/MovistarTotal")),
    name: "MovistarTotal",
  },
  {
    to: "/planes",
    path: "/planes",
    Component: lazy(() => import("../Home/pages/Home")),
    name: "Planes",
  },
  {
    to: "/hogar",
    path: "/hogar",
    Component: lazy(() => import("../hogar/pages/Hogar")),
    name: "Hogar",
  },
  {
    to: "/tecnologias",
    path: "/tecnologias",
    Component: lazy(() => import("../tecnologia/pages/tecnologias")),
    name: "Tecnologias",
  },
];
