
export default function handler(req, res) {

    const sheetId = '1rmEsarCQ9FvjE2JrtHcMsF0lUV7HRMqllKnZCco2j70';
const sheetName = 'Data'; // Имя листа
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

const arr1 = [];
const arr2 = [];
const arr3 = [];

fetch(url)
.then(res => res.text())
.then((text) => {
    const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1];
    const data = JSON.parse(jsonString);

    const content = "Athala";

    const obj = {}

    //console.log(data.table.rows[0]?.c[0]?.v)

    const arr = data.table.rows;


    console.log(arr)

    let count = -1;

    arr.map(elem =>{

        if (elem.c[0]?.v === "MainTitle"){
            arr1.push(elem.c[1]?.v);
            count+=1;
            arr3[count] = [];
        }
        if (elem.c[0]?.v === "MainTitleData") arr2.push({title: elem.c[1]?.v, desc: elem.c[2]?.v, main_img: elem.c[3]?.v});
        if (elem.c[0]?.v !== "MainTitle" && elem.c[0]?.v !== "MainTitleData"){
            arr3[count].push({title: elem.c[1]?.v, desc: elem.c[2]?.v, tag: elem.c[3]?.v, img: elem.c[4]?.v}) 
        } ;
    })

    arr2.map((elem, index) => elem.entities = arr3[index])

    arr1.map((elem, index) => obj[elem] = arr2[index])
    
    res.status(200).json(obj);
})

  }