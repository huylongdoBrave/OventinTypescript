import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
// import ButtonOrange from '../Button/ButtonCustomA';
import AlertTitle, { type AlertType } from '../AlertTitle/AlertTitle';

/**
 *    ====== UI InfoProfile ======
 * 
 * Giao diện cho dữ liệu người dùng được lưu trong localStorage.
 * Lấy từ RegisterPopup.tsx không bao gồm password và confirmPassword.
 */
interface StoredUser {
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string; // API trả về 'birthday'
  email: string; // Email mới
}


// Component InfoProfile
const InfoProfile: React.FC = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [currentUser, setCurrentUser] = useState<StoredUser | null>();
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(() => {
    // Khởi tạo state từ localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) as StoredUser : null;
  });

  // Alert custom
  const [alertState, setAlertState] = useState<{isOpen: boolean; type: AlertType; title: string; description?: string}>({
    isOpen: false,
    type: 'success',
    title: ''
  });

  const getApiInfoProfile = async () => {
    // 1. Lấy token từ localStorage
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error("No token found"); // Báo lỗi nếu rỗng token
      navigate('/');
    }

    // 2. Gọi API GET kèm theo Header Authorization
    return axios.get('https://api-dev.estuary.solutions:8443/ovaltine-web-api-dev/v1/members/me', {
      headers: {
        'Authorization': `Bearer ${token}`, // Cú pháp chuẩn: Bearer + dấu cách + token
        'Content-Type': 'application/json'
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
      const fetchLatestProfile = async () => {
        try {
          setIsLoading(true);
          // Gọi API
          const response = await getApiInfoProfile();           // Gọi Api
          console.log("DATA PROFILE: ", response.data);         // Kiểm tra data trả về từ API
          const UserData = response.data  // Lấy loại data json từ response

          const StoredUser: StoredUser = {
            fullName: UserData.data.fullName || UserData.data.full_name || UserData.data.name || "Chưa cập nhật",
            phoneNumber: UserData.data.phoneNumber || UserData.data.phone || "Chưa cập nhật",
            email: UserData.data.email || "Chưa cập nhật",
            dateOfBirth: UserData.data.birthday || UserData.data.dateOfBirth || "",
          };

          // Cập nhật State để màn hình hiển thị dữ liệu mới 
          setCurrentUser(StoredUser);

          // Cập nhật ngược lại vào LocalStorage để lần sau vào load nhanh
          localStorage.setItem('loggedInUser', JSON.stringify(UserData));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error("Lỗi lấy thông tin mới (đang hiển thị thông tin cũ):", error);
        if (error.response && error.response.status === 401) {
            alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            // localStorage.removeItem('token'); // Xóa token hư
            navigate('/'); // Đá về trang chủ
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchLatestProfile();
  }, []);


  // const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     // 1. Chuẩn bị dữ liệu gửi đi
  //     // Chỉ gửi những trường API cho phép sửa (Ví dụ ở đây là email)
  //     const payload = {
  //       email: data.email,
  //       // Nếu API yêu cầu gửi cả tên/sđt thì thêm vào:
  //       // fullName: currentUser?.fullName, 
  //       // phoneNumber: currentUser?.phoneNumber
  //     };

  //     // 2. Gọi API Cập nhật
  //     const response = await axios.put('https://api-dev.estuary.solutions:8443/ovaltine-web-api-dev/v1/members/me', payload, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     const updatedUser = response.data; // Lấy user mới nhất từ server trả về

  //     // 3. Cập nhật State hiển thị
  //     setCurrentUser(updatedUser);

  //     // 4. Cập nhật localStorage (chỉ để đồng bộ Client)
  //     localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

  //     setAlertState({
  //       isOpen: true,
  //       type: 'success',
  //       title: 'Cập nhật thành công!',
  //       description: 'Thông tin của bạn đã được lưu.'
  //     });
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.error("Lỗi cập nhật:", error);
  //     setAlertState({
  //       isOpen: true,
  //       type: 'error',
  //       title: 'Lỗi cập nhật!',
  //       description: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật.'
  //     });
  //   }
  // };


  if (!currentUser) {
    return <div>Không tìm thấy thông tin người dùng. Vui lòng đăng ký.</div>;
  }


  const renderInput = (id:string, label:string, value:string, disabled:boolean = false) => (
    <div className="relative pb-5">
      <label htmlFor={id} className="block text-sm font-medium text-white/100 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        defaultValue={value}
        disabled={disabled}
        className="w-full bg-white border rounded-[30px] p-2 focus:ring-2 outline-none transition border-white/30 focus:ring-[#233da3] disabled:bg-gray-200 disabled:cursor-not-allowed"
      />
    </div>
  );


  return (
    <>
      <AlertTitle
        isOpen={alertState.isOpen}
        type={alertState.type}
        title={alertState.title}
        description={alertState.description}
        onClose={() => setAlertState({ ...alertState, isOpen: false })}
      />
      <div className="p-6 max-w-lg mx-auto bg-[url('/static/modal.png')] 
                        bg-cover bg-center rounded-[20px] border-4 border-white mt-10 mb-10">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Thông tin tài khoản</h2>
        {isLoading && <p>Đang đồng bộ dữ liệu...</p>} 
        {/* Container for user info */}
        <div className="flex flex-col gap-3 text-[#233da3]">
          {renderInput("fullName", "Họ và tên", currentUser.fullName, true)}
          {renderInput("phoneNumber", "Số điện thoại", currentUser.phoneNumber, true)}
          {renderInput("birthday", "Ngày sinh", currentUser.dateOfBirth, true)}
          {renderInput("city", "Thành phố", "HCM", true)}
          {renderInput("email", "Email", currentUser.email || 'Chưa cập nhật', true)}
        </div>
      </div>

    </>
  );
};

export default InfoProfile;