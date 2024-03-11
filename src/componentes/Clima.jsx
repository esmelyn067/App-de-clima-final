import { memo } from "react";
const Clima=({data})=>{
    const { name, main,wind,weather} = data;
    if (!name) return null;
        const kelvin = 273.15; 
        let temperatura_actual = parseFloat(main.temp - kelvin,10).toFixed(2);       
        const icon="https://openweathermap.org/img/wn/"+weather[0].icon+"@2x.png"
    return(
        <>
            <div className="clima-tarjeta">
                <h3><span>{name} </span></h3>
                <div className="contenedor-clima">
                    <h4>{temperatura_actual}C&deg;</h4>
                    <div className="descricion-clima">
                        <h4>{weather[0].description}</h4>
                        <img src={icon}/> 
                    </div>
                    
                    <p>humedad: {main.humidity}%</p>
                    <p>velocidad del viento: {wind.speed}m/s</p>
                </div>
            </div>
        </>
    )
}

export default memo(Clima)