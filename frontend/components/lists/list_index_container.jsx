import { connect } from 'react-redux';
import ListIndex from './list_index';
import { 
    fetchCards,
    clearCards,
 } from '../../actions/card_actions';
import {
    updateList,
} from '../../actions/list_actions';

const msp = state => {
    return {
        lists: Object.values(state.entities.lists),
    }
}

const mdp = dispatch => {
    return {
        fetchCards: list_id => dispatch(fetchCards(list_id)),
        clearCards: () => dispatch(clearCards()),
        updateList: list => dispatch(updateList(list)),
    }
}

export default connect(msp, mdp)(ListIndex);