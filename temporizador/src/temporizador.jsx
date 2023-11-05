import { useState, useRef } from "react";

function Temporizar() {
  const [minutos1, setminutos1] = useState(0);
  const [minutos2, setminutos2] = useState(0);
  const [segundos1, setsegundos1] = useState(0);
  const [segundos2, setsegundos2] = useState(0);
  const [intervalid, setintervalid] = useState(null);
  const [TempActivo, SetTempActivo] = useState(false);
  const [estado, setestado] = useState('Comienza')

  const INTERVAL = useRef(null)


  const empezar = () => {
    if (intervalid) {
      return;
    }
    
   setintervalid(true);

    INTERVAL.current = setInterval(() => {
      setsegundos2((prevsegundos2) => {
        const newsegundos2 = Math.floor(prevsegundos2 + 1) % 10; //El % Asegura que esté en el rango [0, 9], es decir, que no pase del 9
        if (newsegundos2 === 0) {
          setsegundos1((prevsegundos1) => {
            const newprevsegundos = (prevsegundos1 + 1) % 6;
            if (newprevsegundos === 0) {
              setminutos2((prevminutos2) => {
                const newminutos2 = (prevminutos2 + 1) % 9;
                if (newminutos2 === 0) {
                  setminutos1((prevminutos1) => {
                    const newminutos1 = (prevminutos1 + 1) % 6;
                    if (newminutos1 === 0) {
                      clearInterval(INTERVAL);
                      setsegundos2(0);
                      setsegundos1(0);
                      setminutos2(0);
                      setminutos1(0);
                    }
                    return newminutos1;
                  });
                }
                return newminutos2;
              });
            }
            return newprevsegundos;
          });
        }
        return newsegundos2;
      });
    }, 1000);
    setintervalid(INTERVAL.current);
    setestado('Parar')
    SetTempActivo(true);
    const meessii = 'h';
  };
    
 
  const reset = () => {
    setminutos1(0);
    setminutos2(0);
    setsegundos1(0);
    setsegundos2(0);
    clearInterval(INTERVAL.current);
    setintervalid(null);
    setestado('Comienza');
  };

  const parar = () => {
    if(TempActivo){
      clearInterval(INTERVAL.current);
      setintervalid(null)
      setestado('Comienza'); 
      SetTempActivo(false);
    }
  };

  return (
    <div>
      <div className="timer">
        <span id="minutos">
          {minutos1}
          {minutos2}
        </span>
        <span>:</span>
        <span id="segundos">
          {segundos1}
          {segundos2}
        </span>
      </div>

      <span>
        <button onClick={TempActivo ? parar : empezar}>{estado}</button>
        <button onClick={reset}>Reset</button>
      </span>
    </div>
  );
}

export default Temporizar;
