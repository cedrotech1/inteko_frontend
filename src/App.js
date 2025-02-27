
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components from the landing pages
import Home from "./pages/landing/home";
import Login from "./pages/landing/login";
import NotFound from './pages/landing/notfound';
import Logout from './pages/landing/logout';
import Statistics1 from './components/statistics';




// Importing components from the Admin resto pages
import Dasha from "./pages/Admin/homePage";
import Statisticsa from "./pages/Admin/statistics";
import Setting from "./pages/Admin/user-profile";
import OurCate from "./pages/Admin/categoryPage";





import Notifications from "./pages/Admin/notifications";
import OtherProfile from "./pages/Admin/other_user-profile";

import Forgot from "./pages/landing/reset";
import Code from "./pages/landing/code";
import ResetPassword from "./pages/landing/resetPassword";
import PostPage from "./pages/Admin/postPage";





// Main App component
function App() {
  return (
    // Set up the BrowserRouter for handling routes
    <BrowserRouter>
      {/* Define the routes using the Routes component */}
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/login" element={<Login />} exact={true} />
        <Route path="/logout" element={<Logout />} exact={true} />
        <Route path="/Statistics1" element={<Statistics1 />} exact={true} />
        <Route path="/forgot" element={<Forgot />} exact={true} />
        <Route path="/code/:email" element={<Code/>} exact={true} />
        <Route path="/resetPassword/:email" element={<ResetPassword/>} exact={true} />
        <Route path="*" element={<NotFound />} />

        {/* Admin Resto Pages */}
        <Route path="/dashboard" element={<Dasha />} exact={true} />
        <Route path="/dashboard" element={<Statisticsa />} exact={true} />
        <Route path="/settings" element={<Setting />} exact={true} />
        <Route path="/categories" element={<OurCate/>} exact={true} />


       
        <Route path="/notifications" element={<Notifications/>} exact={true} />
        <Route path="/post" element={<PostPage/>} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export    OurResto
export default App;
