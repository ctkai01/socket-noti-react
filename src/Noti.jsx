import { getFirebaseToken, messaging } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onMessage } from "@firebase/messaging";
import axios from "axios";
import App from './App.jsx'
const url = "http://localhost:3000/api/notifications/fcm";
const Noti = () => {
    const handleFcm = async () => {
        const a = await getFirebaseToken()
        console.log(a)
        const data = {
          fcmToken: a, // Replace with your actual FCM data
        };
        await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    }

    useEffect(() => {
      const unsubscribe = onMessage(messaging, async (payload) => {
        console.log("Payload: ", payload)
        const {
          notification: { title, body },
        } = payload;
        console.log("Payload noti: ", payload);

        // if (payload.data) {
          // if (payload.data.type === NOTIFICATION_PURCHASE_COURSE_STUDENT) {
          //   try {
          //     await PaymentServiceApi.removeCartItem(payload.data.cart_item_id);
          //     dispatch(removeCartItem(payload.data.cart_item_id));
          //   } catch (e) {
          //     console.log(eval);
          //   }
          // }
        // }

        toast(
          <div className="push-notification">
            <h2 className="my-1 font-bold">{title}</h2>
            <p className="text-sm">{body}</p>
          </div>,
          {
            type: "info",
            theme: "colored",
            hideProgressBar: true,
            autoClose: 2000,
          }
        );
      });
      
      return () => {
        unsubscribe();
      };
    }, []);
    return (
      <div>
        <ToastContainer />
        <button onClick={handleFcm}>Get FCM token</button>
        <App/>
      </div>
    );
}

export default Noti;