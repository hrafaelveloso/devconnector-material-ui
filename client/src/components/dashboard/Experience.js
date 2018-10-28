import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/credentialsActions';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button
} from '@material-ui/core';

class Experience extends Component {
  onDeleteClick = (e, id) => {
    e.preventDefault();
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <TableRow key={exp._id}>
        <TableCell>{exp.company}</TableCell>
        <TableCell>{exp.title}</TableCell>
        <TableCell>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
          {exp.to === null ? (
            'Now'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </TableCell>
        <TableCell>
          <Button
            className="bg-danger"
            variant="contained"
            onClick={e => {
              this.onDeleteClick(e, exp._id);
            }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));

    return (
      <>
        <Typography variant="h5">Experience Credentials</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Years</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{experience}</TableBody>
        </Table>
      </>
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
