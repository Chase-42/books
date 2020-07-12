import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false,
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }
  render() {
    const { loading, success } = this.state;
    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Header>
              Validating your email address{'  '}
              <span role='img' aria-label='thinking emoji'>
                🤔
              </span>
            </Message.Header>
          </Message>
        )}
        {!loading && success && (
          <Message success icon>
            <Icon name='checkmark' />
            <Message.Content>
              <Link to='/dashboard'>Go to your dashboard</Link>
              <Message.Header>
                Thank you. Your account has been verfied!{'  '}
                <span role='img' aria-label='party emoji'>
                  🎉
                </span>
              </Message.Header>
            </Message.Content>
          </Message>
        )}
        {!loading && !success && (
          <Message negative icon>
            <Icon name='warning sign' />
            <Message.Content>
              <Message.Header>
                Ooops. There was an error{' '}
                <span role='img' aria-label='frown emoji'>
                  🙁
                </span>
              </Message.Header>
            </Message.Content>
          </Message>
        )}
      </div>
    );
  }
}
ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(null, { confirm })(ConfirmationPage);
