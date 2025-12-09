import React, { useState } from "react";
import ButtonOrange from "./Button/ButtonOranges";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const CORRECT_PASSWORD = "123123estuary";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (password === CORRECT_PASSWORD) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Mật khẩu không đúng. Who are you? Get out!");
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#ff9a24] to-[#ffc93c] z-[1000] flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md text-center">
        {/* Logo */}
        <img
          src="./static/frog.png"
          alt="Oventin Logo"
          className="mx-auto w-[150px] h-auto rounded-full filter-[drop-shadow(rgb(0,0,0,0.2)_0px_5px_5px)]"
        />

        {/* Form đăng nhập */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-white">
          <h1 className="text-2xl font-bold text-[#233DA3] mb-2">
            Form đăng nhập Ovomaltine 
          </h1>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              className="w-full px-4 py-3 mb-4 text-lg border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-[#ff9a24] focus:border-transparent outline-none transition"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <ButtonOrange
              type="submit"
              className="w-full h-14 text-xl"
            >
              Truy Cập
            </ButtonOrange>
          </form>
        </div>

        <p className="mt-8 text-white/70 text-sm">
          &copy; {new Date().getFullYear()} HL EstuarySolutions
        </p>
      </div>
    </div>
  );
};

export default Login;
