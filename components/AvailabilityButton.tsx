"use client";
import React from "react";
import { Button } from "./ui/button"; // Assuming you have a Button component

export default function AssignmentsButton({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
}) {
  return (
    <Button
      variant={variant} // You can pass a variant for button styles (e.g., outline)
      className="w-auto" // Styling for spacing and width
    >
      {children}
    </Button>
  );
}
