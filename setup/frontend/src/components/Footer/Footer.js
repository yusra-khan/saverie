import './Footer.css';
import { Link } from 'react-router-dom'
import ButtonUI from '../ButtonUI/ButtonUI';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col' 

function Footer(props){
    return (
      <div className = "footer">
      <Row>
          <Col>
            <div>
            <Link to={props.signin}>
              <ButtonUI radius = '30px' width= '130px'> Sign In</ButtonUI>
            </Link>
            </div>
          </Col>
          <Col>
            <div>
            <Link to={props.register}>
                <ButtonUI radius = '30px' width= '130px'> Register</ButtonUI>
            </Link>
            </div>
          </Col>
      </Row>
      </div>

    );
};

export default Footer;