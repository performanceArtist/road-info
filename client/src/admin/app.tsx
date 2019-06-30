import React from 'react';

import CreateForm from './CreateForm/CreateForm';

const Admin = () => (
  <div className="admin">
    <h1>Admin page</h1>
    <div className="admin__create-form">
      <CreateForm />
    </div>
  </div>
);

export default Admin;
