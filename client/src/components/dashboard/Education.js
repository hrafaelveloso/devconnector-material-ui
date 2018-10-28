import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/credentialsActions';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button
} from '@material-ui/core';

class Education extends Component {
  onDeleteClick = (e, id) => {
    e.preventDefault();
    this.props.deleteEducation(id);
  };

  render() {
    const experience = this.props.education.map(edu => (
      <TableRow key={edu._id}>
        <TableCell>{edu.school}</TableCell>
        <TableCell>{edu.degree}</TableCell>
        <TableCell>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
          {edu.to === null ? (
            'Now'
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </TableCell>
        <TableCell>
          <Button
            className="bg-danger"
            variant="contained"
            onClick={e => {
              this.onDeleteClick(e, edu._id);
            }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));

    return (
      <div className="mt-3">
        <Typography variant="h5">Education Credentials</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Years</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{experience}</TableBody>
        </Table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    deleteEducation
  }
)(Education);
