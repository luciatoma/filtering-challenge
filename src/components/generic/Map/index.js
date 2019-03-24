import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './styles.scss';

const Map = ({ latitude, longitude, style }) => {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  const Pin = () => <Icon type="caret-down" text="My Marker" className={styles.iconPin} />;

  return (
    <div className={styles.wrapper} style={{ ...style }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAVQliqHqPPZQgv2VV68IB8Zng8021m4DI' }}
        defaultCenter={{ lat, lng }}
        defaultZoom={10}
      >
        <Pin lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Map;
