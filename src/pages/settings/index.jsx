import React from 'react';
import SettingsForm from './settingsForm';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import settings from '../../assets/images/download.png'


const Settings = () => {
  const {step}= useParams();
  console.log(step);

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
        <SettingsForm step= {step}/>

        </div>
    </div>
  )
}

export default Settings
