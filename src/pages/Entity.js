import { useEffect, useState } from "react";

export default function Entity(props){
    const content = props.content;

    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({x:0,y:0});
    const [entityData, setEntityData] = useState('');
    const [toolTipDesc, setToolTipDesc] = useState('');
    const [entityList, setEntityList] = useState([]);
    const [optionValue, setOptionValue] = useState('Все');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true);

    const getCursorPosition = (e) => {
        setPosition(
            {
                x: e.pageX,
                y: e.pageY
            }
        )
    }
    
    const handleSortChange = (e) => {
        const newValue = e.target.value
        setValue(newValue);
        
        setEntityList(entityData?.entities.filter((item) => {
            // Учитываем фильтр по optionValue
            const matchesFilter = optionValue === "Все" || item.tag === optionValue;
            // Фильтр по поисковому запросу
            const matchesSearch = item.title.toLowerCase().includes(newValue.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(newValue.toLowerCase());
            
            return matchesFilter && matchesSearch;
        }));
    };

    const optionChange = (e) => {
        const newOptionValue = e.target.value;
        setOptionValue(newOptionValue);

        setEntityList(entityData?.entities.filter((item) => {
            const matchesFilter = newOptionValue === "Все" || item.tag === newOptionValue;
            const matchesSearch = item.title.toLowerCase().includes(value.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(value.toLowerCase());
            return matchesFilter && matchesSearch;
        }))
    }
    

    useEffect(() => {
        fetch("api/data")
        .then(res => res.json())
        .then(data => {setEntityData(data[content]); setLoading(false); setEntityList(data[content]?.entities.sort((a,b) => {
            if (a.title === "Неизвестная Личность") return 1;
            if (a.title === "Неясное Явление") return 1;
            if (a.title === "Ненайденный Предмет") return 1; 
            if (a.title === "Неявная Организация") return 1;
            if (a.title < b.title ) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
        }))})
        }, [content])

    
    
    return(
        <>
            {loading && <h1 style={{position:"absolute", bottom:"10px", right:"10px", opacity:0.5}}>Загрузка...</h1>}
            { !loading && <div>
            <h2>{entityData?.title}</h2>
            <img className="main-logo" src={entityData?.main_img}
                onMouseOver={(e)=>{e.stopPropagation(); setShowTooltip(true); setToolTipDesc(entityData?.desc)}} 
                onMouseLeave={()=> setShowTooltip(false)}
                onMouseMove={getCursorPosition} 
            ></img>
            <p>Открыто {entityData?.entities?.filter(elem => !["Неизвестная Личность","Неясное Явление","Ненайденный Предмет","Неявная Организация"].includes(elem.title)).length} записей из {entityData.entities?.length}</p>
            <input type='text' className="search" value={value} onChange={handleSortChange}></input>
            <select name="Теги" onChange={optionChange}>
                <option value="Все">Все</option> 
                <option value="Сущность">Сущности</option>
                <option value="Артефакт">Артефакты</option>
                <option value="Явление">Явления</option>
                <option value="Организация">Организации</option>
            </select>
            <div className="entity-block">
                {
                    entityList.map((item, index)=>{
                        return <div className="title-entity">
                            <div className="entity-container"
                                onClick={()=>{setToolTipDesc("Текст успешно скопирован."), navigator.clipboard.writeText(toolTipDesc)}}
                                onMouseOver={()=>{ setShowTooltip(true); setToolTipDesc(item.desc)}} 
                                onMouseLeave={()=> setShowTooltip(false)}
                                onMouseMove={getCursorPosition} 
                                style={{backgroundImage:`url(${item.img})`}}
                                key={index}>
                            </div>
                            <p>{item.title}</p>
                        </div>
                    })
                }
            </div>
            {showTooltip && <span onClick={e => e.stopPropagation()} className="tooltip-text" style={{bottom: 0, left:"10%", position:"fixed", minWidth:"80%", boxSizing:"border-box"}}>{toolTipDesc}</span>}
            </div>}
        </>
    )
}