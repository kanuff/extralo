import { connect } from 'react-redux';
import ListIndex from './list_index';

const msp = state => {
    return {
        lists: Object.values(state.entities.lists),
    }
}

const mdp = dispatch => {
    return {

    }
}

export default connect(msp, null)(ListIndex);