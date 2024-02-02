import { Card, Button, Row, Col } from 'react-bootstrap';
import styles from './SingleAd.module.scss';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { IMG_URL } from '../../../config';
import { checkIfLoggedIn } from '../../../redux/usersRedux';

const SingleAd = () => {
  const { id } = useParams();
  const adData = useSelector(state => getAdById(state, id));
  const user = useSelector(state => checkIfLoggedIn(state));
  const date = new Date(adData.date);
  const datePublish = date.toLocaleDateString();
  if (!adData) return <Navigate to='/' />;
  return (
    <div className={styles.card}>
      <Card className={styles.adCard}>
        <Card.Img variant='top' src={IMG_URL + adData.image} />
        <Card.Body>
          <Card.Title>{adData.title}</Card.Title>
          <Card.Title>{adData.price} PLN</Card.Title>
          <Card.Text>{adData.location}</Card.Text>
          <Card.Text>{adData.content}</Card.Text>
          <Card.Text>{datePublish}</Card.Text>
          <Row className={styles.row}>
            <Col>
              <img
                className={styles.avatar}
                src={IMG_URL + adData.user.avatar}
                alt=''
              />
            </Col>
            <Col>{adData.user.login}</Col>
            <Col>Tel: {adData.user.phone}</Col>
          </Row>
          {user && user.login === adData.user.login && (
            <Row>
              <Col className='text-end'>
                <Button
                  as={NavLink}
                  to={`/ads/edit/${adData._id}`}
                  className={styles.buttonEdit}>
                  Edit
                </Button>
                <Button className={styles.buttonDelete}>Delete</Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleAd;
