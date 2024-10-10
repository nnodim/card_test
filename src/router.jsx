import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AccountSetting from "./components/account/AccountSetting.jsx";
import Cards from "./components/account/Cards.jsx";
import Profile from "./components/account/Profile.jsx";
import { Checkout } from "./components/card/Checkout.jsx";
import { PersonaliseCard } from "./components/card/PersonaliseCard.jsx";
import { Preview } from "./components/card/Preview.jsx";
import { PersistLogin } from "./components/PersistLogin.jsx";
import { RequireAuth } from "./components/RequireAuth.jsx";
import { AccountLayout } from "./layouts/AccountLayout.jsx";
import { AppLayout } from "./layouts/AppLayout.jsx";
import { AuthLayout } from "./layouts/AuthLayout.jsx";
import { HomeLayout } from "./layouts/HomeLayout.jsx";
import {
  ACCOUNT,
  ADMINFORGETPASSWORD,
  ADMINLOGIN,
  BUNDLECHECKOUT,
  CARD,
  CARD_CHECKOUT,
  CARD_PREVIEW,
  CARD_SIGN,
  DASHBOARD,
  DEMO,
  EDIT_CARD,
  EMAIL_SENT,
  EXPLORE,
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  NOT_FOUND,
  OURSTORY,
  PRICING,
  PRIVACY,
  RESET_PASSWORD,
  SIGNUP,
  TERMS_OF_USE,
  VERIFY_EMAIL,
  VIEW_CARD
} from "./lib/routes.js";
import { EmailSent } from "./pages/Auth/EmailSent.jsx";
import { ForgotPassword } from "./pages/Auth/ForgotPassword.jsx";
import { Login } from "./pages/Auth/Login.jsx";
import { ResetPassword } from "./pages/Auth/ResetPassword.jsx";
import { SignUp } from "./pages/Auth/SignUp.jsx";
import { VerifyEmail } from "./pages/Auth/VerifyEmail.jsx";
import { BundleCheckout } from "./pages/BundleCheckout.jsx";
import { Demo } from "./pages/Demo.jsx";
import { EditCard } from "./pages/EditCard.jsx";
import { Explore } from "./pages/explore/Explore.jsx";
import { Sign } from "./pages/explore/Sign.jsx";
import { Home } from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import OurStory from "./pages/OurStory.jsx";
import Pricing from "./pages/Pricing.jsx";
import Privacy from "./pages/Privacy.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import { ViewCard } from "./pages/ViewCard.jsx";
import AdminForgetPassword from "./pages/admin/AdminForgetPassword.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Bundles from "./components/account/Bundles.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={HOME} element={<AppLayout />}>
      <Route element={<PersistLogin />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path={OURSTORY} element={<OurStory />} />
          <Route path={TERMS_OF_USE} element={<TermsOfUse />} />
          <Route path={PRIVACY} element={<Privacy />} />

          <Route element={<RequireAuth />}>
            <Route path={ACCOUNT} element={<AccountLayout />}>
              <Route index path="profile" element={<Profile />} />
              <Route path="my-cards" element={<Cards />} />
              <Route path="my-bundles" element={<Bundles />} />
              <Route path="setting" element={<AccountSetting />} />
            </Route>
            <Route path={BUNDLECHECKOUT} element={<BundleCheckout />} />
          </Route>
          <Route path={PRICING} element={<Pricing />} />
          <Route path={EXPLORE}>
            <Route index element={<Explore />} />
            <Route path={CARD}>
              <Route index element={<PersonaliseCard />} />
              <Route path={CARD_PREVIEW} element={<Preview />} />
              <Route path={CARD_CHECKOUT} element={<Checkout />} />
            </Route>
          </Route>
          <Route path={CARD_SIGN} element={<Sign />} />
          <Route path={EDIT_CARD} element={<EditCard />} />
          <Route path={DEMO} element={<Demo />} />
          <Route
            path={NOT_FOUND}
            element={<NotFound text={"Page Not Found"} />}
          />
          <Route path={VERIFY_EMAIL} element={<VerifyEmail />} />
          <Route path={VIEW_CARD} element={<ViewCard />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={LOGIN} element={<Login />} />
          <Route path={SIGNUP} element={<SignUp />} />
          <Route path={EMAIL_SENT} element={<EmailSent />} />
          <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route path={ADMINLOGIN} element={<AdminLogin />} />
        <Route path={ADMINFORGETPASSWORD} element={<AdminForgetPassword />} />

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path={DASHBOARD} element={<Dashboard />} />
        </Route>

      </Route>
    </Route>
  )
);

export default router;
