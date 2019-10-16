import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { links } from '../../config/links';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const HandedOutReservationsList = (props) => {
    const { reservations, sendDeleteReservationRequest } = props;
    return reservations.map(reservation =>
        <Card key={reservation.reservationId.toString()} className="reservation-card">
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        "{reservation.book.title}"
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {reservation.user.firstName} {reservation.user.lastName}
                    </Typography>

                    {(() => { let days = moment().diff(reservation.dateOfReservation, 'days');
                        return (
                            <Typography variant="body2" color="textSecondary" component="p">
                                Handed Out: {days} days
                            </Typography> 
                        );
                    })()}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    size="small"
                    color="secondary"
                    onClick={() => sendDeleteReservationRequest(reservation.reservationId)}
                >
                    Delete Reservation
                </Button>
            </CardActions>
        </Card>
    );
}

export default reduxForm({
    form: 'HandedOutReservationsList'
})(HandedOutReservationsList)