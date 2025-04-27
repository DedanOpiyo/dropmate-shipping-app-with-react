import React from 'react'
import { useRouteError } from "react-router-dom";

export default function NoPage() {
    const error = useRouteError();
    console.error(error);
    
  return (
    <div>NoPage</div>
  )
}
