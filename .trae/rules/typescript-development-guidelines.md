---
description: Enforces strict TypeScript settings, ensuring type safety across the project.
globs: **/*.{ts,tsx}
---
- Enforce strict TypeScript settings, ensuring type safety across the project.
- - Utilize TypeScript's features to ensure type safety.
- Prefer interfaces over types when defining object shapes.
- Use generics to create reusable components and functions.
- Enforce strict typing and avoid 'any' type as much as possible.
- - Always use TypeScript for type safety. Provide appropriate type definitions and interfaces.
- Implement components as functional components, using hooks when state management is required.
- Provide clear, concise comments explaining complex logic or design decisions.
- Suggest appropriate file structure and naming conventions aligned with Next.js 14 best practices.
- Use the `'use client'` directive only when creating Client Components.
- Employ the following component definition syntax in .tsx files, allowing TypeScript to infer the return type:
  tsx
  const ComponentName = () => {
    // Component logic
  };
  
- For props, use interface definitions:
  tsx
  interface ComponentNameProps {
    // Props definition
  }
  const ComponentName = ({ prop1, prop2 }: ComponentNameProps) => {
    // Component logic
  };
  
- Use named exports for components in .tsx files:
  tsx
  export const ComponentName = () => {
    // Component logic
  };
  
- For page components, use default exports in .tsx files:
  tsx
  const Page = () => {
    // Page component logic
  };
  export default Page;
  
- If explicit typing is needed, prefer `React.FC` or `React.ReactNode`:
  tsx
  import React from 'react';
  const ComponentName: React.FC = () => {
    // Component logic
  };
  // OR
  const ComponentName = (): React.ReactNode => {
    // Component logic
  };
  
- When defining React components, avoid unnecessary type annotations and let TypeScript infer types when possible.
- Use `React.FC` or `React.ReactNode` for explicit typing only when necessary, avoiding `JSX.Element`.
- Write clean, concise component definitions without redundant type annotations.