import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/piratebay.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Recipes 
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;