// store/useUserStore.js
import { create } from 'zustand';


const useUserStore = create((set) => ({
  user: null, // 사용자 정보를 저장할 객체

  // 사용자 정보 설정 함수
  setUser: (userInfo) => set({ user: userInfo }),

  // 로그아웃 시 사용자 정보 초기화 함수
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
