import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AppState = {
  productPageNumber: number;
  setProductPageNumber: (page: number) => void;
  pageSize: number;
  searchProduct: string
  setSearchProduct: (searchText: string) => void;
};

const useAppStore = create<AppState>()(
  devtools((set) => ({
    productPageNumber: 0,
    pageSize: 20,
    searchProduct:"",
    setProductPageNumber: (page) => set({ productPageNumber: page }),
    setSearchProduct : (searchText)=> set({searchProduct:searchText})
  }))
);

export default useAppStore;
