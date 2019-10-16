import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import HandedOutReservationsList from '../../components/reservations/HandedOutReservationsList';
import  ReservationActions  from '../../actions/ReservationActions';
import  HandedOutReservationActions  from '../../actions/HandedOutReservationActions';

class HandedOutReservationsPage extends PureComponent {

    componentWillMount() {
        this.props.getListOfHandedOutReservations();
    }

    sendDeleteReservationRequest(id) {
        this.props.deleteReservation(id);
    }

    render() {
        const { reservations } = this.props;
        return (
            <HandedOutReservationsList reservations={reservations} sendDeleteReservationRequest={this.sendDeleteReservationRequest}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reservations: state.handedOutReservations.handedOutReservations,     
        error: state.books.error,
        info: state.books.info
    }
}

const mapDispatchToProps = (dispatch) => {

    const bindedCreators = bindActionCreators({
        
        deleteReservation: (id) => {
            return dispatch => {
                dispatch(ReservationActions.deleteReservation(id));
            }
        },

        getListOfHandedOutReservations: () => {
            return dispatch => {
                dispatch(HandedOutReservationActions.getListOfHandedOutReservations());
            }
        },       

    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(HandedOutReservationsPage);