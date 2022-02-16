import React from 'react';
import {HeaderContainer, Search, ProfileUser, Notifications} from "./style";
import {search, notifications, notificationsBellFull } from "../../pages/ConstantsIcons";

const Header = () => {
  return (
    <HeaderContainer className="">
      <Search className="flex items-center">
        <div dangerouslySetInnerHTML={{__html: search}} className="p-r-15"/>
        <div>Поиск...</div>
      </Search>
      <div className="flex items-center">
        <Notifications className="flex items-center">
          <div dangerouslySetInnerHTML={{__html: notifications}} className="p-r-16"/>
          <div dangerouslySetInnerHTML={{__html: notificationsBellFull}} className="p-r-24"/>
        </Notifications>
        <ProfileUser className="flex items-center p-l-24">
          <div className="p-r-8">Анна Иванова</div>
          <img src="/assets/profile_photo.png" alt=""/>
        </ProfileUser>
      </div>
    </HeaderContainer>
  );
};

export default Header;
