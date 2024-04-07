import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SettingNotificationComp from './SettingNotificationComp';
import SettingSubscriptionComp from './SettingSubscriptionComp';
import SettingReferComp from './SettingReferComp';
import SettingProfileComp from './SettingProfileComp';
import SettingSupportComp from './SettingSupportComp';
import SettingChangePasswordComp from './SettingChangePasswordComp';

const SettingComponent = () => {
  const [activeTab, setActiveTab] = useState('pro-setting');
  const userLoading = useSelector((state) => state.userData.isLoading);

  const tabs = [
    { id: 'pro-setting', label: 'Profile Setting', testId: 'profile_setting', component: <SettingProfileComp /> },
    { id: 'ch-pass', label: 'Change Password', testId: 'change_password', component: <SettingChangePasswordComp /> },
    { id: 'noti', label: 'Notification', testId: 'notification', component: <SettingNotificationComp /> },
    // { id: 'subs', label: 'Subscription', testId: 'subscription', component: <SettingSubscriptionComp /> },
    { id: 'help', label: 'Help and Support', testId: 'help_support', component: <SettingSupportComp /> },
    { id: 'earn', label: 'Earn & Refer', testId: 'Earn_refer', component: <SettingReferComp /> }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  if (userLoading) {
    return (
      <div className="bg-white z-50 h-[75vh] w-[80vw] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="lyt-section form-section">
      <div className="bs-tabs setting">
        <div className="tab-buttons">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-testid={tab.testId}
              className={`tab-button !text-sm !2xl:text-xl ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tabs.filter(tab => tab.id === activeTab).map(tab => (
            <div key={tab.id} data-testid={`tab-${tab.id}`} className="tab active">
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SettingComponent;
