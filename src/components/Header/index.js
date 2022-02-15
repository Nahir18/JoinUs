import React from 'react';
import {HeaderContainer, Search, ProfileUser, Notifications} from "./style";
import {Trash} from "../../pages/Constants";

const Header = () => {
  return (
    <HeaderContainer className="">
      <Search className="flex items-center">
        <img src="/assets/icons/search.svg" alt="" className="p-r-15"/>
        <div>Поиск...</div>
      </Search>
      <div className="flex items-center">
        <Notifications className="flex items-center">
          <button
            className="trash-icon ml-7"
            dangerouslySetInnerHTML={{__html: Trash}}
          />
          <img src="/assets/icons/notifications.svg" alt="" className="p-r-16"/>
          <img src="/assets/icons/notificationsBellFull.svg" alt="" className="p-r-24"/>
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
