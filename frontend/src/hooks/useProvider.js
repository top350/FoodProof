import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { providerState } from "../store/provider";

export default function useProvider() {
  const [provider, setProvider] = useRecoilState(providerState);

  const initProvider = useCallback(async () => {
    if (window.ethereum) {
    }
  }, [setProvider]);

  useEffect(() => {
    initProvider();
  }, [initProvider]);

  return provider;
}
