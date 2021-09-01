import styled from "styled-components";
import React, {useCallback, useContext} from "react";
import {CoversContext} from "../../../provider/covers_provider";
import {AliasEnum, TabCellModel} from "../../../interface/covers_interface";
import {Link, NavLink} from "react-router-dom";
import {SimpleDialog} from "../../base/nav_header_widget";
import {useModel} from "../../../hook/use_model";
import {ModalContext} from "../../../provider/model_provider";


const TabData: Array<TabCellModel> = [
    {
        name: 'Active Policies',
        alias: AliasEnum.Active,
    },
    {
        name: 'Expired Policies',
        alias: AliasEnum.Inactive,
    },
    {
        name: 'Claims',
        alias: AliasEnum.Claims,
    },
    // {
    //     name: 'Invite List',
    //     alias: AliasEnum.Invitation,
    // },
    {
        name: 'Policy Mining',
        alias: AliasEnum.Rewards,
    },

]

export const TabWidget: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TabStyle>
                {
                    TabData.map((ev) => {
                        return <TabItem handleClickOpen={() => setOpen(true)} key={ev.name} model={ev}/>;
                    })
                }
            </TabStyle>
            <SimpleDialog selectedValue={'selectedValue'} open={open} onClose={() => setOpen(false)}/>
        </>
    );
}

const TabItem: React.FC<{ model: TabCellModel, handleClickOpen: Function }> = ({model, handleClickOpen}) => {

    const {setAlias, alias} = useContext(CoversContext);

    const {onDismiss, onPresent} = useContext(ModalContext);
    const handlePresent = useCallback((ev?: any) => {
        onPresent(model)
    }, [model, onPresent]);

    return (<TabCellStyle activeClassName={'ac'} to={`/cover/all/${model.alias}`} onClick={() => {
        if (model.alias == null) {
            handleClickOpen()
            return;
        }
        setAlias(model.alias)
    }}>
        {model.name}
    </TabCellStyle>);
}


const TabStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

`;


const TabCellStyle = styled(NavLink)`
  height: 50px;
  border-radius: 4px 4px 0 0;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-weight: 400;
  //color: ${({theme}) =>theme.color.black["400"]};
  padding: 0 30px;
  margin-right: 10px;
  transition: all .2s ease;
  cursor: pointer;
  background: linear-gradient(0deg, #E4E4E4 0%, #FFFFFF 100%);
  //background: linear-gradient(0deg, #0C133F 0%, #161F57 100%);
  transform: translate(0, 5px);
  color: rgba(28,9,58,.6);
  &.ac {
    background: ${({theme}) => theme.color.white};
    transform: translate(0, 0px);
    color: ${({theme}) =>theme.color.black["400"]};
  }

  @media (max-width: ${({theme}) => theme.md}) {
    font-size: 12px;
    padding: 0 5px;
    margin-right: 3px;
  }
`;
