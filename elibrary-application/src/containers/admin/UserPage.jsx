import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  UserActions  from '../../actions/UserActions';

import { Link } from 'react-router-dom';
import { links } from '../../config/links';


class UserPage extends PureComponent {

    componentWillMount() {

    }

    render() {
        const {  } = this.props;
        return(
            <Fragment>
                <h1>AGAGAGG!</h1>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({

    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);