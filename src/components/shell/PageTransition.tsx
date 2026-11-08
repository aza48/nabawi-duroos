import { ViewTransition } from "react";

/**
 * Pages fade and rise gently into place on navigation (React ViewTransition, used by the route
 * templates, which remount on every navigation). Browsers without the View Transitions API just
 * swap the page, and reduced motion turns the movement off (globals.css).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
