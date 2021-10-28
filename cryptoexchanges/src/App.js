import './App.css';
import ButtonAppBar from './NavBar/index'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {

  const [exchangeOne, setexchangeOne] = useState(undefined);
  const [exchangeTwo, setexchangeTwo] = useState(undefined);
  const [allowed, setallowed] = useState(0);

  const [exchangeOneloading, setexchangeOneloading] = useState(false);
  const [exchangeTwoloading, setexchangeTwoloading] = useState(false);
  const [allowedloading, setallowedloading] = useState(false);

  const [bestbuybtc, setbestbuybtc] = useState(undefined);
  const [bestsellbtc, setbestsellbtc] = useState(undefined);
  const [bestbuyeth, setbestbuyeth] = useState(undefined);
  const [bestselleth, setbestselleth] = useState(undefined);

  const [loading, setloading] = useState(true);


  useEffect(() => {

    async function getDetails() {

      let results;
      await axios('http://localhost:3001/exchangeone').then(res => {results = res});

      setexchangeOne(results.data);

      await axios('http://localhost:3001/exchangetwo').then(res => {results = res});

      setexchangeTwo(results.data);

      await axios('http://localhost:3001/allowance').then(res => {results = res});

      setallowed(results.data);

    }

    getDetails();
    
  }, []);

  useEffect(() => {

    if(exchangeOne !== undefined)
    { 
        setexchangeOneloading(true);
    }
   
  }, [exchangeOne])

  useEffect(() => {
    if(exchangeTwo !== undefined)
    { 
        setexchangeTwoloading(true);
    }
  }, [exchangeTwo])

  useEffect(() => {
    if(allowed !== 0)
    { 
        setallowedloading(true);
        setloading(false);
        makeDecision();
        
    }
    console.log(allowed);

  }, [allowed])

  function makeDecision() {

    if(exchangeOne[0].detailsinfo[0].buy >= exchangeTwo[0].detailsinfo[0].buy)
    {
      setbestbuybtc(exchangeTwo[0].exchange)
    }
    else{
      setbestbuybtc(exchangeOne[0].exchange)
    }

    if(exchangeOne[0].detailsinfo[0].sell <= exchangeTwo[0].detailsinfo[0].sell)
    {
      setbestsellbtc(exchangeTwo[0].exchange)
    }
    else{
      setbestsellbtc(exchangeOne[0].exchange)
    }

    if(exchangeOne[0].detailsinfo[1].buy >= exchangeTwo[0].detailsinfo[1].buy)
    {
      setbestbuyeth(exchangeTwo[0].exchange)
    }
    else{
      setbestbuyeth(exchangeOne[0].exchange)
    }

    if(exchangeOne[0].detailsinfo[1].sell <= exchangeTwo[0].detailsinfo[1].sell)
    {
      setbestselleth(exchangeTwo[0].exchange)
    }
    else{
      setbestselleth(exchangeOne[0].exchange)
    }
  }

  return (
    <div className="crypt">
      <header className="crypt-header">
        <>
        <ButtonAppBar />
        <div style={{marginTop: '30px'}}>

        {loading && <Box sx={{textAlign: 'center'}}>
            <CircularProgress />
            
        </Box>}

        {loading === false && allowed !== 0 && <><div style={{textAlign: 'left', marginLeft: '25px'}}>
        <Typography variant="body2" component="div">
          <br />
          API allowance until next 24 hours: {allowedloading ? allowed.allowance+"/10" : ''}
          <br />
        </Typography>
        </div>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
            <Grid item xs={6}>
              <Item>
              <Card sx={{ maxWidth: 'auto', boxShadow: 0, textAlign: 'center' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F908633080%2F960x0.jpg%3Ffit%3Dscale"
                      alt="bitcoin"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Bitcoin
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Exchange: {exchangeOneloading ? exchangeOne[0].exchange : ''}
                        <br />
                        <br />
                        Buying Price: {exchangeOneloading ? exchangeOne[0].detailsinfo[0].buy+" USD"  : ''}
                        <br />
                        Selling Price: {exchangeOneloading ? exchangeOne[0].detailsinfo[0].sell+" USD"  : ''}
                        <br />
                        <br />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Exchange: {exchangeTwoloading ? exchangeTwo[0].exchange: ''}
                        <br />
                        <br />
                        Buying Price: {exchangeTwoloading ? exchangeTwo[0].detailsinfo[0].buy+" USD" : ''}
                        <br />
                        Selling Price: {exchangeTwoloading ? exchangeTwo[0].detailsinfo[0].sell+" USD" : ''}
                        <br />
                        <br />
                        Best Exchange for buying Bitcoin : { bestbuybtc ? bestbuybtc : ''}
                        <br />
                        Best Exchange for selling Bitcoin : { bestsellbtc ? bestsellbtc : ''}
                        <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
               </Card>
              </Item>
            </Grid>
            <Grid item xs={6}>
            <Item>
            <Card sx={{ maxWidth: 'auto', boxShadow: 0, textAlign: 'center' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://media.istockphoto.com/photos/stack-of-ether-coins-with-gold-background-picture-id901948904?k=20&m=901948904&s=612x612&w=0&h=YipJYDARl-e5qxBeLeokZuyjV9bT2y9G4HPJorVL2hY="
                      alt="ethereum"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Ethereum
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Exchange: {exchangeOneloading ? exchangeOne[0].exchange : ''}
                        <br />
                        <br />
                        Buying Price: {exchangeOneloading ? exchangeOne[0].detailsinfo[1].buy+" USD" : ''}
                        <br />
                        Selling Price: {exchangeOneloading ? exchangeOne[0].detailsinfo[1].sell+" USD"  : ''}
                        <br />
                        <br />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Exchange: {exchangeTwoloading ? exchangeTwo[0].exchange: ''}
                        <br />
                        <br />
                        Buying Price: {exchangeTwoloading ? exchangeTwo[0].detailsinfo[1].buy+" USD" : ''}
                        <br />
                        Selling Price: {exchangeTwoloading ? exchangeTwo[0].detailsinfo[1].sell+" USD" : ''}
                        <br />
                        <br />
                        Best Exchange for buying Ethereum : { bestbuyeth ? bestbuyeth : ''}
                        <br />
                        Best Exchange for selling Ethereum : { bestselleth ? bestselleth : ''}
                        <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
               </Card>
            </Item>
            </Grid>
        </Grid></>}
        </div>
        </>
      </header>
    </div>
  );
}

export default App;
