import { useState, useEffect, useCallback} from 'react'
import './App.css'
import {Clima, Buscar, Error,Noticia}  from './componentes'
const ciudades =[
    {name: "--Seleccione una ciudad--",value: ""},
    {name: "Santo Domingo", value: "Santo+Domingo" },
    {name: "San Cristobal", value: "San+Cristobal"},
    {name: "Villa Altagracia",value: "Villa+Altagracia"},
    {name: "Bani",value: "Bani"},
    {name: "La Romana",value: "La+Romana"},
    {name: "Punta Cana",value: "Punta+Cana"}, 
    {name: "Samaná", value: "Samana"},  
    {name: "Puerto Plata",value: "Puerto+Plata"},
    {name: "Constanza",value: "Constanza"},
    {name: "Azua",value: "Azua"},
    {name: "San Juan de la Maguana",value: "San+Juan+de+la+Maguana"},
    {name: "Enriquillo",value: "Enriquillo"}            
  ]
  const seciones =[
    {name: "--Seleccione una seccion--",value: ""},
    {name: "arts", value: "arts"},
    {name: "automobiles", value: "automobiles"},
    {name: "books/review",value: "books"},
    {name: "business",value: "business"},
    {name: "fashion",value: "fashion"},
    {name: "food",value: "food"}, 
    {name: "health", value: "health"},  
    {name: "home",value: "home"},
    {name: "insider",value: "insider"},
    {name: "magazine",value: "magazine"},
    {name: "movies",value: "movies"},
    {name: "nyregion",value: "nyregion"},
    {name: "obituaries",value: "obituaries"},
    {name: "opinion",value: "opinion"},
    {name: "politics",value: "politics"},
    {name: "realestate",value: "realestate"},
    {name: "science",value: "science"},
    {name: "sports",value: "sports"},
    {name: "sundayreview",value: "sundayreview"},
    {name: "technology",value: "technology"},
    {name: "sptheaterorts",value: "theater"},
    {name: "t-magazine",value: "t-magazine"},
    {name: "upshot",value: "upshot"},
    {name: "us",value: "us"},
    {name: "world",value: "world"}                        
  ] 

function App() {
  const [ciudad, setCiudad] = useState('Santo+Domingo');
  const [data, setData] = useState({});
  const [errorC, setErrorC] = useState(false);
  const [tick,setTick]=useState(true)
  /*------------------------------------------------------------------------------------- */
  const [seccion, setSeccion]=useState('home')
  const [dataSC, setDataSC]=useState([])
  const [errorSC, setErrorSC]=useState(false)

  setInterval(()=>{tick?setTick(false):setTick(true)}, 600000);

  useEffect(()=> {
    const consultarAPI_clima = async() => {     
        let keyAPI = `eaed9e10df601aab920b0f2f1e13df89`;
        let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},DO&appid=${keyAPI}&lang=sp`;
        let response = await fetch(urlAPI);
        let data = await response.json(); 
        setData(data);
        if(data.cod === '404')
          setErrorC(true);
        else
          setErrorC(false);  
        console.log(data) 
    };
    consultarAPI_clima();
  },[ciudad,tick]);
 /*---------------------------noticia------------------------------------------------------*/ 
  useEffect(()=> {
    const consultarAPI_noticia = async() => {     
        let keyAPI = `ISUrOtKQ32lQTiIxdzSdRJjXrfpi4FQm`;
        let urlAPI = `https://api.nytimes.com/svc/topstories/v2/${seccion}.json?api-key=${keyAPI}`;
        let response = await fetch(urlAPI);
        let data = await response.json(); 
        setDataSC(data.results);
        if(data)
          setErrorSC(false);
        else
          setErrorSC(true);  

        console.log(data.results)      
    };
    consultarAPI_noticia();
  },[seccion]);


  return (
    <>
    <div className='clima'>
      <Buscar busqueda={ciudad}
            setBusqueda={setCiudad}
            dato={ciudades}
            etiqueta={'Ciudad '}/>
            
      {errorC? <Error descripcion = {data.message}/>: <Clima data={data}/>}
    </div>
  
      <div className='news'>
        <Buscar busqueda={seccion}
            setBusqueda={setSeccion}
            dato={seciones}
            etiqueta={'Sección '}/>
        {errorSC? <Error descripcion = {'No Encontrado'}/>: <Noticia data={dataSC}/>}
      </div>
      
    </>
  )
}

export default App
