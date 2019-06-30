import React from 'react';

enum Role {
  USER,
  ADMIN
}

interface User {
  username: string;
  role: Role;
}

interface ProfileProps {
  user?: User | null;
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const Profile: React.SFC<ProfileProps> = ({ user = null }) => {
  if (!user) {
    return <a>Log in</a>;
  }

  const { username, role } = user;

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
