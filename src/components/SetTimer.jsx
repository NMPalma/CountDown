import React, { useState } from 'react';
import confetti from "canvas-confetti"

export const SetTimer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleToggleTimer = () => {
        if (timerRunning) {
            clearInterval(intervalId);
            setTimerRunning(false);
        } else {
            if (minutes === 0 && seconds === 0) {
                setErrorMessage('No se puede iniciar la cuenta si los minutos y los segundos están ambos en 0.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000); // El mensaje de error desaparece después de 5 segundos
            } else {
                startTimer();
                setErrorMessage('');
                setTimerRunning(true);
            }
        }
    };

    const startTimer = () => {
        let totalSeconds = minutes * 60 + seconds;
        const id = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(id);
                setTimerRunning(false);
                triggerConfetti(); // Llamar a la función para activar el confeti
            } else {
                totalSeconds -= 1;
                setSeconds(totalSeconds % 60);
                setMinutes(Math.floor(totalSeconds / 60));
            }
        }, 1000);
        setIntervalId(id);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'minutes') {
            setMinutes(parseInt(value));
        } else if (name === 'seconds') {
            setSeconds(parseInt(value));
        }
    };

    const triggerConfetti = () => {
        confetti();
    };

    return (
        <div className="container">
            <div className='timerContainer'>
                <span>{minutes < 10 ? `0${minutes}` : minutes}:</span>
                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
            <div className='inputContainer'>
                <input type="number" name="minutes" value={minutes} min="0" max="59" onChange={handleInputChange} />
                <span>:</span>
                <input type="number" name="seconds" value={seconds} min="0" max="59" onChange={handleInputChange} />
                <button onClick={handleToggleTimer}>
                    {timerRunning ? "Detener temporizador" : "Iniciar temporizador"}
                </button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};
