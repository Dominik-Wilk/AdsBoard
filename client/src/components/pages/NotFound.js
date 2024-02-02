import { Col, Container, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className='my-4'>
      <Row className='text-muted justify-content-center'>
        <Col xs='auto'>The page was not found</Col>
      </Row>
    </Container>
  );
};

export default NotFound;
