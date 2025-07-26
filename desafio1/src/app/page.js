"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(null);

  const parseInputs = () => {
    const n1 = parseFloat(numero1);
    const n2 = parseFloat(numero2);
    return { n1, n2 };
  };

  const mostrarErrorSiNaN = (n1, n2, requiereAmbos = true) => {
    if (isNaN(n1) || (requiereAmbos && isNaN(n2))) {
      setResultado(" Debes ingresar números válidos.");
      return true;
    }
    return false;
  };

  const sumar = () => {
    const { n1, n2 } = parseInputs();
    if (mostrarErrorSiNaN(n1, n2)) return;
    setResultado(`Resultado de la suma: ${n1 + n2}`);
  };

  const restar = () => {
    const { n1, n2 } = parseInputs();
    if (mostrarErrorSiNaN(n1, n2)) return;
    setResultado(`Resultado de la resta: ${n1 - n2}`);
  };

  const multi = () => {
    const { n1, n2 } = parseInputs();
    if (mostrarErrorSiNaN(n1, n2)) return;
    setResultado(`Resultado de la multiplicación: ${n1 * n2}`);
  };

  const dividir = () => {
    const { n1, n2 } = parseInputs();
    if (mostrarErrorSiNaN(n1, n2)) return;
    if (n2 === 0) {
      setResultado(" No se puede dividir entre 0.");
      return;
    }
    setResultado(`Resultado de la división: ${n1 / n2}`);
  };

  const raiz = () => {
    const n1 = parseFloat(numero1);
    if (isNaN(n1)) {
      setResultado(" Ingresa un número válido para calcular la raíz.");
      return;
    }
    if (n1 < 0) {
      setResultado(" No se puede calcular la raíz cuadrada de un número negativo.");
      return;
    }
    setResultado(`Raíz cuadrada de Número 1: ${Math.sqrt(n1)}`);
  };

  const Borrar = () => {
    setNumero1('');
    setNumero2('');
    setResultado(null);
  };

  return (
    <main className={styles.main}>
      <div className={styles.calculadora}>
        <div className={styles.numeros}>
          <label className={styles.text}>Número 1:</label>
          <input
            className={styles.inputnum}
            type="number"
            value={numero1}
            onChange={(e) => setNumero1(e.target.value)}
          />
        </div>
        <div className={styles.numeros}>
          <label className={styles.text}>Número 2:</label>
          <input
            className={styles.inputnum}
            type="number"
            value={numero2}
            onChange={(e) => setNumero2(e.target.value)}
          />
        </div>
        <div>
          <button className={styles.button} onClick={sumar}>Sumar</button>
          <button className={styles.button} onClick={restar}>Restar</button>
        </div>
        <div>
          <button className={styles.button} onClick={multi}>Multiplicar</button>
          <button className={styles.button} onClick={dividir}>Dividir</button>
          <button className={styles.button} onClick={raiz}>Raíz Cuadrada</button>
        </div>
        <button className={styles.button} onClick={Borrar}>AC</button>

        {resultado && (
          <div className={styles.resultado}>{resultado}</div>
        )}
      </div>
    </main>
  );
}
