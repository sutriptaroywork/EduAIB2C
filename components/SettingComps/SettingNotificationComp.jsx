import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationData, postNotification } from "../../redux/slices/settingSlice";

const data = [
  {
    id: 1,
    title: "Email Notification",
    subTitle:
      "Get emails to find out what’s going on when you’re not offline. You can turn this off.",
    isActive: true,
  },
  {
    id: 2,
    title: "Subscription Notification",
    subTitle:
      "Stay informed and never miss an update with our subscription notification service.",
    isActive: true,
  },
  {
    id: 3,
    title: "Courses Notification",
    subTitle:
      "Unlock endless learning opportunities with our courses notification service.",
    isActive: true,
  },
  {
    id: 4,
    title: "Events Notification",
    subTitle:
      "Discover, engage, and be part of every event with our notifications.",
    isActive: true,
  },
  {
    id: 5,
    title: "Feedback Notification",
    subTitle:
      "Empower your voice and shape our future with feedback and survey notifications.",
    isActive: true,
  },
];

function SettingNotificationComp() {
  const dispatch = useDispatch()
  const [apiData, setApiData] = useState(data);
  const res = useSelector((state) => state.settingSlice);
  const respData = res?.notificationData?.data
  const notificationData = res?.postNotification?.data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await dispatch(fetchNotificationData())
      if (respData) {
        if (respData[0].notifications.length > 0) {

          let temp = [...apiData];
          respData[0].notifications.map((item) => {
            if (item.type == "email") {
              temp[0].isActive = item.isActive;
            } else if (item.type == "subscription") {
              temp[1].isActive = item.isActive;
            } else if (item.type == "courses") {
              temp[2].isActive = item.isActive;
            } else if (item.type == "events") {
              temp[3].isActive = item.isActive;
            } else if (item.type == "feedback") {
              temp[4].isActive = item.isActive;
            } else {

            }
          });

          setApiData(temp);
        } else {
          setApiData(data);
        }
      } else {
      }
    } catch (error) {
    }
  };

  const handleCheckboxChange = async (id, status) => {
    if (id) {
      let postData = {
        isActive: !status,
      };
      let temp = [...apiData];

      if (id == 1) {
        postData.type = "email";

      } else if (id == 2) {
        postData.type = "subscription";
      } else if (id == 3) {
        postData.type = "courses";
      } else if (id == 4) {
        postData.type = "events";
      } else {
        postData.type = "feedback";
      }
      temp[id - 1].isActive = !status

      try {
        await dispatch(postNotification(JSON.stringify(postData)));
        if (notificationData) {
          setApiData(temp)
          toast.success(notificationData?.message);
        }
      } catch (error) {
      }
    }
  };

  return (
    <div className="container">
      {apiData.map((item) => (
        <div className="noti-box" key={item._id}>
          <div className="content">
            <div className="title">
              {item.title}
              <div className="sub-title">{item.subTitle}</div>
            </div>
          </div>
          <div className="toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={item.isActive}
                onClick={() => handleCheckboxChange(item.id, item.isActive)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SettingNotificationComp;
