import { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./FocusTimer.module.css";

export default function FocusTimer() {
  const [time, setTime] = useState(300); 
  const [running, setRunning] = useState(false);

  const timeRef = useRef<HTMLParagraphElement | null>(null);
  const [warning, setWarning] = useState("");

  // Countdown effect
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // Flash animation when <10 seconds
  useLayoutEffect(() => {
    if (!timeRef.current) return;

    if (time > 0 && time < 10) {
      timeRef.current.classList.add(styles.flash);
      setTimeout(() => {
        timeRef.current?.classList.remove(styles.flash);
      }, 300);
    }
  }, [time]);

 

  useEffect(() => {
    if (!timeRef.current) return;

    const width = timeRef.current.offsetWidth;
    if (width > 120) {
      setWarning("");
    } else {
      setWarning("");
    }
  }, [time]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Focus Timer</h2>

      <p ref={timeRef} className={styles.time}>
        {time}s
      </p>

      {warning && <p className={styles.warning}>{warning}</p>}

      <div className={styles.buttons}>
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Pause</button>
        <button
          onClick={() => {
            setRunning(false);
            setTime(300);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
