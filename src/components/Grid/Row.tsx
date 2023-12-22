import { NextPage } from 'next'
import Tile from './Tile'
import { useContext } from 'react';
import { WorldeContext } from '../WordleContext';

interface Props {
    id: number,
}

const Row: NextPage<Props> = ({ id }) => {
    // DEFAULT is 5
    const { word } = useContext(WorldeContext) || {};
    var nums: number[] = []
    if (word) {
        for (var i = 0; i < word?.length; i++) {
            nums.push(i)
        }
    }
    return (<>
        {nums.map((item, index) => (<Tile RowId={id} key={index} id={index} />))}
    </>)
}

export default Row