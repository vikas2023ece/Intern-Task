import React from 'react';

function User({ user }) {
  return (
    <div>
      <h1>Welcome to {user.name}</h1>
    </div>
  );
}

export default User;