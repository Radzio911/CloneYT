import Navbar from "../componet/molecules/Navbar";
import Video, { VideoGrid } from "../componet/molecules/Video";
import { useState, useEffect } from "react";
import Channel from "../componet/molecules/Channel.js";
import { getSubscriptionUsers, setSubscription } from "../api";

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const refresh = () => {
    getSubscriptionUsers().then((s) => setSubscriptions(s));
  };

  useEffect(refresh, []);

  const handleUnsubscribe = (id) => {
    console.log(id);
    setSubscription(id, false).then(() => {
      refresh();
    });
  };

  return (
    <>
      <Navbar />
      <div>
        {subscriptions.map((sub) => (
          <Channel
            userId={sub.user._id}
            create_at={new Date(sub.create_at)}
            profile_image={sub.user.profile_image}
            subscriptions={sub.user.subscriptions}
            username={sub.user.username}
            onUnsubscribe={handleUnsubscribe}
          />
        ))}
      </div>
    </>
  );
};

export default SubscriptionsPage;
