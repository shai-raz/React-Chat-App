import app, { db } from '../firebase'
import '../css/bootstrap.min.css'
import { useRef } from 'react'

const SignUp = (props) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signUp = e => {
        e.preventDefault();
        app.auth().createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            console.log("email: " + user.user.email);
            db.collection('users')
                .doc(user.user.uid)
                .set({
                    email: user.user.email
                })
        }).catch(err => {
            console.error(err);
        });


    }

    return (
        <div id="logreg-forms">
            <form className={`form-signin`}>
                <h1 className={`h3 mb-3 font-weight-normal`}> Sign up</h1>

                <input type="email" id="inputEmail" className={`form-control`} placeholder="Email address" required="" autofocus="" ref={emailRef} />
                <input type="password" id="inputPassword" className={`form-control`} placeholder="Password" required="" ref={passwordRef} />

                <button className={`btn btn-success btn-block`} type="submit" onClick={signUp}>
                    <i className={`fas fa-sign-in-alt`}></i> Sign up
                </button>
                <hr />
                <p className={`text-center`}>Already have an account?</p>

                <button className={`btn btn-primary btn-block`} type="button" id="btn-signup" onClick={props.switchLogin}><i className={`fas fa-user-plus`}></i> Sign in</button>
            </form>

            <form action="/reset/password/" className={`form-reset`}>
                <input type="email" id="resetEmail" className={`form-control`} placeholder="Email address" required="" autofocus="" />
                <button className={`btn btn-primary btn-block`} type="submit">Reset Password</button>
                <a href="#" id="cancel_reset"><i className={`fas fa-angle-left`}></i> Back</a>
            </form>

            <form action="/signup/" className={`form-signup`}>
                <div className={`social-login`}>
                    <button className={`btn facebook-btn social-btn`} type="button"><span><i className={`fab fa-facebook-f`}></i> Sign up with Facebook</span> </button>
                </div>
                <div className={`social-login`}>
                    <button className={`btn google-btn social-btn`} type="button"><span><i className={`fab fa-google-plus-g`}></i> Sign up with Google+</span> </button>
                </div>

                <p>OR</p>

                <input type="text" id="user-name" className={`form-control`} placeholder="Full name" required="" autofocus="" />
                <input type="email" id="user-email" className={`form-control`} placeholder="Email address" required autofocus="" />
                <input type="password" id="user-pass" className={`form-control`} placeholder="Password" required autofocus="" />
                <input type="password" id="user-repeatpass" className={`form-control`} placeholder="Repeat Password" required autofocus="" />

                <button className={`btn btn-primary btn-block`} type="submit"><i className={`fas fa-user-plus`}></i> Sign Up</button>
                <a href="#" id="cancel_signup"><i className={`fas fa-angle-left`}></i> Back</a>
            </form>
            <br />
        </div>
    )
}

export default SignUp