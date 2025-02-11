import { useState } from "react"

function CraftCard({ item, player })
{



    const startAction = (actionType) => {
        if (!craftingStatus) return;

        actionType();

        if (durability > 0 ) setDurability(prev => {
            if (prev-5 <= 0){
                return prev-5;
            }
            return prev-5
        });
    } 

    const handleChangeProgress = () => {
        if (progress >= craftingData?.reqProgress){
            return;
        } 
        if (progress < craftingData?.reqProgress) setProgress(prev => {
            if(durability-5 === 0 && prev + player?.progressSkill !== craftingData?.reqProgress){
                setCraftingMessage("Предмет сломался!")
                setCraftingStatus(false)
            }
            if(prev + player?.progressSkill >= craftingData?.reqProgress){
                setCraftingMessage("Предмет готов!")
                /*if (my_chance.floating({min: 0, max: 100, fixed:2}) < quality/(craftingData?.maxQuality/100)){
                    setCraftingMessage("Предмет высокого качества готов!")
                }*/
                setCraftingStatus(false);
            } 
            return prev + player?.progressSkill;
        });
    }

    const handleChangeQuality = () => {
        if (quality !== craftingData?.maxQuality) setQuality(prev => {
            if (prev + player?.qualitySkill >= craftingData?.maxQuality){
                setDisabled(true);
            }
            return prev + player?.qualitySkill
        });
    }

    const [craftingData, setCraftingData] = useState(item)
    const [progress, setProgress] = useState(0);
    const [quality, setQuality] = useState(0);
    const [durability, setDurability] = useState(item?.itemDurability);
    const [craftingStatus, setCraftingStatus] = useState(true);
    const [craftingMessage, setCraftingMessage] = useState("В процессе")
    const [disabled, setDisabled] = useState(false);

    return (
        <div className="craftContainer">
            <p>{craftingData?.title + " ----- " + craftingMessage}</p>
            <p>Прочность {durability}/{craftingData?.itemDurability}</p>
            <p>Прогресс {progress}/{craftingData?.reqProgress}.</p>  
            <p>Качество {quality} из {craftingData?.maxQuality}</p>
            <p>Шанс высокого качества {quality/(craftingData?.maxQuality/100)}%.</p> 
            <button onClick={() => startAction(handleChangeProgress)}>Сделать</button>
            <button onClick={() => startAction(handleChangeQuality)} disabled={disabled}>Повысить</button>
        </div>
    )
}

export default CraftCard;