"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getCheckoutUrl } from "./stripePayment";
import type { FirebaseApp } from "firebase/app";

async function getPremiumStatus(app: FirebaseApp) {
  const user = getAuth(app).currentUser;
  if (!user) return false;

  const subscriptions = await getDocs(
    collection(getFirestore(app), "customers", user.uid, "subscriptions"),
  );

  return subscriptions.docs.some((subscription) => {
    const status = subscription.data().status;
    return status === "active" || status === "trialing";
  });
}

export default function AccountPage() {
  const app = getApp();
  const auth = getAuth(app);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  const upgradeToPremium = async () => {
    const priceId = "price_1UdESr8X5N6qFuVwAAtYzUd5";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium");
  };

  const manageSubscription = async () => {
    const priceId = "price_1UdEbr8X5N6qFuVwb3Ax6sQO";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Manage Subscription");
  };

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  const upgradeToPremiumButton = (
    <button
      onClick={upgradeToPremium}
      className="bg-blue-600 p-4 px-6 text-lg rounded-lg hover:bg-blue-700 shadow-lg"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Upgrade To Premium
      </div>
    </button>
  );

  const managePortalButton = (
    <button
      onClick={manageSubscription}
      className="bg-blue-600 p-4 px-6 text-lg rounded-lg hover:bg-blue-700 shadow-lg"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Manage Subscription
      </div>
    </button>
  );

  const signOutButton = (
    <button
      onClick={signOut}
      className="hover:underline text-slate-500 hover:text-slate-300 text-lg text-center"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Sign Out
      </div>
    </button>
  );

  const accountSummary = (
    <div>
      <div className="text-slate-500 mb-1">Signed in as {userName}</div>
      <div className="text-slate-300 text-xl">{email}</div>
    </div>
  );

  const PremiumPanel = () => (
    <div className="text-lg">Premium Member</div>
  );

  const StandardPanel = () => (
    <div className="text-lg">Standard Member</div>
  );

  const statusPanel = isPremium ? <PremiumPanel /> : <StandardPanel />;
  const memberButton = isPremium ? managePortalButton : upgradeToPremiumButton;

  return (
    <div className="flex flex-col gap-8">
      {accountSummary}
      {statusPanel}
      {memberButton}
      {signOutButton}
    </div>
  );
}