import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, List, Row } from 'antd';
// context imports
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { APIContext } from '../../../state/contexts/APIContext';

const PublicServices = props => {
  // context state
  const { groomerServices, servicesUpdated } = useContext(GroomersContext);
  const { getGroomerServicesByID } = useContext(APIContext);
  const pathway = useParams();

  useEffect(() => {
    async function fetchData(id) {
      await getGroomerServicesByID(id);
    }
    let id = '';
    id = pathway;

    fetchData(id.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesUpdated]);

  return (
    <List
      dataSource={groomerServices}
      renderItem={item => (
        <Row justify={'space-between'} style={{ padding: '5px' }}>
          <Col>
            {' '}
            {item.service_name} : ${item.services_price}
          </Col>
          <Col>
            <Row>
              {/* TODO decide if we want to add edit for selected services ?*/}
              {/*<Col style={{ paddingLeft: '5px', paddingRight: '5px' }}>*/}
              {/*  <Button*/}
              {/*    type="primary"*/}
              {/*    shape="circle"*/}
              {/*    size={'small'}*/}
              {/*    icon={<EditOutlined />}*/}
              {/*  />*/}
              {/*</Col>*/}
            </Row>
          </Col>
        </Row>
      )}
    />
  );
};

export default PublicServices;
