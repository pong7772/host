import React, { useState, use, Suspense, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(true);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/crm')
    router.prefetch('/profile')
    router.prefetch('/feedback')
    router.prefetch('/department')
    router.prefetch('/academic')
    router.prefetch('/user')
    router.prefetch('/feedback-form')
    router.prefetch('/feedback/create-feedback')
  }, [router])
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });




  const onSubmit = async (values) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    try {
      const user = await axios.post(backendUrl + "/auth/authenticate",
        JSON.stringify({ username: values.username, password: values.password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (user && user.data) {
        dispatch(handleLogin(user.data))
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push('/crm')
      } else {
        toast.error("Login failed. Please try again later.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    } catch (error) {
      if (error.response.status === 400) {
        setLoginError("Invalid username or password ")
      }

      toast.error("Login failed. Please try again later.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ToastContainer />
      <Textinput
        name="username"
        label="Username"
        defaultValue={users?.username ? users.username : ""}
        type="text"
        register={register}
        error={errors?.username}
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        defaultValue={users?.password ? users.password : ""}
        register={register}
        error={errors.password}
      />
      {/* <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        /> */}
      {/* <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link> */}
      {/* </div> */}
      {
        loginError &&
        <div className="mb-4">
          <div style={{ color: "#ff4d4f", fontWeight: "bold", marginBottom: "20px" }}>{loginError}</div>
        </div>
      }

      <button className="btn btn-dark block w-full text-center" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
