import { useContext, useState } from 'react';
  import { AppContent } from '../context/AuthContext.jsx';
import axios from 'axios';
import api from '../utils/Api.jsx';
import { toast } from 'react-toastify';

const Header = () => {
  axios.defaults.withCredentials = true
  const { isDarkMode, loginPopUp, setloginPopUp, registerUser, loginUser } = useContext(AppContent);

  const [name, setname] = useState('')
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const [signUp, setsignUp] = useState(true)

const onSubmitHandler = async (e) => {
  e.preventDefault();
  
  console.log("🟢 1. onSubmitHandler started");

  try {
    if (signUp) {
      console.log("🟢 2. About to call registerUser with:", { name, username, email, password });
      
      // Let's run the function
      await registerUser(name, username, email, password);
      
      console.log("🟢 3. registerUser function finished running!");
    } else {
      await loginUser(email, password);
    }
  } catch (err) {
    // 🔥 If the context function crashes, this will print the exact reason!
    console.error("🔥 CRASH CAUGHT IN HEADER.JSX:", err);
  }
};


  return (
    <div className={`relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4 pt-28
  ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-900'}`}
>
      
    
      <div className={`absolute inset-0 grid grid-cols-2 md:grid-cols-6 gap-4 p-4 opacity-15 pointer-events-none filter saturate-50
        ${isDarkMode ? 'brightness-50' : 'brightness-100'}
      `}>
  
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`aspect-2/3 rounded-lg border transition-colors duration-300
            ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}
          `} />
        ))}
      </div>

   
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--tw-gradient-to))] 
        ${isDarkMode ? 'from-transparent to-zinc-950' : 'from-transparent to-neutral-50'}
      `} />


      <div className="relative z-10 text-center max-w-2xl px-4 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Where Cinephiles <span className="text-red-600">Connect.</span>
        </h2>
        <p className={`text-base md:text-lg font-medium mb-8 max-w-md ${isDarkMode ? 'text-zinc-400' : 'text-zinc-650'}`}>
          Discover films, share reviews, and build your ultimate watch circle.
        </p>
        
        <button 
          onClick={() => setloginPopUp(true)}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-600/20"
        >
          Get Started
        </button>
      </div>

      {/* 🔮 THE GLASS-BLUR MODAL SCREEN TRIGGER */}
      {loginPopUp && (
        <div className="absolute inset-0 z-50 backdrop-blur-md flex items-center justify-center animate-fade-in
          bg-zinc-950/40 dark:bg-black/50
        ">
          {/* Your actual Login / Registration Popup Card will go right here */}
          <div className={`p-8 rounded-2xl border w-full max-w-md mx-4 shadow-2xl relative
            ${isDarkMode ? 'bg-zinc-900/80 border-zinc-800 text-white' : 'bg-white/80 border-slate-200 text-zinc-900'}
          `}>
            {/* Close Button */}
            <button 
              onClick={() => setloginPopUp(false)}
              className="absolute top-4 right-4 font-bold text-zinc-400 hover:text-red-500 text-lg"
            >
              ✕
            </button>
            <div className='flex flex-col items-center justify-center text-center select-none'>
              <h3 className="text-2xl font-extrabold tracking-tight text-red-600 drop-shadow-[0_1px_1px_rgba(239,68,68,0.2)]">
                CIN<span className={isDarkMode ? 'text-slate-100' : 'text-neutral-900'}>NECT</span>
              </h3>
              <p className="text-base font-semibold tracking-tight mt-1 opacity-80">{signUp ? 'Create your cinephile account' : 'Login your cinephile account'}</p>
            </div>

            
            <form onSubmit={(e) => {
              onSubmitHandler(e)
            }}
            className='flex flex-col gap-4 mt-6 w-full'>

             {signUp && 
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder='Name' 
                  value={name}  
                  onChange={(e) => setname(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-xl border outline-none transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-zinc-950/50 border-zinc-800 focus:border-red-600 text-white placeholder-zinc-500 focus:ring-1 focus:ring-red-600' 
                      : 'bg-white/50 border-slate-200 focus:border-red-500 text-zinc-900 placeholder-slate-400 focus:ring-1 focus:ring-red-500'}`}
                />
              </div>
                  }
              {signUp &&
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder='Username' 
                  value={username}  
                  onChange={(e) => setusername(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-xl border outline-none transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-zinc-950/50 border-zinc-800 focus:border-red-600 text-white placeholder-zinc-500 focus:ring-1 focus:ring-red-600' 
                      : 'bg-white/50 border-slate-200 focus:border-red-500 text-zinc-900 placeholder-slate-400 focus:ring-1 focus:ring-red-500'}`}
                />
              </div>
                }


              <div className="w-full">
                <input 
                  type="email"  
                  placeholder='Email' 
                  value={email}  
                  onChange={(e) => setemail(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-xl border outline-none transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-zinc-950/50 border-zinc-800 focus:border-red-600 text-white placeholder-zinc-500 focus:ring-1 focus:ring-red-600' 
                      : 'bg-white/50 border-slate-200 focus:border-red-500 text-zinc-900 placeholder-slate-400 focus:ring-1 focus:ring-red-500'}`}
                />
              </div>

              <div className="w-full">
                <input 
                  type="password" 
                  placeholder='Password' 
                  value={password}  
                  onChange={(e) => setpassword(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-xl border outline-none transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-zinc-950/50 border-zinc-800 focus:border-red-600 text-white placeholder-zinc-500 focus:ring-1 focus:ring-red-600' 
                      : 'bg-white/50 border-slate-200 focus:border-red-500 text-zinc-900 placeholder-slate-400 focus:ring-1 focus:ring-red-500'}`}
                />
              </div>

              {/* 🚀 ANIMATED SUBMIT BUTTON */}
              {signUp ?
              <button 
                type="submit"
                className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold tracking-tight rounded-xl shadow-lg
                  transform transition-all duration-300 ease-out cursor-pointer
                  hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-red-600/30
                  active:scale-98 active:translate-y-0 focus:outline-none"
              >
                Sign Up
              </button>
              :
              <button 
                type="submit"
                className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold tracking-tight rounded-xl shadow-lg
                  transform transition-all duration-300 ease-out cursor-pointer
                  hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-red-600/30
                  active:scale-98 active:translate-y-0 focus:outline-none"
              >
                Login
              </button>
              }   
            </form>

            {/* Subtle Footer Link inside the card */}
            {signUp ? 
            <p onClick={()=>setsignUp(!signUp)} className="text-center text-xs mt-4 opacity-60">
              Already have an account?{' '}
              <span className="text-red-500 font-semibold hover:underline cursor-pointer">Log In</span>
            </p>
            :
             <p onClick={()=>setsignUp(!signUp)} className="text-center text-xs mt-4 opacity-60">
              Don't have an account?{' '}
              <span className="text-red-500 font-semibold hover:underline cursor-pointer">Sign up</span>
            </p>
            }
          </div>
        </div>
      )}

    </div>
  );
};

export default Header;