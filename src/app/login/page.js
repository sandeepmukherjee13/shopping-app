'use client';
import { loginFormControls } from '@/utils';
import InputComponent from '@/components/FormElements/InputComponent';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { login } from '@/services/login';
import { GlobalContext } from '@/context';
import Cookies from 'js-cookie';
import ComponentLevelLoader from '@/components/Loader/componentlevel';

const initialFormdata = {
  email: '',
  password: ''
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormdata);

  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader
  } = useContext(GlobalContext);

  const router = useRouter();

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
      ? true
      : false;
  }
  const handleLogin = async () => {
    setComponentLevelLoader({ loading: true, id: '' });
    const res = await login(formData);
    console.log(res);

    if (res.success) {
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set('token', res?.finalData?.token);
      localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: '' });
    } else {
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: '' });
    }
  };
  useEffect(() => {
    if (isAuthUser) {
      router.push('/');
    }
  }, [isAuthUser]);
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === 'input' ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value
                        });
                      }}
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-green-500 px-6 py-4 text-lg text-white transition-all duration-300 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={'Logging In'}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                      color={'#FFFFFF'}
                    />
                  ) : (
                    'Login'
                  )}
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to Website</p>
                  <button
                    onClick={() => router.push('/register')}
                    className="inline-flex w-full items-center justify-center bg-green-500 px-6 py-4 text-lg text-white transition-all duration-300 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
