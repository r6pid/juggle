"use client";
import React from "react";
import { Button } from "./ui/button"; // Assuming you have a Button component

export default function CalculateButton({
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
    >
      {children}
    </Button>
  );
}
