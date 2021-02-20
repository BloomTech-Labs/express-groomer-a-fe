import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, List, Row } from 'antd';
import { useOktaAuth } from '@okta/okta-react';
// context imports
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { APIContext } from '../../../state/contexts/APIContext';
import { DeleteOutlined } from '@ant-design/icons';
import { UsersContext } from '../../../state/contexts/UsersContext';

const Services = props => {
  const { authState } = useOktaAuth();

  // context state
  const { userInfo } = useContext(UsersContext);
  const { groomerServices, servicesUpdated, setServicesUpdated } = useContext(
    GroomersContext
  );
  const { getGroomerServicesByID, deleteService } = useContext(APIContext);
  const pathway = useParams();

  useEffect(() => {
    let id = '';
    if (userInfo) {
      id = userInfo.sub;
    } else if (pathway) {
      id = pathway;
    }

    getGroomerServicesByID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesUpdated]);

  const deleteGroomerService = async service => {
    await deleteService(authState, service);
    setServicesUpdated(!servicesUpdated);
  };
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
              <Col style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                <Button
                  type="primary"
                  shape="circle"
                  size={'small'}
                  icon={<DeleteOutlined />}
                  onClick={() => deleteGroomerService(item)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    />
  );
};

export default Services;
