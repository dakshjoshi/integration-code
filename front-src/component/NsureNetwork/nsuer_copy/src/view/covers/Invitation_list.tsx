import React, {useEffect, useState} from "react";
import {SearchListWidget} from "../../widget/search_list/search_list";
import {blues} from "../../theme/colors";
import {DateUtils} from "../../utils/date";
import {kai} from "../../net/api";
import {HttpServer} from "../../net/http_server";
import {formatAddress, getBalanceFormat, getBalanceNumber} from "../../utils/formatBalance";
import {UrlHaxFormat} from "../../utils/url";
import {Button, Fade, Grid, IconButton, Slide, Snackbar} from "@material-ui/core";
import styled from "styled-components";
import coptImg from "../../assets/imgs/copt_img.png"
import {useModel} from "../../hook/use_model";
import {Alert} from "@material-ui/lab";
import copy from "copy-to-clipboard";
import {useLocation} from "react-router-dom";
import {LineStyle} from "../../widget/style/item_style";
import {TransitionProps} from "@material-ui/core/transitions";
import {CopyTisWidget} from "../../widget/modal/copy_tis_widget";

export const InvitationWidget: React.FC = () => {
    const [rHref, setRHref] = useState('');
    const location = useLocation();
    const [httpData, setHttpData] = useState({amount: 0, reward: 0});
    useEffect(() => {
        let host = window.location.host;
        setRHref(`https://${host}/#/cover/my?r=${HttpServer.account}`);
    }, [],);


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <WapStyle>
            <CopyTisWidget  handleClose={handleClose} open={open}/>
            <TopStyle>
                <Grid container alignItems={"center"}>
                    <Grid item md={6} className={'left'}>
                        <div className="top">
                            <div>
                                <h2>Outstanding</h2>
                                <h3>{getBalanceFormat(httpData.amount, 6)} ETH</h3>
                            </div>
                            <div>
                                <h2>Settled</h2>
                                <h3>{getBalanceFormat(httpData.reward, 4)} Nsure</h3>
                            </div>
                        </div>
                        <h4 className={'tis'}>
                            Outstanding will be settled monthly<br/>
                            Please claim your settled reward by click “Claim Extra Reward” button
                        </h4>
                    </Grid>
                    <Grid item sm={1}>
                        <LineStyle/>
                    </Grid>
                    <Grid item md={5} xs={12} className={'right'}>
                        <h1>Become Nsure agent and receive commission</h1>
                        <h2>Your Referral URLs</h2>
                        <h3 onClick={(ev) => {
                            copy(rHref);
                            handleClick()
                        }
                        }><span>{rHref}</span> <img src={coptImg} alt=""/></h3>
                    </Grid>
                </Grid>
            </TopStyle>

            <SearchListWidget structure={(ev: any) => {
                return [
                    {
                        inner: ev.name,
                        url: ev?.logo?.filename || '',
                        color: blues["100"],
                        type: 'Imagelabel',
                        size: 28
                    },
                    {
                        inner: formatAddress(ev.buyer),
                        color: blues["100"],
                        type: 'text',
                        onClick: () => {
                            window.open(UrlHaxFormat(ev.hash, 'address'), '_blank');
                        }
                    },
                    {
                        inner: DateUtils.dataString(ev.date),
                        color: '#333',
                        type: 'text',
                    },
                    {
                        inner: formatAddress(ev.hash),
                        color: blues["100"],
                        type: 'text',
                        onClick: () => {
                            window.open(UrlHaxFormat(ev.hash, 'tx'), '_blank');
                        }
                    },
                    {
                        inner: getBalanceFormat(ev.cost,4) + ' ETH',
                        color: '#333',
                    },
                    {
                        inner: `${ev.status ==0 ?'Outstanding':'Settled'}`,
                        color: '#333',
                        type: 'text',
                    },

                ];
            }}
                              isShowHeader={false}
                              net={kai}
                              url={"/cover/inviter"}
                              params={{'user': HttpServer.account}}
                              onGetData={(ev) => {
                                  setHttpData(ev);
                              }}
            >
                <div>Protocol</div>
                <div>Address</div>
                <div>Time Purchased</div>
                <div>Tx</div>
                <div>Reward</div>
                <div style={{textAlign: "start"}}>Status</div>
            </SearchListWidget>


        </WapStyle>
    );
}

const  WapStyle =styled.div`
background: white;
  border-radius: 5px;
`

const TopStyle = styled.div`
  padding: 30px 30px 30px 30px;
  box-sizing: border-box;

  > div {
    background: #EFEFF6;
    border-radius: 3px;
    padding: 20px;

    .right {
      h1{
        font-size: 16px;
        font-weight: bold;
        color: #270D4F;
      }
      h2 {
        font-size: 14px;
        font-weight: 500;
        color: #270D4F;
        margin-bottom: 20px;
      }

      h3 {
        background: #E1E1ED;
        padding: 8px 10px;
        box-sizing: border-box;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          padding-right: 20px;
          box-sizing: border-box;
          flex: 1;
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap;
        }

        img {
          display: block;
          width: 12px;
        }
      }
    }

    .left {
      .top {
        display: flex;
        justify-content: space-between;

        > div {
          flex: 1;

          h2 {
            font-size: 14px;
            font-weight: 500;
            color: #270D4F;
          }

          h3 {
            font-size: 24px;
            font-weight: 500;
            color: #270D4F;
            margin: 25px 0;
          }
        }
      }

      .tis {
        font-size: 14px;
        font-weight: 500;
        color: #999;
        font-style: italic;
      }
    }
  }
`
