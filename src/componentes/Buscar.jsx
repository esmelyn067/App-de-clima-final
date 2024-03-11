import {useCallback} from 'react'
const Buscar=({busqueda,setBusqueda,dato,etiqueta})=> {
    const handleInput = useCallback(e => {
        setBusqueda( e.target.value)
    },[setBusqueda])
    return (
        <form >
            <div className="form">
            <label>{etiqueta}</label>
                <select 
                    className="custom-select"
                    id="busqueda"    
                    name="busqueda"
                    value={busqueda}
                    onChange={handleInput}
                >
                    {dato.map(d=>(
                        <option key={d.value} value={d.value}>{d.name}</option>
                    ))}
                </select>
            </div>
        </form>
        
    )
}

export default Buscar