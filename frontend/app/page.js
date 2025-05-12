"use client";
import { useState, useEffect } from "react";
import styles from '../app/Home.module.css';

export default function Home() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState(""); // To differentiate Spam/Not Spam result

  // Load saved state from localStorage when the component mounts
  useEffect(() => {
    const savedMessage = localStorage.getItem("message");
    const savedResult = localStorage.getItem("result");

    if (savedMessage) setMessage(savedMessage);
    if (savedResult) setResult(savedResult);
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    const prediction = data.prediction || "Prediction failed";
    setResult(prediction);

    // Set result type (Spam or Not Spam) for styling
    setResultType(prediction === "Spam" ? "spam" : "not-spam");

    // Save the message and prediction in localStorage
    localStorage.setItem("message", message);
    localStorage.setItem("result", prediction);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Spam Detector</h1>
      <textarea
        className={styles.textarea}
        rows={5}
        placeholder="Enter a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Predict
      </button>

      {result && (
        <p className={`${styles.result} ${styles[resultType]}`}>
          Result: {result}
        </p>
      )}
    </div>
  );
}
