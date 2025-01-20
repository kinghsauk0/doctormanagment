
'use client';



import { useRouter } from 'next/navigation';
import { AppendToType, PrimeReactContext } from 'primereact/api';

import { Toast } from 'primereact/toast';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';

export interface App {
  toastSuccess: (message: string, position?: string) => void;
  toastWarn: (message: string, position?: string) => void;
  toastInfo: (message: string, position?: string) => void;
  toastError: (message: string, position?: string) => void;
  replaceTo: (destination: string) => void;
  reload: () => void;
  windowReload: () => void;
  windowLocationReplaceTo: (location: string) => void;
  goTo: (destination: string) => void;
  setUrl: (url: string) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  appendTo: AppendToType | undefined;
  setAppendTo: Dispatch<SetStateAction<AppendToType | undefined>> | undefined;
}

interface AppContextProps {
  app: App;
}





const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pc = useContext(PrimeReactContext);
  const router = useRouter();
  const toast: any = useRef(null);
  const [processing, setProcessing] = useState(false);


  const app: App = {
    loading: processing,
    setLoading: setProcessing,
    windowLocationReplaceTo: (location: string) => {
      window.location.replace(location);
    },
    windowReload: () => {
      window.location.reload();
    },
    toastWarn: (message: string, position?: string) =>
      toast.current.show({
        severity: 'warn',
        summary: 'Warning',
        detail: message,
        position: position,
      }),
    toastSuccess: (message: string, position?: string) =>
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: message,
        position: position,
      }),
    toastInfo: (message: string, position?: string) =>
      toast.current.show({
        severity: 'info',
        summary: 'Info',
        detail: message,
        position: position,
      }),
    toastError: (message: string, position?: string) =>
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        position: position,
      }),
    replaceTo: (destination: string) => {
      router.replace(destination);
    },

    reload: () => router.refresh(),

    goTo: (destination: string) => {
      router.push(destination);
    },
    setUrl(url) {
      window.history.replaceState(null, '', url);
    },

    appendTo: pc.appendTo,
    setAppendTo: pc.setAppendTo,
  };

  

  

  return (
    <AppContext.Provider
      value={{
        app: app,
      }}
    >
      {children}

      <Toast ref={toast} position="bottom-center" />
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};









