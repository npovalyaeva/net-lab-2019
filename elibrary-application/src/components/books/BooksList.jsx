import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { links } from '../../config/links';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import "../../styles/MainPage.css"

const BooksList = (props) => {
    const { books } = props;
    return books.map(book =>
        <Card key={book.bookId.toString()} className="book-card">
            <CardActionArea>
                <CardMedia
                    className="book-image"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="'{book.title}' by {book.authorName.lastName}"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {book.authorName.firstName} {book.authorName.lastName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link className="detailsBtn" to={() => links.BOOK_INFO_PAGE(book.bookId)} >
                    <Button 
                        size="small"
                        color="secondary"
                    >
                        View Details
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default reduxForm({
    form: 'booksList'
})(BooksList)