import React, { useEffect, useContext, useState } from 'react';
import {
  Layout,
  Avatar,
  Divider,
  Input,
  Rate,
  Modal,
  Button,
  notification,
} from 'antd';
import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../profiles/GroomerProfile/groomer.css';
import PublicServices from './GroomerPublicServices';
import './GroomerPublicProfile.scss';
// context imports
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { APIContext } from '../../../state/contexts/APIContext';
import ApptModal from '../../forms/GroomerProfileForm/ApptModal';
import { useOktaAuth } from '@okta/okta-react';

const GroomerPublicProfile = props => {
  const pathway = props.props.match.params.id;
  // context state
  const { groomer, ratingAverage } = useContext(GroomersContext);
  const { authState } = useOktaAuth();

  const {
    getGroomerByID,
    getGroomerRatingAverageByID,
    getGroomerRatingCountByID,
    postRating,
    postFavorite,
  } = useContext(APIContext);

  const { TextArea } = Input;

  const def = parseInt(ratingAverage.avg);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [follow, setFollow] = useState(0);
  const [payload, setPayload] = useState({ rate: 0, comment: '' });
  const desc = ['terrible', 'bad', 'average', 'good', 'wonderful'];

  const ratingChange = value => {
    setFollow(value);
    setPayload({ ...payload, rate: value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (payload.rate > 0) {
      return (postRating(pathway, payload), openNotification())
    } else {
      return failedNotification();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const failedNotification = () => {
    notification.open({
      message: 'Review failed!',
      description: 'Please fill out the review rating, comment optional.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const openNotification = () => {
    notification.open({
      message: 'Review sent!',
      description: 'Thanks for leaving a review, it means a lot!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  useEffect(() => {
    getGroomerByID(pathway);
    getGroomerRatingAverageByID(pathway);
    getGroomerRatingCountByID(pathway);
    postFavorite(authState, pathway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathway]);

  if (groomer) {
    var groomerHours = JSON.parse(groomer.hours);

    if (groomerHours === null) {
      groomerHours = {
        sunday: { open: 'CLOSED', close: '' },
        monday: { open: 'CLOSED', close: '' },
        tuesday: { open: 'CLOSED', close: '' },
        wednesday: { open: 'CLOSED', close: '' },
        thursday: { open: 'CLOSED', close: '' },
        friday: { open: 'CLOSED', close: '' },
        saturday: { open: 'CLOSED', close: '' },
      };
    }

    return (
      <div className="groomer-public-box">
        <Layout.Content
          style={{
            background: 'white',
            width: '75%',
            margin: '20px auto',
            padding: '2%',
          }}
        >
          <div className="customer-header">
            <p className="heading" style={{ margin: '1rem' }}>
              {groomer.business_name}
            </p>
            <ApptModal props={props} />
            <Button
              onClick={() => {
                postFavorite(groomer.user_id);
              }}
            >
              Favorite this Groomer!
            </Button>
            <div className="rating">
              <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <Rate
                      allowHalf
                      style={{ paddingRight: '12px' }}
                      defaultValue={def}
                      value={parseFloat(ratingAverage.avg)}
                      disabled
                    />
                    <span style={{ fontSize: '1rem' }}>
                      {ratingAverage.avg === null
                        ? ''
                        : parseInt(ratingAverage.avg) + '/5'}
                    </span>
                  </div>
                  <Button type="primary" onClick={showModal}>
                    Leave a review
                  </Button>
                </div>
                <Modal
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okText="Submit Review"
                  title={<span className="groomer-one">E G</span>}
                >
                  <p>Your Review for: {`${groomer.business_name}`}</p>
                  <Rate
                    allowHalf
                    style={{ marginBottom: '1rem' }}
                    tooltips={desc}
                    defaultValue={def}
                    value={follow}
                    onChange={ratingChange}
                  />
                  <TextArea
                    onChange={e => {
                      setPayload({ ...payload, comment: e.target.value });
                    }}
                    showCount
                    placeholder={'(Optional)'}
                    type={payload.comment}
                    maxLength={180}
                  />
                </Modal>
              </div>
            </div>
            <div className="avatar">
              <Avatar size={74} icon={<UserOutlined />} />
              <p>
                {' '}
                {groomer.given_name} {groomer.family_name}{' '}
              </p>
            </div>
          </div>
          <div className="customer-info-box">
            <div className="top-info-box">
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>About</Divider>
                <div className="panel-info">
                  <p>{groomer.about}</p>
                </div>
              </div>
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>Services</Divider>
                <div className="panel-info">
                  <PublicServices />
                </div>
              </div>
            </div>
            <div className="bottom-info-box">
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>Location</Divider>
                <div className="panel-info">
                  <p>Address: {groomer.address}</p>
                  <p>City: {groomer.city}</p>
                  <p>State: {groomer.state}</p>
                  <p>Zip Code: {groomer.zip_code}</p>
                  <p>Country: {groomer.country}</p>
                </div>
              </div>
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>Hours</Divider>
                <div className="panel-info">
                  <p>
                    Sunday: {groomerHours.sunday.open}{' '}
                    {groomerHours.sunday.close}
                  </p>
                  <p>
                    Monday: {groomerHours.monday.open}{' '}
                    {groomerHours.monday.close}
                  </p>
                  <p>
                    Tuesday: {groomerHours.tuesday.open}{' '}
                    {groomerHours.tuesday.close}
                  </p>
                  <p>
                    Wednesday: {groomerHours.wednesday.open}{' '}
                    {groomerHours.wednesday.close}
                  </p>
                  <p>
                    Thurday: {groomerHours.thursday.open}{' '}
                    {groomerHours.thursday.close}
                  </p>
                  <p>
                    Friday: {groomerHours.friday.open}{' '}
                    {groomerHours.friday.close}
                  </p>
                  <p>
                    Saturday: {groomerHours.saturday.open}{' '}
                    {groomerHours.saturday.close}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout.Content>
      </div>
    );
  } else if (!groomer) {
    return (
      <div>
        <p>Loading component..</p>
      </div>
    );
  }
};

export default GroomerPublicProfile;
