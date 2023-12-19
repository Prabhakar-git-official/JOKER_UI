import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Picture1 from '../../assets/images/price-stability-image.png';
//import Picture from '../../assets/images/Statis Tetrahedron.png';
import Picture from '../../assets/images/stasisicon.png';



const PriceStability = () => {
    return (
        <div className='element-statbiliy pt-md-5 pt-4 pb-md-5 text-md-start text-center'>
            <Container fluid="lg">
                <Row className='justify-content-between align-items-center'>
                    <Col md={6} lg={5} className="mb-4 md-md-0">
                        <h3 className="h3">STASIS ASSET CLASS</h3>
                        <p>The protocol modified three fundamentally different algorithmic models (Inflation, Deflation, and Seigniorage Shares) into one single asset class group called <span style={{fontWeight: "bold"}}>STASIS </span> via three interlinked assets - JOKER, CREDIT, and DIME.</p>
                    </Col>
                    <Col md={6} lg={6} className="mb-3 md-md-0 text-center">
                        <img src={Picture} alt="Picture2" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PriceStability;