import React from 'react';
import { FormattedMessage } from 'react-intl';

function ErrorComponent() {
  return (
    <div>
      <h2>
        <FormattedMessage id="app.error.message" />
      </h2>
    </div>
  );
}

export default ErrorComponent;
