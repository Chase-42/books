import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment, Grid, Image } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class BookForm extends Component {
  state = {
    data: {
      goodReadsId: this.props.book.goodReadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages,
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {},
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        goodReadsId: props.book.goodReadsId,
        title: props.book.title,
        authors: props.book.authors,
        cover: props.book.covers[0],
        pages: props.book.pages,
      },
      covers: props.book.covers,
    });
  }

  onChange = (e) =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onNumberChange = (e) =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10),
      },
    });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch((err) =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...this.state.data, cover: covers[newIndex] },
    });
  };

  validate = (data) => {
    const errors = {};
    if (!data.title) errors.title = 'Cannot be blank';
    if (!data.authors) errors.authors = 'Cannot be blank';
    if (!data.pages) errors.pages = 'Cannot be blank';
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loadin={loading}>
          <Grid columns={2} fluid stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor='title'>title</label>
                  <input
                    type='title'
                    id='title'
                    name='title'
                    placeholder='Title'
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>
                <Form.Field error={!!errors.authors}>
                  <label htmlFor='authors'>Authors</label>
                  <input
                    type='authors'
                    id='authors'
                    name='authors'
                    placeholder='Authors'
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>
                <Form.Field error={!!errors.pages}>
                  <label htmlFor='pages'>Pages</label>
                  <input
                    type='number'
                    id='pages'
                    name='pages'
                    value={data.pages}
                    onChange={this.onNumberChange}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image size='small' src={data.cover} />
                {this.state.covers.length > 1 && (
                  <a role='button' tabIndex={0} onClick={this.changeCover}>
                    Another cover
                  </a>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodReadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookForm;
