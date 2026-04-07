import type { RootState } from "../store/store";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;