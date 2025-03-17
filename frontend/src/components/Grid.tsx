import React, { ReactNode } from "react";

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

interface GridProps {
  children: ReactNode;
  columns?: {
    sm?: GridColumns;
    md?: GridColumns;
    lg?: GridColumns;
    xl?: GridColumns;
  };
  gap?: GridGap;
  className?: string;
}

interface GridItemProps {
  children: ReactNode;
  colSpan?: {
    sm?: GridColumns;
    md?: GridColumns;
    lg?: GridColumns;
    xl?: GridColumns;
  };
  className?: string;
}

const gapMap = {
  none: "",
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
};

const columnsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const getColumnClasses = (columns: GridProps["columns"]) => {
  if (!columns) return "";

  return Object.entries(columns)
    .map(([breakpoint, value]) => {
      if (breakpoint === "sm") return `sm:${columnsMap[value!]}`;
      if (breakpoint === "md") return `md:${columnsMap[value!]}`;
      if (breakpoint === "lg") return `lg:${columnsMap[value!]}`;
      if (breakpoint === "xl") return `xl:${columnsMap[value!]}`;
      return "";
    })
    .join(" ");
};

const getColSpanClasses = (colSpan: GridItemProps["colSpan"]) => {
  if (!colSpan) return "";

  return Object.entries(colSpan)
    .map(([breakpoint, value]) => {
      if (breakpoint === "sm") return `sm:col-span-${value}`;
      if (breakpoint === "md") return `md:col-span-${value}`;
      if (breakpoint === "lg") return `lg:col-span-${value}`;
      if (breakpoint === "xl") return `xl:col-span-${value}`;
      return "";
    })
    .join(" ");
};

export const Grid: React.FC<GridProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "md",
  className = "",
}) => {
  const gapClass = gapMap[gap];
  const columnsClasses = getColumnClasses(columns);

  return <div className={`grid ${columnsClasses} ${gapClass} ${className}`}>{children}</div>;
};

export const GridItem: React.FC<GridItemProps> = ({ children, colSpan, className = "" }) => {
  const colSpanClasses = getColSpanClasses(colSpan);

  return <div className={`${colSpanClasses} ${className}`}>{children}</div>;
};

export default {
  Grid,
  GridItem,
};
