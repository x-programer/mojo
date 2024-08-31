import { useState } from 'react'
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

function App() {
  const [profile, setProfile] = useState('');
  const [accessToken, setAccesstoken] = useState();
  const [userID, setUserID] = useState();

  const handleLogout = () => {
    // FB.logout() to log the user out
    FB.logout(() => {
      console.log('User logged out');
      setProfile(''); // Clear profile data
    });
  };

  const getUserPages = async (userId , userAccessToken) => {
    try {
      const resp = await fetch(`https://graph.facebook.com/${userId}/accounts?access_token=${userAccessToken}`);
      const data = await resp.json();
      if (data.data) {
        console.log("User Pages:", data);
      } else {
        console.log("No data object found in this response.");
      }
    } catch (error) {
      console.log("Error during fetching page data:", error);
    }
  };
  

  const responseFacebook = (response) => {
    console.log("Request aai");
    // console.log("full resoonse : "+ JSON.stringify(response , null ,2));
    if (response.data) {
      console.log("Data object:", response.data); // Log the data object to see its structure
      if (response.data.accessToken) {

        console.log("User Id:", response.data.userID);

        setUserID(response.data.userID);
        console.log("Access Token:", response.data.accessToken);
        //user pages..
        getUserPages(response.data.userID , response.data.accessToken);
        setAccesstoken(response.data.accessToken);
        setProfile(response.data);

      } else {
        console.error("No accessToken found in the data object.");
      }
    } else {
      console.error("No data object found in the response.");
    }
  };


  return (
    <>
      {accessToken}
      <br />
      <LoginSocialFacebook
        appId="2262054674005745"
        onResolve={responseFacebook}
        onReject={(error) => {
          console.log("request yaha aai hai ");
          console.log(error);
        }}

      >
        <FacebookLoginButton />
      </LoginSocialFacebook>


      {profile ? (
        <div>
          {/* Display user info */}
          <img src={profile.picture.data.url} alt="404 Not Found" />
          <h1>{profile.name}</h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#0074D9",
              color: "#FFFFFF",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        ''
      )}

    </>
  )
}

export default App
