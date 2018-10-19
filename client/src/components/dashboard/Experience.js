import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/credentialsActions';

class Experience extends Component {
  onDeleteClick = (e, id) => {
    e.preventDefault();
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
          {exp.to === null ? (
            'Now'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={e => {
              this.onDeleteClick(e, exp._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    deleteExperience
  }
)(Experience);
