import React from 'react';

enum Role {
  USER,
  ADMIN
}

interface User {
  username: string;
  role: Role;
}

function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(cname: string) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__username">{getCookie('login')}</div>
      <div className="profile__profile-icon" />
      <div
        className="profile__logout-icon"
        onClick={() => {
          deleteCookie('login');
          deleteCookie('token');
          window.location = '/';
        }}
      />
    </div>
  );
};

export { Profile, Role };
