import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { GroomersContext } from '../../state/contexts/GroomersContext';
import { APIContext } from '../../state/contexts/APIContext';
import { Button, Col, Row } from 'antd';
import { ScissorOutlined } from '@ant-design/icons';
import '../../styles/GroomerMap.css';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const GroomerMap = () => {
  const history = useHistory();
  const { allGroomers } = useContext(GroomersContext);
  const { getGroomers } = useContext(APIContext);
  const [selectedGroomer, setSelectedGroomer] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 40.7,
    longitude: -74.0,
    width: '800px',
    height: '500px',
    zoom: 3,
  });

  useEffect(() => {
    getGroomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedGroomer(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const handleGroomerClick = () => {
    history.push(`/groomer-search-results/${selectedGroomer.user_id}`);
  };

  return (
    <>
      <h2 className={'map-heading'}>
        Use the locator button to zoom to your location
      </h2>
      <Row justify={'center'} className={'map-container'}>
        <Col>
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
            onViewportChange={viewport => {
              setViewport(viewport);
            }}
          >
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            {allGroomers &&
              allGroomers.map(groomer => {
                return (
                  <Marker
                    key={groomer.id}
                    latitude={groomer.lat}
                    longitude={groomer.lng}
                  >
                    <Button
                      icon={<ScissorOutlined />}
                      type={'primary'}
                      className={'marker-btn'}
                      onClick={e => {
                        e.preventDefault();
                        setSelectedGroomer(groomer);
                      }}
                    >
                      {groomer.business_name}
                    </Button>
                  </Marker>
                );
              })}
            {selectedGroomer ? (
              <Popup
                latitude={selectedGroomer.lat}
                longitude={selectedGroomer.lng}
                onClose={async () => {
                  // awaiting the timeout to give the button a chance to
                  // push to groomer info page before resetting selected groomer
                  await setTimeout(() => {
                    setSelectedGroomer(null);
                  }, 1000);
                }}
              >
                <div>
                  <h2>{selectedGroomer.business_name}</h2>

                  <h3>
                    {selectedGroomer.address}
                    <br /> {selectedGroomer.city}, {selectedGroomer.state}{' '}
                    {selectedGroomer.zip_code}
                  </h3>
                  <h3>{selectedGroomer.email}</h3>
                  <h3>{selectedGroomer.phone_number}</h3>
                  <Button type={'primary'} onClick={handleGroomerClick}>
                    Go
                  </Button>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </Col>
      </Row>
    </>
  );
};

export default GroomerMap;
