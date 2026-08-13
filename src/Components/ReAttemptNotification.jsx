import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useBuyerNotifications, useMarkNotificationRead } from "@/Hooks/buyer/useBuyerNotifications";
import useAuthProfile from "@/Hooks/useAuthProfile";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

/**
 * Invisible component that sits in the buyer dashboard layout.
 * Polls for unread re-attempt approval notifications and shows
 * a SweetAlert popup for each one.
 */
const ReAttemptNotification = () => {
  const { user } = useContext(AuthContext);
  const { dbUser } = useAuthProfile(user);
  const shownIds = useRef(new Set());

  const { data: notifications = [] } = useBuyerNotifications();
  const markRead = useMarkNotificationRead();

  useEffect(() => {
    if (!notifications.length || dbUser?.role !== "buyer") return;

    const unshown = notifications.filter(
      (n) => !shownIds.current.has(n._id.toString())
    );

    if (!unshown.length) return;

    // Show them one by one, sequentially
    const showNext = async (index) => {
      if (index >= unshown.length) return;

      const notification = unshown[index];
      shownIds.current.add(notification._id.toString());

      await Swal.fire({
        title: "🎉 Second Chance Granted!",
        html: `
          <div style="text-align:left; line-height:1.6;">
            <p style="margin-bottom:12px;">${notification.message}</p>
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:12px; margin-top:8px;">
              <p style="font-weight:600; color:#166534; margin:0 0 6px;">Before you pay, make sure:</p>
              <ul style="color:#166534; margin:0; padding-left:18px;">
                <li>Your payment card/mobile banking details are correct</li>
                <li>You have sufficient balance</li>
                <li>Your internet connection is stable</li>
              </ul>
            </div>
          </div>
        `,
        icon: "success",
        confirmButtonText: "Got it, I'll pay now!",
        confirmButtonColor: "#16a34a",
        allowOutsideClick: false,
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
        },
      });

      // Mark as read after user acknowledges
      markRead.mutate(notification._id.toString());

      // Show next notification if any
      showNext(index + 1);
    };

    showNext(0);
  }, [notifications, dbUser?.role]);

  return null; // This component renders nothing visually
};

export default ReAttemptNotification;
