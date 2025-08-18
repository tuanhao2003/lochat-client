import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import { handleLogin, validateToken } from "@/services/authService";
import useTokenProcessing from "@/hooks/useTokenProcessing";
import type { LoginResponse } from "@/types/apiAuth";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [loginData, setLoginData] = useState<LoginResponse["data"]>(null);
    const navigate = useNavigate();
    const tokenProcessing = useTokenProcessing();

    useEffect(() => {
        const autoLoginUsingToken = () => {
            const token = localStorage.getItem("access_token");
            if (token && token !== "") {
                tokenProcessing(() => validateToken(token))
                    .then(response => {
                        if (response) {
                            setLoginData(response.data);
                        }
                    });
            }
        }

        autoLoginUsingToken();
    }, []);

    useEffect(() => {
        if (loginData) {
            const saveLoginDatas = () => {
                localStorage.setItem("access_token", loginData.access_token);
                localStorage.setItem("refresh_token", loginData.refresh_token);
                localStorage.setItem("logged_in_user", JSON.stringify(loginData.account));
            }

            saveLoginDatas();
            navigate("/conversations");
        }
    }, [loginData]);

    useEffect(() => {
        const removeLoginDatas = () => {
            localStorage.removeItem("access_token",);
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("logged_in_user");
        }

        if (responseMessage) {
            removeLoginDatas();
        }
    }, [responseMessage])

    const loginButtonClick = () => {
        tokenProcessing(() => handleLogin({ email, password, username }))
            .then(response => {
                if (response) {
                    if (response.data) {
                        setLoginData(response.data);
                    }
                    else {
                        setResponseMessage(response.message);
                    }
                }
            }).catch(error => {
                setResponseMessage(error.message);
            });
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="w-1/2 h-3/4 rounded-4xl bg-blue-100 border border-gray-300 shadow-lg flex flex-col items-center justify-center">
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-4xl font-semibold text-gray-700 text-shadow-md">Đăng Nhập</div>
                </div>
                <div className="flex-3 w-full items-center justify-start flex flex-col">
                    <div className="text-xl text-shadow-md text-gray-700 w-3/4 font-semibold">Tên đăng nhập hoặc email:</div>
                    <TextBox onChange={(e) => {
                        setEmail(e.target.value);
                        setUsername(e.target.value);
                    }} className="border border-gray-300 shadow-md text-lg w-3/4 focus:scale-105 focus:outline-1 focus:shadow-blue-300 outline-blue-500 transition-all duration-500 mb-6" placeholder="Nhập tên đăng nhập hoặc email" />
                    <div className="text-xl text-shadow-md text-gray-700 w-3/4 font-semibold">Mật khẩu:</div>
                    <TextBox onChange={(e) => {
                        setPassword(e.target.value);
                    }} className="border border-gray-300 shadow-md text-lg w-3/4 focus:scale-105 focus:outline-1 focus:shadow-blue-300 outline-blue-500 transition-all duration-500 mb-6" type="password" placeholder="Nhập mật khẩu" />
                    <Button className="w-3/4 font-semibold text-xl text-gray-100 hover:bg-gray-100 hover:text-blue-500 hover:scale-105 hover:border-gray-400 shadow-md transition-all duration-500 origin-center hover:shadow-gray-300" onClick={loginButtonClick}>Gửi</Button>
                    <div className={`${responseMessage == "" ? "invisible" : ""} text-red-500 font-semibold w-3/4 h-8 my-3 text-lg`}>*{responseMessage}</div>
                    <div className="flex justify-between w-3/4 items-center text-lg text-blue-500">
                        <a href="/registry" className="decoration-0 hover:decoration-2 hover:underline">Tạo Tài Khoản</a>
                        <a href="/forgot-password" className="decoration-0 hover:decoration-2 hover:underline">Quên mật khẩu?</a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginPage;