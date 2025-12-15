// import React, { useState, useEffect, memo } from "react";
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// import ButtonOrange from "../Button/ButtonOranges";
// import AlertTitle, { type AlertType } from "../AlertTitle/AlertTitle";
// import { type User } from "../RegisterPopup/RegisterPopup";
// import PasswordInput from "../Shared/PasswordInput";

// interface PasswordUpdateFormProps {
//     isOpen: boolean;
//     onClose: () => void;
//     phoneNumber: string;
//     formId: string;
//     title: string;
//     successMessage: string;
//     successDescription: string;
//     zIndex?: string;
// }

// interface PasswordFormData {
//     password: string;
//     confirmPassword: string;
// }

// const validationSchema = yup.object().shape({
//     password: yup
//         .string()
//         .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
//         .required("Vui lòng nhập mật khẩu"),
//     confirmPassword: yup
//         .string()
//         .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp.")
//         .required("Vui lòng xác nhận mật khẩu"),
// });

// const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = ({
//     isOpen,
//     onClose,
//     phoneNumber,
//     formId,
//     title,
//     successMessage,
//     successDescription,
//     zIndex = 'z-[1005]'
// }) => {
//     const [alertState, setAlertState] = useState<{ isOpen: boolean; type: AlertType; title: string; description?: string }>({
//         isOpen: false,
//         type: 'success',
//         title: ''
//     });

//     const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormData>({
//         resolver: yupResolver(validationSchema),
//         defaultValues: {
//             password: "",
//             confirmPassword: "",
//         }
//     });

//     useEffect(() => {
//         if (!isOpen) {
//             reset();
//         }
//     }, [isOpen, reset]);

//     const onSubmitChangePass = (data: PasswordFormData) => {
//         const existingUsersRaw = localStorage.getItem("registeredUsers");
//         const existingUsers: User[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
//         const userIndex = existingUsers.findIndex(user => user.phoneNumber === phoneNumber);

//         if (userIndex !== -1) {
//             const updatedUsers = [...existingUsers];
//             updatedUsers[userIndex] = {
//                 ...updatedUsers[userIndex],
//                 password: data.password,
//             };
//             localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

//             // Also update loggedInUser if they are the one changing the password
//             const loggedInUserRaw = localStorage.getItem('loggedInUser');
//             if (loggedInUserRaw) {
//                 const loggedInUser: User = JSON.parse(loggedInUserRaw);
//                 if (loggedInUser.phoneNumber === phoneNumber) {
//                     localStorage.setItem('loggedInUser', JSON.stringify(updatedUsers[userIndex]));
//                 }
//             }

//             setAlertState({
//                 isOpen: true,
//                 type: 'success',
//                 title: successMessage,
//                 description: successDescription,
//             });
//         } else {
//             setAlertState({
//                 isOpen: true,
//                 type: 'error',
//                 title: 'Lỗi!',
//                 description: 'Không tìm thấy người dùng để cập nhật.'
//             });
//         }
//     };

//     if (!isOpen) {
//         return null;
//     }

//     return (
//         <>
//             <div className={`fixed inset-0 bg-black/60 ${zIndex} flex justify-center overflow-y-auto py-20 px-4 transition-opacity duration-300 ease-in-out`}>
//                 <div className="relative flex justify-center w-full max-w-[800px] pt-[200px]">
//                     <img
//                         src="/static/Zootopia.png"
//                         alt="Oventin Logo"
//                         className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
//                     />
//                     <img
//                         src={title}
//                         alt="Cập nhật mật khẩu"
//                         className="absolute z-[1004] top-[170px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
//                     />
//                     <div className="relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)] w-[300px] md:w-[300px] lg:w-[350px] max-w-[800px] text-center text-black">
//                         <div className="items-center h-[250px] inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat rounded-[20px] border-4 border-white">
//                             <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-[40px]">
//                                 <form id={formId} onSubmit={handleSubmit(onSubmitChangePass)} className="flex flex-col gap-3 text-[#233da3]">
//                                     <PasswordInput
//                                         id="password"
//                                         label="Mật khẩu"
//                                         register={register}
//                                         error={errors.password}
//                                         name="password"
//                                         placeholder="Mật khẩu mới"
//                                     />
//                                     <PasswordInput
//                                         id="confirmPassword"
//                                         label="Xác nhận mật khẩu"
//                                         register={register}
//                                         error={errors.confirmPassword}
//                                         name="confirmPassword"
//                                         placeholder="Xác nhận mật khẩu"
//                                     />
//                                     <div className="absolute -bottom-30 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
//                                         <ButtonOrange type="submit" form={formId} className="w-[200px] h-12 text-lg">
//                                             Đặt lại mật khẩu
//                                         </ButtonOrange>
//                                         <button
//                                             onClick={onClose}
//                                             type="button"
//                                             className="w-8 h-8 flex items-center justify-center rounded-full border-2 cursor-pointer border-white text-white text-2xl font-light bg-transparent hover:bg-white/20 transition-colors"
//                                             aria-label="Đóng"
//                                         >
//                                             &times;
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <AlertTitle
//                 isOpen={alertState.isOpen}
//                 type={alertState.type}
//                 title={alertState.title}
//                 description={alertState.description}
//                 onClose={() => {
//                     setAlertState({ ...alertState, isOpen: false });
//                     if (alertState.type === 'success') {
//                         onClose();
//                     }
//                 }}
//             />
//         </>
//     );
// };

// export default memo(PasswordUpdateForm);