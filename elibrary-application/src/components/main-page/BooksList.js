import React, { PureComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../../styles/main-page/Main.css';

export class BooksList extends PureComponent {
    render() {
        const booksData = this.props.booksData;

        return booksData.map(book =>
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
                    <Button size="small" color="primary">
                        More
                    </Button>
                </CardActions>
            </Card>
        )
    };
}