import React, {createContext, useContext, useState} from "react";
import {AliasEnum, CoversInterface} from "../interface/covers_interface";


export const CoversProvider: React.FC = ({children}) => {
    const [alias, setAlias] = useState<AliasEnum>(AliasEnum.Active);

    return <CoversContext.Provider value={{
        alias,
        setAlias,
    }}>{children}</CoversContext.Provider>
};


export const CoversContext = createContext<CoversInterface>({
    alias: AliasEnum.Active,
    setAlias: () => {} ,
})




