// import axios, { AxiosRequestConfig, AxiosError } from "axios";
// import { API_BASE_URL } from "./constants"; 

// const api = axios.create({
//     baseURL: API_BASE_URL,
//     timeout: 5000, 
//     withCredentials: true, 
//     headers: {
//         "Content-Type": "application/json", 
//     },
// });

// api.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//         return config;
//     },
//     (error) => {
//         console.error("요청 인터셉터 에러:", error);
//         return Promise.reject(error); 
//     }
// );

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error: AxiosError) => {
//         if (error.response) {
//         switch (error.response.status) {
//             case 400:
//             console.error("잘못된 요청입니다.");
//             break;
//             case 401:
//             console.error("인증 실패: 권한이 없습니다.");
//             break;
//             case 403:
//             console.error("접근 금지: 권한이 없습니다.");
//             break;
//             case 404:
//             console.error("요청한 리소스를 찾을 수 없습니다.");
//             break;
//             case 500:
//             console.error("서버 내부 오류가 발생했습니다.");
//             break;
//             default:
//             console.error(`알 수 없는 오류: ${error.response.status}`);
//         }
//         } else if (error.request) {
//         console.error("서버로부터 응답이 없습니다.");
//         } else {
//         // 요청 설정 중 발생한 에러
//         console.error("요청 설정 중 에러 발생:", error.message);
//         }
//         return Promise.reject(error); // 에러를 호출한 곳으로 전달
//     }
// );

// export default api;