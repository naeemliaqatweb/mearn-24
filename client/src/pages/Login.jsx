import { useState } from "react"
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
export const Login = () => {
    
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const [user, setUser] = useState({
        email: "",
        password: "",

    });

    const handleInput = (e) => {
        console.log(e);

        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    }

    const SubmitForm = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:5000/api/auth/login` , {
              method : "POST",
              headers : {
                  "Content-Type" : "application/json"
              },
              body : JSON.stringify(user)
          });
          const res_data = await response.json();
          console.log('login response json :' , res_data);
          
          if(response.ok)
            {
            storeTokenInLS(res_data.token);
            // alert('Login successfully!');
            toast.success("Login successfully!");
              setUser({
                  email: "",
                  password: "",
              });
              navigate("/");
          }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            // alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
          }
          console.log(response);
          
      } catch (error) {
          console.log("register error", error);
          
      }

    }

    return <>
           <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />
                <form onSubmit={SubmitForm}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                        onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                        onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
}