import React from 'react'

const Card = ({ children }) => {
  return (
    <div className='card'>
        {children}
    </div>
  )
}

function SelectableCard({selected, onClick, children}){
    const isSelected = selected ? "selected": ''
    const className = "selectable" + isSelected

    return (
        <Card>
            <div className={className} onClick={onClick}>
                {children}
                <div className='check'><span className='checkmark'>✔</span></div>
            </div>
        </Card>
    )
}

function selectableTitleCard ({restName, restAddress, restImg, selected, onClick}){
    return (
        <SelectableCard selected={selected} onClick={onClick}>
            <div className='content'>
                <h1 className='title'>{restName}</h1>
                <p><img src={restImg} alt="" /></p>
                <p className='description'>{restAddress}</p>
            </div>
        </SelectableCard>
    )
}

// export default SelectableCardList ({ contents, onChange}) {
//     const [selected, setSelected] = useState()

// }