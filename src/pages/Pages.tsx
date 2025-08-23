import { Route, BrowserRouter, Routes, RouteProps } from "react-router";
import { Home } from "./Home";
import { Game } from "./game/Game";
import { NotFound } from "./error/NotFound";
import { ErrorView } from "./error/ErrorView";

const defaultProps = (): RouteProps => ({
  errorElement: <ErrorView />,
});

export const Pages = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" index element={<Home />} {...defaultProps} />
      <Route path="/game/:gameId" element={<Game />} {...defaultProps} />
      <Route path="/*" element={<NotFound />} {...defaultProps} />
    </Routes>
  </BrowserRouter>
);
