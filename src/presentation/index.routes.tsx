import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {SignUp} from "@/presentation/pages/SignUp"

import "./styles/globals.scss";

type TPresentationRouterProps = {
  MakeLoginFactory: () => JSX.Element;
};

export const PresentationRouter = ({
  MakeLoginFactory,
}: TPresentationRouterProps) => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<MakeLoginFactory />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
