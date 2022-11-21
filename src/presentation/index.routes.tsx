import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    </Routes>
  </BrowserRouter>
);
