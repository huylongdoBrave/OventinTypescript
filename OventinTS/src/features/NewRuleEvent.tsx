// import React, { useState, useEffect } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// // Định nghĩa kiểu dữ liệu cho Event của CKEditor (để TS không báo lỗi)
// interface CKEditorEvent {
//   getData: () => string;
// }

// const RuleEvent: React.FC = () => {
//   const [editorData, setEditorData] = useState<string>('');
//   const [isEditing, setIsEditing] = useState<boolean>(false); // Chế độ sửa/xem

//   // 1. Load dữ liệu từ LocalStorage khi mới vào trang
//   useEffect(() => {
//     const savedData = localStorage.getItem('ruleContent');
//     if (savedData) {
//       setEditorData(savedData);
//     } else {
//       setEditorData('<p>Chưa có nội dung quy định.</p>');
//     }
//   }, []);

//   // 2. Hàm lưu dữ liệu
//   const handleSave = () => {
//     localStorage.setItem('ruleContent', editorData);
//     setIsEditing(false); // Tắt chế độ sửa
//     alert('Đã lưu quy định thành công!');
//   };

//   return (
//     <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h1>Quy định & Luật lệ</h1>
        
//         {/* Nút chuyển đổi chế độ */}
//         {!isEditing ? (
//           <button 
//             onClick={() => setIsEditing(true)}
//             style={{ padding: '8px 16px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//           >
//             ✏️ Chỉnh sửa
//           </button>
//         ) : (
//           <div>
//             <button 
//               onClick={handleSave}
//               style={{ padding: '8px 16px', background: '#52c41a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
//             >
//               Lưu lại
//             </button>
//             <button 
//               onClick={() => setIsEditing(false)}
//               style={{ padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//             >
//               Hủy
//             </button>
//           </div>
//         )}
//       </div>

//       {/* --- PHẦN HIỂN THỊ NỘI DUNG --- */}
      
//       {isEditing ? (
//         // CHẾ ĐỘ SỬA: Hiện CKEditor
//         <div className="editor-wrapper">
//           <CKEditor
//             editor={ClassicEditor}
//             data={editorData}
//             onReady={(editor) => {
//               // Bạn có thể tùy chỉnh chiều cao editor ở đây nếu muốn
//               console.log('Editor is ready to use!', editor);
//             }}
//             onChange={(event, editor) => {
//               const data = editor.getData();
//               setEditorData(data);
//             }}
//             config={{
//                 // Bạn có thể thêm cấu hình toolbar ở đây nếu muốn gọn hơn
//                 // toolbar: [ 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
//                 placeholder: 'Nhập nội dung luật lệ tại đây...'
//             }}
//           />
//         </div>
//       ) : (
//         // CHẾ ĐỘ XEM: Hiện HTML (User bình thường sẽ thấy cái này)
//         <div 
//           className="ck-content" // Class này giúp CSS của CKEditor áp dụng đúng (ví dụ bullet point)
//           style={{ 
//             border: '1px solid #ddd', 
//             padding: '20px', 
//             borderRadius: '8px', 
//             minHeight: '200px',
//             backgroundColor: '#fff' 
//           }}
//           dangerouslySetInnerHTML={{ __html: editorData }} 
//         />
//       )}
//     </div>
//   );
// };

// export default RuleEvent;