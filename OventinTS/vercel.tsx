// Dùng khi vercel gặp lỗi 404 điều hướng, 
// chỉ xảy ra khi xài browserRouter => nên thay bằng HashRouter hoặc file này
// Đổi đuôi tệp thành .json
// { 
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/index.html"
//     }
//   ]
// }