import { memo } from 'react';

const Noticia=({data})=>{
    return(
        <>
            <div className='news-container'>
                {data.filter(news => news.title!='').map((news, index) => (
                    <div key={index}>
                    <h3>{news.title}</h3>
                    <p>{news.geo_facet}, {news.published_date.slice(0,10)}</p>
                    <img src={news.multimedia[1].url} alt={news.title} />
                    <p>{news.abstract}</p>
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                        Read more
                    </a>
                    </div>
                ))}
             </div>
        </>
    )
}
export default memo(Noticia);