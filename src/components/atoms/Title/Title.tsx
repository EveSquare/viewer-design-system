import React from "react";

interface Props {
  children: string | any;
}

export const Title: React.FC<Props> = ({ children }) => {
  return (
    <h2>{ children }</h2>
  );
}

Title.displayName = "TITLE";