import React from 'react';
import SettingsForm from './settingsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import settings from '../../assets/images/download.png'


const Settings = () => {
  return (
    <div className='m-0'>
        <div className='flex items-center gap-10'>
            <img src={settings} alt="setting icon" className='w-100'/>
        <div>
            <h1>Settings</h1>
        <h2>Manage your account settings and preferences</h2>
        </div>
        </div>
        <div className='bg-white h-full'>
        <SettingsForm/>

        </div>
    </div>
  )
}

export default Settings
