import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  qdtEnigma, qdtCapabilityApp, qdtCompose, QdtViz,
} from 'qdt-components';

const identity = Math.random().toString(32).substr(2, 8);

const config = {
  host: 'qap.sebrae.com.br',
  secure: true,
  port: 443,
  prefix: '',
  appId: 'd183a25e-de1d-47a0-b2a0-459dfbbc20d1',
  // d183a25e-de1d-47a0-b2a0-459dfbbc20d1
  identity,
};

const engineApiAppPromise = qdtEnigma(config);
const capabilityApiAppPromise = qdtCapabilityApp(config);

function QdtComponent({
  component, properties, options, appIndex,
}) {
  const elementRef = useRef(null);

  const init = async () => {
    let app = await engineApiAppPromise;
    if (appIndex === 2) {
      app = await capabilityApiAppPromise;
      QdtViz({
        element: elementRef.current,
        app,
        options,
      });
    } else {
      qdtCompose({
        element: elementRef.current,
        component,
        app,
        properties,
        options,
      });
    }
  };

  useEffect(() => {
    if (elementRef) init();
  }, [init]);

  return (
    <div ref={elementRef} />
  );
}

QdtComponent.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  properties: PropTypes.object,
  options: PropTypes.object,
  appIndex: PropTypes.number,
};
QdtComponent.defaultProps = {
  component: null,
  properties: {},
  options: {},
  appIndex: 1,
};

export default QdtComponent;
