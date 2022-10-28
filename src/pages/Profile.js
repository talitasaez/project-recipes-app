import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile() {
  return (
    <>
      <Header title="Profile" icons={ { profile: true, search: false } } />
      <Footer />
    </>
  );
}

export default Profile;
