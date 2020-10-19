import LoaderRoom from './LoaderRoom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { loadingRoomOn, loadingRoomOff } from './../../store/actions/roomActions';

const mapStateToProps = (state) => {
    return {
        loadingRoom: state.appReducer.loadingRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingRoomOn: () => dispatch(loadingRoomOn()),
        loadingRoomOff: () => dispatch(loadingRoomOff())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoaderRoom));