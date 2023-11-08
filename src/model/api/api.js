import axios from 'axios';
import { getToken } from '../../localStorage';
import { enqueueSnackbar } from 'notistack';

const getApiUrl = () => {
    return import.meta.env.DEV ? 'https://qa-api.thestudioapp.com' : 'https://api.thestudioapp.com';
}

const instance = axios.create({
    baseURL: getApiUrl(),
    timeout: 30000,
});

instance.interceptors.response.use((response) => response.data, (error) => {
    // console.log('error', error);
    if(error.response.data.message || error.response.data.error) {
      enqueueSnackbar(error.response.data.message || error.response.data.error, { variant: 'error' });
    }

    if(error.response.data.message === 'User token not valid') {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      window.location.href = '/login';
    }
});

export const login = async (phoneNumber, password) => {
    return instance.post('/login', {phoneNumber, password}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    });
}

export const getUserBookedClasses = () => {
  return instance.get('/getUserBookedClasses', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}

export const getPackages = () => {
  return instance.get('/getAllPackages', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}

export const getUpcomingClasses = () => {
  return instance.get('/getUpcomingClasses', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}

export const getUserProfile = () => {
  return instance.get('/getProfile', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}

export const getRegisteredUsers = () => {
  return instance.get('/getUsers', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}

export const getClassInfo = (classDate) => {
  return instance.get('/getClassInfo', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    params: {
      classDate
    }
  });
}

export const bookClass = (params) => {
  return instance.post('/bookClass',
  {...params},
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}

export const cancelClass = (classDate, userId) => {
  return instance.post('/cancelClass',
  {
    classDate,
    userId: userId ?? undefined
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });
}

export const registerUser = ({
  phoneNumber, 
  password, 
  firstName, 
  lastName 
}) => {
  return instance.post('/register',
  {
    phoneNumber, 
    password, 
    firstName, 
    lastName 
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });
}

export const getUserInfo = (userPhoneNumber) => {
  return instance.get('/getUserInfo', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    params: {
      userPhoneNumber
    }
  });
}

export const addPackageToUser = (
  userPhoneNumber, 
  packageId,
) => {
  return instance.post('/addPackageToUser',
  {
    userPhoneNumber, 
    packageId,
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });
}

export const getUserClasses = () => {
  return instance.get('/getUserClasses', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });
}

export const editUserData = ({
  firstName,
  lastName,
}) => {
  return instance.post('/editUserData',
  {
    firstName, 
    lastName,
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });
}

export const updateUserPassword = ({
  currentPassword,
  newPassword,
}) => {
  return instance.post('/updateUserPassword',
  {
    currentPassword,
    newPassword
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });
}

export const editPackageInfo = (packageInfo) => {
  return instance.post('/editPackageInfo', packageInfo,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });
}

export const deleteUser = (userPhoneNumber) => {
  return instance.delete(`/deleteUser/${userPhoneNumber}`,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  });
}