import React, { ReactNode, createContext, useContext, useState } from 'react';

interface BarcodeDataContextType {
  barcodeData: string | null;
  setBarcodeData: (data: string | null) => void;
}
const BarcodeDataContext = createContext<BarcodeDataContextType>({
  barcodeData: null,
  setBarcodeData: () => {},
});

interface BarcodeDataProviderProps {
  children: ReactNode; // Define the type for children here
}
export const useBarcodeData = () => useContext(BarcodeDataContext);

export const BarcodeDataProvider: React.FC<BarcodeDataProviderProps> = ({ children }) => {
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

  return (
    <BarcodeDataContext.Provider value={{ barcodeData, setBarcodeData }}>
      {children}
    </BarcodeDataContext.Provider>
  );
};
