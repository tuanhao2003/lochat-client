import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import useTokenProcessing from "@/hooks/useTokenProcessing";
import { handleSignUp, handleLogin } from "@/services/authService";
import type { LoginResponse } from "@/types/apiAuth";

const RegisterPage = () => {
    const navigate = useNavigate();
    const tokenProcessing = useTokenProcessing();
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birth, setBirth] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [loginData, setLoginData] = useState<LoginResponse["data"]>(null);

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

    const registerButtonClick = () => {
        tokenProcessing(() => handleSignUp({ username, nickname, email, password, birth }))
            .then((response) => {
                if (response?.data) {
                    tokenProcessing(() => handleLogin({ email, password, username }))
                        .then((loginResponse) => {
                            if (loginResponse?.data) {
                                setLoginData(loginResponse.data);
                            }
                        })
                        .catch((error) => {
                            setResponseMessage(error.message);
                        })
                }
            })
            .catch((error) => {
                setResponseMessage(error.message);
            })
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
            <div className="w-1/2 h-fit py-4 rounded-4xl bg-blue-100 border border-gray-300 shadow-lg flex flex-col items-center justify-center">
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-4xl font-semibold text-gray-700 text-shadow-md mb-2">Đăng Ký</div>
                </div>
                <div className="flex-3 w-full items-center justify-start flex flex-col">
                    <div className="text-xl text-shadow-md text-gray-700 w-3/4 font-semibold">Tên đăng nhập:</div>
                    <TextBox onChange={(e) => {
                        setUsername(e.target.value);
                    }} className="border border-gray-300 shadow-md text-lg w-3/4 focus:scale-105 focus:outline-1 focus:shadow-blue-300 outline-blue-500 transition-all duration-500 mb-6" placeholder="Nhập tên đăng nhập" />

                    <div className="text-xl text-shadow-md text-gray-700 w-3/4 font-semibold">Tên tài khoản:</div>
                    <TextBox onChange={(e) => {
                        setNickname(e.target.value);
                    }} className="border border-gray-300 shadow-md text-lg w-3/4 focus:scale-105 focus:outline-1 focus:shadow-blue-300 outline-blue-500 transition-all duration-500 mb-6" placeholder="Nhập tên tài khoản" />

                    <div className="text-xl text-shadow-md text-gray-700 w-3/4 font-semibold">Email:</div>
                    <TextBox onChange={(e) => {
                        setEmail(e.target.value);
                    }} className="border border-gray-300 shadow-md text-lg w-3/4 focus:scale-105 focus:outline-1 focus:shadow-blue-300 outline-blue-500 transition-all duration-500 mb-6" placeholder="Nhập email" type="email" />

                    <div className="text-xl text-shadow-md text-gray-700 w-3/4 font-semibold">Mật khẩu:</div>
                    <TextBox onChange={(e) => {
                        setPassword(e.target.value);
                    }} className="border border-gray-300 shadow-md text-lg w-3/4 focus:scale-105 focus:outline-1 focus:shadow-blue-300 outline-blue-500 transition-all duration-500 mb-6" type="password" placeholder="Nhập mật khẩu" />

                    <div className="text-xl text-shadow-md text-gray-700 w-3/4 font-semibold">Ngày sinh:</div>
                    <TextBox onChange={(e) => {
                        setBirth(e.target.value);
                    }} className="border border-gray-300 shadow-md text-lg w-3/4 focus:scale-105 focus:outline-1 focus:shadow-blue-300 outline-blue-500 transition-all duration-500 mb-6" type="date" />

                    <Button className="w-3/4 font-semibold text-xl text-gray-100 hover:bg-gray-100 hover:text-blue-500 hover:scale-105 hover:border-gray-400 shadow-md transition-all duration-500 origin-center hover:shadow-gray-300" onClick={registerButtonClick} >Gửi</Button>
                    <div className={`${responseMessage == "" ? "invisible" : ""} text-red-500 font-semibold w-3/4 h-fit my-2`}>*{responseMessage}</div>
                    <div className="flex justify-center w-3/4 items-center text-lg text-blue-500">
                        <a onClick={() => { navigate("/") }} className="decoration-0 hover:decoration-2 hover:underline">Có tài khoản?</a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RegisterPage;