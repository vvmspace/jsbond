import BondsListItem from "./BondsListItem";

import { Accordion } from 'react-accessible-accordion';

const BondsList = props => {
    const { bonds } = props;
    return <div className={'bonds-list'}>
        {/*<Accordion>*/}
        {bonds && bonds.map(bond => <BondsListItem bond={bond} key={bond.ticker || Math.floor(10000 * Math.random())} />)}
        {/*</Accordion>*/}
    </div>
}

export default BondsList;