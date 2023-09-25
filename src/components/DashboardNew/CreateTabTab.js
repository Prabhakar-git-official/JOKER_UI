import React,{useEffect,useState} from 'react';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../../NFTFolder/firebase';
import CreateTabNFT from './CreateTabNFT';
import CreateTab from './CreateTab';
import CreateTabFractional from './CreateTabFractional';
import CreateTabAuction from './CreateTabAuction';

const CreateTabTab=()=>{
    const[pageSize,setPageSize]=useState(12);     
    const[getImgreffalgoNFT,setgetImgreffalgoNFT]=useState([]);
    const[getImgreffalgo,setgetImgreffalgo]=useState([]);
    const[getImgreffalgoauction,setgetImgreffalgoauction]=useState([]);    
    const[getImgreffalgoFractional,setgetImgreffalgoFractional]=useState([]);
    const [searchText, setSearchText] = React.useState('');
    const[getrecent,setrecent]=useState("View All");    

    const dbcallalgo=async()=>{        
        let reqauctionnew = [];
        let reqnew = [];
        let req = [];
        let req2 = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{
        let getalgo=localStorage.getItem("walletAddress");              
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefAlgoRoyalty").child(getalgo).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                if(value.NFTModel ==="NFT"){
                    reqnew.push(            
                        {
                          Assetid:value.Assetid,
                          Imageurl:value.Imageurl,
                          NFTPrice:value.NFTPrice,
                          EscrowAddress:value.EscrowAddress,
                          keyId:value.keyId,
                          NFTName:value.NFTName,
                          userSymbol:value.userSymbol,
                          Ipfsurl:value.Ipfsurl,
                          ownerAddress:value.ownerAddress,
                          previousoaddress:value.previousoaddress,
                          TimeStamp:value.TimeStamp,
                          NFTDescription:value.NFTDescription,
                          HistoryAddress:value.HistoryAddress,
                          Appid:value.Appid,
                          valid:value.valid,
                          CreatorAddress:value.CreatorAddress,
                          NFTType:value.NFTType,
                          NFTChannel:value.NFTChannel,
                          SocialLink:value.SocialLink,
                          NFTModel:value.NFTModel
                    })                
                }
                else if(value.NFTModel ==="Royalty-NFT"){
                    req.push(            
                        {
                          Assetid:value.Assetid,
                          Imageurl:value.Imageurl,
                          NFTPrice:value.NFTPrice,
                          EscrowAddress:value.EscrowAddress,
                          keyId:value.keyId,
                          NFTName:value.NFTName,
                          userSymbol:value.userSymbol,
                          Ipfsurl:value.Ipfsurl,
                          ownerAddress:value.ownerAddress,
                          previousoaddress:value.previousoaddress,
                          TimeStamp:value.TimeStamp,
                          NFTDescription:value.NFTDescription,
                          HistoryAddress:value.HistoryAddress,
                          Appid:value.Appid,
                          valid:value.valid,
                          CreatorAddress:value.CreatorAddress,
                          NFTType:value.NFTType,
                          NFTChannel:value.NFTChannel,
                          SocialLink:value.SocialLink,
                          NFTModel:value.NFTModel
                    })                
                }else if(value.NFTModel ==="Auction-NFT"){
                    reqauctionnew.push({
                        Assetid:value.Assetid,
                        Imageurl:value.Imageurl,
                        NFTPrice:value.NFTPrice,
                        EscrowAddress:value.EscrowAddress,
                        keyId:value.keyId,
                        NFTName:value.NFTName,
                        userSymbol:value.userSymbol,
                        Ipfsurl:value.Ipfsurl,
                        ownerAddress:value.ownerAddress,
                        previousoaddress:value.previousoaddress,
                        TimeStamp:value.TimeStamp,
                        NFTDescription:value.NFTDescription,
                        HistoryAddress:value.HistoryAddress,
                        Appid:value.Appid,
                        valid:value.valid,
                        CreatorAddress:value.CreatorAddress,
                        NFTType:value.NFTType,
                        NFTChannel:value.NFTChannel,
                        SocialLink:value.SocialLink,
                        NFTModel:value.NFTModel
                    })
                }
                else{
                    req2.push(            
                        {
                          Assetid:value.Assetid,
                          Imageurl:value.Imageurl,
                          NFTPrice:value.NFTPrice,
                          EscrowAddress:value.EscrowAddress,
                          keyId:value.keyId,
                          NFTName:value.NFTName,
                          userSymbol:value.userSymbol,
                          Ipfsurl:value.Ipfsurl,
                          ownerAddress:value.ownerAddress,
                          previousoaddress:value.previousoaddress,
                          TimeStamp:value.TimeStamp,
                          NFTDescription:value.NFTDescription,
                          HistoryAddress:value.HistoryAddress,
                          Appid:value.Appid,
                          valid:value.valid,
                          CreatorAddress:value.CreatorAddress,
                          NFTType:value.NFTType,
                          NFTChannel:value.NFTChannel,
                          SocialLink:value.SocialLink,
                          NFTModel:value.NFTModel
                    })                
                }                
                });        
              }
              reqnew.reverse()
              req.reverse()
              reqauctionnew.reverse()
              req2.reverse()
              setgetImgreffalgoNFT(reqnew)
              setgetImgreffalgo(req);
              setgetImgreffalgoauction(reqauctionnew);
              setgetImgreffalgoFractional(req2);
            });          
        })        
        }        
    }      
    useEffect(()=>{dbcallalgo()},[])

    const filterdata3NFT=()=>{        
        if(searchText === "")
        {                                      
        let dateset=new Date().toDateString();    
        if(getrecent === "View All"){                    
            return getImgreffalgoNFT;                                                
        }
        if(getrecent === "Recently added"){        
            let data = getImgreffalgoNFT.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp                        
            })
            return data;                                                
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgoNFT.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoNFT.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})          
          return data;
        }
        }
        else{
                let data = getImgreffalgoNFT.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgoNFT
    }
    const filterdata3=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {
        if(getrecent === "View All"){                    
            return getImgreffalgo;                                                
        }                          
        if(getrecent === "Recently added"){        
            let data = getImgreffalgo.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp                        
            })
            return data;                                                
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgo.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})         
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgo.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})          
          return data;
        }
        }
        else{
                let data = getImgreffalgo.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgo
    }
    const filterdata3fractional=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {
        if(getrecent === "View All"){                    
            return getImgreffalgoFractional;                                                
        }                          
        if(getrecent === "Recently added"){        
            let data = getImgreffalgoFractional.filter((val)=>{                                                                                        
                    return dateset === val.TimeStamp                        
            })
            return data;                                                
        }        
        if(getrecent === "Low to High"){
          let data=getImgreffalgoFractional.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoFractional.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})          
          return data;
        }
        }
        else{
                let data = getImgreffalgoFractional.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgoFractional
    }
    const filterdata3auction=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {
        if(getrecent === "View All"){                    
            return getImgreffalgoauction;                                                
        }                          
        if(getrecent === "Recently added"){        
            let data = getImgreffalgoauction.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp                        
            })
            return data;                                                
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgoauction.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoauction.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})          
          return data;
        }
        }
        else{
                let data = getImgreffalgoauction.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgoauction
    }
    const decrementSize=()=>{
        if(pageSize >= 16){
        setPageSize(pageSize-4)
        }        
    }
    return(        
                    <div className='nft-tabs'>
                    <Tabs defaultActiveKey="NFT" id="uncontrolled-tab-example" className='dashboard-tabs'>                    
                        <Tab eventKey="NFT" title="NFT">

                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgoNFT === null || getImgreffalgoNFT === "" || getImgreffalgoNFT === undefined || getImgreffalgoNFT[0] === null || getImgreffalgoNFT[0] === "" || getImgreffalgoNFT[0] === undefined || filterdata3NFT()[0] === null || filterdata3NFT()[0] === "" || filterdata3NFT()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>                                
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>                                
                                {filterdata3NFT().map((x, index) => {  
                                    if(index<pageSize)                 
                                    return( 
                                    <CreateTabNFT x={x} />
                                    )
                                })}
                                </>
                            )}                                
                                
                            </Row>

                            {getImgreffalgoNFT.length <= 10 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                              
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>
                        <Tab eventKey="Royalty" title="Royalty">

                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgo === null || getImgreffalgo === "" || getImgreffalgo === undefined || getImgreffalgo[0] === null || getImgreffalgo[0] === "" || getImgreffalgo[0] === undefined || filterdata3()[0] === null || filterdata3()[0] === "" || filterdata3()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>                                
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>                                
                                {filterdata3().map((x, index) => {  
                                    if(index<pageSize)                 
                                    return( 
                                    <CreateTab x={x} />
                                    )
                                })}
                                </>
                            )}                                                                
                            </Row>

                            {getImgreffalgo.length <= 10 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>                        
                        <Tab eventKey="Fractional" title="Fractional">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgoFractional === null || getImgreffalgoFractional === "" || getImgreffalgoFractional === undefined || getImgreffalgoFractional[0] === null || getImgreffalgoFractional[0] === "" || getImgreffalgoFractional[0] === undefined || filterdata3fractional()[0] === null || filterdata3fractional()[0] === "" || filterdata3fractional()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>                                
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>                                
                                {filterdata3fractional().map((x, index) => {  
                                    if(index<pageSize)                 
                                    return( 
                                    <CreateTabFractional x={x} />
                                    )
                                })}
                                </>
                            )}                              
                                
                            </Row>

                            {getImgreffalgoFractional.length <= 10 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                              
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>                                                               
                        <Tab eventKey="Auction" title="Auction">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgoauction === null || getImgreffalgoauction === "" || getImgreffalgoauction === undefined || getImgreffalgoauction[0] === null || getImgreffalgoauction[0] === "" || getImgreffalgoauction[0] === undefined || filterdata3auction()[0] === null || filterdata3auction()[0] === "" || filterdata3auction()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>                                
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>                                
                                {filterdata3auction().map((x, index) => {  
                                    if(index<pageSize)                 
                                    return( 
                                    <CreateTabAuction x={x} />
                                    )
                                })}
                                </>
                            )}                              
                                
                            </Row>

                            {getImgreffalgoauction.length <= 10 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                              
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>                                                               
                    </Tabs> 
                    </div>        
    )
}
export default CreateTabTab;