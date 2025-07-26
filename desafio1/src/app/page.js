"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState(null);

  const agregar = (valor) => {
    setEntrada((prev) => prev + valor);
  };

  const calcular = () => {
    try {
      let expresion = entrada.replace(/(\d)(√)/g, "$1*$2");

      expresion = expresion.replace(/√(\d+|\(.+?\))/g, "Math.sqrt($1)");

      expresion = expresion.replace(/\^/g, "**");

      if (/\/0(?!\d)/.test(expresion)) {
        setResultado(" División entre 0 no permitida.");
        return;
      }

      const resultadoEval = new Function(`return (${expresion})`)();

      if (isNaN(resultadoEval)) {
        setResultado(" Operación inválida.");
        return;
      }

      setResultado(resultadoEval);
      setEntrada(resultadoEval.toString()); // mostrar resultado en input
    } catch {
      setResultado(" Error en la expresión.");
    }
  };

  const borrar = () => {
    setEntrada('');
    setResultado(null);
  };

  return (
    <main className={styles.main}>
      <label className={styles.titulo}>Calculadora Desafío 1</label>
      <div className={styles.calculadora}>
        <input
          className={styles.inputnum}
          type="text"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="Escribe tu operación"
        />

        <div className={styles.botones}>
          <button className={styles.button} onClick={() => agregar('+')}>+</button>
          <button className={styles.button} onClick={() => agregar('-')}>−</button>
          <button className={styles.button} onClick={() => agregar('*')}>×</button>
          <button className={styles.button} onClick={() => agregar('/')}>÷</button>
          <button className={styles.button} onClick={() => agregar('√')}>√</button>
          <button className={styles.button} onClick={() => agregar('^')}>^</button>
          <button className={styles.button} onClick={calcular}>=</button>
          <button className={styles.button} onClick={borrar}>AC</button>
        </div>

        {resultado !== null && (
          <div className={styles.resultado}>Resultado: {resultado}</div>
        )}
      </div>
      <label className={styles.foot}>HECHO POR: HM220373 // EU220488</label>
    </main>
  );
}

