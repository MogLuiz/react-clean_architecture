import React from "react";
import ReactDOM from "react-dom";

import { MakeLoginFactory } from "./factories/pages/login/login-factory";

import { PresentationRouter } from "@/presentation/index.routes";

ReactDOM.render(
  <PresentationRouter MakeLoginFactory={MakeLoginFactory} />,
  document.getElementById("main")
);
