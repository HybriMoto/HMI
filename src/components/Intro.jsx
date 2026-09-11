import { useEffect, useState } from "react";
import "./Intro.css";

function Intro({ onComplete }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExit(true);
    }, 1800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro ${exit ? "intro-exit" : ""}`}>
      <div className="intro-content">

        <div className="intro-mark">
          <img src="/images/logo.png" alt="Hybrimoto" />
        </div>

        <h1 className="intro-title">
          HYBRIMOTO
        </h1>

        <p className="intro-subtitle">
          HYBRID MOBILITY & ENGINEERING
        </p>

      </div>
    </div>
  );
}

export default Intro;