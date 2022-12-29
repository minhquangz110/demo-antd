import { Col, Row } from "antd";
import "./styles.less";
export const FooterComponent = () => {
  return (
    <div className="footer-container">
      <div className="container">
        <Row gutter={[42,42]}> 
        <Col md={6} xs={24} sm={24} className="widget">
          <h3 className="widget-title">CONTACT INFO</h3>
          <ul className="contact-details ">
            <li>
              <strong>ADDRESS:</strong>
              <span>123 Street Name, City, England</span>
            </li>
            <li>
              <strong>PHONE:</strong> <span>(123) 456-7890</span>
            </li>
            <li>
              <strong>EMAIL:</strong>{" "}
              <span>
                <a href="mailto:mail@example.com">mail@example.com</a>
              </span>
            </li>
            <li>
              <strong>WORKING DAYS/HOURS:</strong>{" "}
              <span>Mon - Sun / 9:00 AM - 8:00 PM</span>
            </li>
          </ul>
        </Col>
        <Col  md={6} xs={24} sm={24} className="widget">
          <h3 className="widget-title">Customer Service</h3>
          <div className="textwidget">
            <ul>
              <li>
                <span>Help &amp; FAQs</span>
              </li>
              <li>
                <span>Order Tracking</span>
              </li>
              <li>
                <span>Shipping &amp; Delivery</span>
              </li>
              <li>
                <span>Orders History</span>
              </li>

              <li>
                <span> My Account</span>
              </li>
              <li>
                <span>Careers</span>
              </li>
              <li>
                <span>About Us</span>
              </li>
              <li>
                <span>Corporate Sales</span>
              </li>
              <li>
                <span>Privacy</span>
              </li>
            </ul>
          </div>
        </Col>
        <Col  md={6} xs={24} sm={24} className="widget">
          <h3 className="widget-title">Popular Tags</h3>
        </Col>
        <Col  md={6} xs={24} sm={24} className="widget">
          <h3 className="widget-title">Subscribe Newsletter</h3>
          <div className="textwidget">
            <p>
            Get all the latest information on events, sales and offers. Sign up for newsletter:
            </p>
            <div className="block newsletter">
              <div className="content"></div>
            </div>
          </div>
        </Col>
        </Row>
      </div>
    </div>
  );
};
