import React from "react";
import Antigravity from "./Antigravity";

const AntigravityBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Antigravity autoAnimate={true} />
    </div>
  );
};

export default AntigravityBackground;
