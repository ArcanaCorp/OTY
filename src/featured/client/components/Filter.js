import { filterList } from '../../../config/config'
import { useProduct } from '../../context/ProductContext'
import './styles/filter.css'

export default function Filter () {

    const { filter, handleChangeFilter } = useProduct()

    return (

        <ul className='__filters'>
            <li className={`__filter ${filter === 'all' && '__filter--active'}`} onClick={() => handleChangeFilter('all')}>Todo</li>
            {filterList.map((f, idx) => (
                <li key={idx} className={`__filter ${f === filter && '__filter--active'}`} onClick={() => handleChangeFilter(f)}>{f}</li>
            ))}
        </ul>

    )

}