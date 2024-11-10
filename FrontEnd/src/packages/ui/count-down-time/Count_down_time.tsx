import { useEffect, useState } from "react";

export default function CountDownTimer({ initialTime }: any) {
  const [time, setTime] = useState<any>(initialTime);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prevTime: any) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear timer when component unmounts
  }, [time]);

  return (
    <div>
      <h1>Thời gian hiệu lực: {time}s</h1>
    </div>
  );
}
