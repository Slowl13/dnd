import { useEffect, useState } from "react"

export default function Google(){

    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const sheetId = '1rmEsarCQ9FvjE2JrtHcMsF0lUV7HRMqllKnZCco2j70';
        const sheetName = 'Лист12'; // Имя листа
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
        fetch(url)
        .then(res => res.text())
        .then((text) => {
            const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1];
            const data = JSON.parse(jsonString);
            const url = data.table.rows[0]?.c[0]?.v;
            setRows(url);
            setLoading(true);
        })
    },[])

    return(
        <img src={rows} style={{width:200}}></img>
    )
}