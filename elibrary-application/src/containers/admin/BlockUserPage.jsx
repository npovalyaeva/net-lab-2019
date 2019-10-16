import React, { PureComponent } from 'react';
import { history } from '../../store/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';
import BlockUserForm from '../../components/users/BlockUserForm';

import  BlockedUserActions  from '../../actions/BlockedUserActions';

import "../../styles/CreateAuthor.css"

class BlockUserPage extends PureComponent {

    constructor(props) {
        super(props);
        this.sendBlockUserRequest = this.sendBlockUserRequest.bind(this);
    }

    sendBlockUserRequest(info) {
        let model = {
            userId: info.userId,
            blockingReason: info.blockingReason,
        }
        this.props.dispatch(BlockedUserActions.blockUser(model));
    }


    render() {
        return(
            <div className="blockContent">
                <BlockUserForm
                    sendRequest={(data) => this.sendBlockUserRequest(data)}
                    onCancelClick={history.goBack}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(BlockUserPage);