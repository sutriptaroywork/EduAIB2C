import axios from "axios";
import { getCookie } from "cookies-next";

const createApiInstance = (headers) => {
  // headers['Access-Control-Allow-Origin'] = "*"
  // headers['Access-Control-Allow-Headers'] = "*"
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME,
    headers
  });
  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  });

  return instance;
};

const createApiInstanceLogin = (headers) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME,
    headers
  });
  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });
  return instance;
};

const apiInstance = () => {
  if (typeof window === "undefined") {
    console.log('window undefined')
    return createApiInstance({
      'Content-Type': 'application/json',
      'Origin': 'http://shikshaml.com'
    });
  }
  const token = localStorage.getItem('userToken');
  const gToken = getCookie("gToken")
  const googleToken = getCookie("googleToken")
  if (token || gToken || googleToken) {
    console.log('token')
    return createApiInstance({
      'Content-Type': 'application/json',
      'Origin': 'http://shikshaml.com',
      gToken: gToken,
      googleToken: googleToken,
      Authorization: `Bearer ${googleToken ? googleToken : gToken ? gToken : token}`
    });
  } else {
    console.log('token else')
    return createApiInstance({
      'Content-Type': 'application/json',
      'Origin': 'http://shikshaml.com'
    });
  }

};

const apiInstanceLogin = () => {
  // if (typeof window === "undefined") {
  //   return createApiInstanceLogin({
  //     'Content-Type': 'application/json',
  //   });
  // }

  // const token = localStorage.getItem('userToken');
  // return createApiInstanceLogin({
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${token}`
  // });
  return createApiInstanceLogin({
        'Content-Type': 'application/json',
      });
};

const apiInstanceFormData = () => {
    if (typeof window === "undefined") {
      return axios.create({
        baseURL: process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME,
        headers: {
          // 'Content-Type': 'multipart/form-data',
        }
      });
    }
  
    const token = localStorage.getItem('accessToken');
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
  };


export const logoutUser = async () => {
  localStorage.clear();
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  const response = {
    status: 200,
    message: "Logout successful",
  };
  if (response.status === 200) {
    window.location.href = '/login'; // Corrected line
  }
  return response;
};

export const fetchAdvSearchData = async (payload) => {
  const apiUrl = !payload?.query? `/dashboard/advsearch`: `/dashboard/advsearch?keyword=${payload.query}`;
  const response = await apiInstance().post(apiUrl,payload.postData);
  return response;
};

export const fetchSearchData = async (payload) => {
  const apiUrl = !payload?.query? `/dashboard/search`: `/dashboard/search?keyword=${payload.query}`;
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchSummData = async (payload) =>{
  const response  = await apiInstance().post(`/dashboard/summary/fetchContent`,payload.postData)
  return response
}

export const fetchGreetingData = async () => {
  const apiUrl = '/dashboard/greetings';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchWeeklyData = async () => {
  const apiUrl = '/dashboard/hoursspent';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchProgressData = async () => {
  const apiUrl = '/dashboard/overallperformance';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchUserData = async () => {
  const apiUrl = '/dashboard/profile';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchTodoData = async () => {
  const apiUrl = '/dashboard/todo';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchReminderData = async () => {
  const apiUrl = '/dashboard/reminder';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchEventData = async () => {
  const apiUrl = '/dashboard/events';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchStickyData = async (payload) => {
  const apiUrl = '/dashboard/stickynotes';
  const response = await apiInstance().post(apiUrl,payload.postData);
  return response;
};

// summary api's
export const fetchChatBotDataApi = async (payload)=>{
  const apiUrl =`/dashboard/chatbot?assignedCode=${payload.assignedCode}`
  const response = await apiInstance().post(apiUrl,payload?.postData ? payload.postData : {})
  return response
}

export const fetchChatBotRecommendationApi = async (payload)=>{
  const apiUrl =`/dashboard/chatbot/recommendation`
  const response = await apiInstance().post(apiUrl,payload?.postData)
  return response
}


export const fetchPdfSummaryApi = async (payload) => {
  const apiUrl =`/dashboard/summary?assignedCode=${payload.assignedCode}`
  const response = await apiInstance().post(apiUrl,JSON.stringify({}))
  return response
}

export const fetchChatBotSuggestionDataApi = async (payload) => {
  const apiUrl =`/dashboard/chat_questions?assignedCode=${payload.assignedCode}`
  const response = await apiInstance().get(apiUrl)
  return response
}
export const fetchInstituteData = async (state,city) => {
  const apiUrl = `/dashboard/institute?state=${state}&city=${city}`;
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const postProfileData = async (payload) => {
  const apiUrl = '/profileupload';
  const response = await apiInstance().post(apiUrl,payload);
  return response;
};

export const changePassword = async (payload) => {
  const apiUrl = '/settings/changepassword';
  const response = await apiInstance().post(apiUrl,payload);
  return response;
};

export const fetchNotificationData = async () => {
  const apiUrl = '/settings/notification';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const postNotification = async (payload) => {
  const apiUrl = '/settings/notification';
  const response = await apiInstance().post(apiUrl,payload);
  return response;
};

export const fetchReferalCreditData = async () => {
  const apiUrl = '/referral/credits';
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const postChatBotData = async (assignedCode,payload) => {
  const apiUrl = `/dashboard/chatbot?assignedCode=${assignedCode}`;
  const response = await apiInstance().post(apiUrl,payload);
  return response;
};

export const postPdfSummary = async (assignedCode,payload) => {
  const apiUrl = `/dashboard/summary?assignedCode=${assignedCode}`;
  const response = await apiInstance().post(apiUrl,payload);
  return response;
};

export const getChatBotSuggestionData = async (assignedCode) => {
  const apiUrl = `/dashboard/chat_questions?assignedCode=${assignedCode}`;
  const response = await apiInstance().get(apiUrl);
  return response;
};

export const fetchEasyQuestionData = async (assignedCode) => {
  const apiUrl = `/dashboard/qna?assignedCode=${assignedCode}&level=easy`;
  const response = await apiInstance().get(apiUrl);
  return response;
};
export const fetchMedQuestionData = async (assignedCode) => {
  const apiUrl = `/dashboard/qna?assignedCode=${assignedCode}&level=medium`;
  const response = await apiInstance().get(apiUrl);
  return response;
};
export const fetchHardQuestionData = async (assignedCode) => {
  const apiUrl = `/dashboard/qna?assignedCode=${assignedCode}&level=hard`;
  const response = await apiInstance().get(apiUrl);
  return response;
};
// token Api
export const getTokenPlansApi = async () => {
  const response = await apiInstance().get(`/token/plans`)
  return response
}

export const getTotalTokenTillNowAPi = async (payload) => {
  if (payload) {
    const response = await apiInstance().get(`/token/token_usage?year=${payload.year}&month=${payload.month}`)
    return response
  }
  const response = await apiInstance().get(`/token/token_usage`)
  return response
}

export const checkCoupanCode = async (payload) => {
  const response = await apiInstance().post(`/token/couponverify`, payload )
  return response
}

export const loginWithCredentials = async (credentials) => {
  const response = await apiInstanceLogin().post(`/login`, credentials);
  return response;
};

export const browserClose = async () =>{
  const response  = await apiInstance().get(`/dashboard/browserclose`)
  return response
}

export const postSubscriptionUser = async (payload) => {
  const response = await apiInstanceLogin().post("/dashboard/subscribe",payload);
  return response;
 };



 export const fetchMaintenanceApi = async () => {
  const response = await apiInstance().get(`/application/maintenance`);
  console.log('response > ', response)
  return response;
};