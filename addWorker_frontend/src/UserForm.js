import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Typography} from '@mui/material';


const UserForm  = ({addUser, updateUser, submitted, data, isEdit}) => {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [license, setLicense] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() =>{
    if(!submitted){
      setId(0);
      setName('');

      setNumber('');
      setEmail('');
      setAddress('');
      setLicense('');
      setUsername('');
      setPassword('');
    }
  }, [submitted]);

  useEffect(() => {
    if(data?.id && data.id !==0){
      setId(data.id);
      setName(data.name);

      setNumber(data.number);
      setEmail(data.email);
      setAddress(data.address);
      setLicense(data.license);
      setUsername(data.username);
      setPassword(data.password);
    }
  }, [data]);

  return (
    <Grid
      container
      spacing={5}
      sx={{
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        display: 'block',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderLeft:'100%'
      }}
    >
      <Grid item xs={12}>
        <Typography variant='h4' sx={{ color: '#000000' }}>Add A Worker</Typography>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
  <Typography
    component={'label'}  
    htmlFor="inputField"
    sx={{
      color: '#000000',
      fontSize: '16px',
      width: '200px',
    }}
  >
    Registration ID
  </Typography>
  <Input
    type="text"
    id="id"
    name="id"
    sx={{ width: '100%' }}
    placeholder="Enter registration ID"
    value={id}
    onChange={e => setId(e.target.value)}
  />
</Grid>

  <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
  <Typography
    component={'label'}  
    htmlFor="inputField"
    sx={{
      color: '#000000',
      fontSize: '16px',
      width: '200px',
      display: 'block',
    }}
  >
    Name
  </Typography>
  <Input
    type="text"
    id="name"
    name="name"
    sx={{ width: '100%' }}
    placeholder="Enter name"
    value={name}
    onChange={e => setName(e.target.value)}
  />
</Grid> 

<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={'label'}
          htmlFor="inputField"
          sx={{
            color: '#000000',
            fontSize: '16px',
            width: '200px',
          }}
        >
          Contact No
        </Typography>
        <Input
          type="text"
          id="number"
          name="number"
          sx={{ width: '100%' }}
          placeholder="Enter contact no"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={'label'}
          htmlFor="inputField"
          sx={{
            color: '#000000',
            
            fontSize: '16px',
            width: '200px',
          }}
        >
          Email
        </Typography>
        <Input
          type="text"
          id="email"
          name="email"
          sx={{ width: '100%' }}
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={'label'}
          htmlFor="inputField"
          sx={{
            color: '#000000',
            
            fontSize: '16px',
            width: '200px',
          }}
        >
          Address
        </Typography>
        <Input
          type="text"
          id="address"
          name="address"
          sx={{ width: '100%' }}
          placeholder="Enter address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={'label'}
          htmlFor="inputField"
          sx={{
            color: '#000000',
           
            fontSize: '16px',
            width: '200px',
          }}
        >
          Driving license NO
        </Typography>
        <Input
          type="text"
          id="license"
          name="license"
          sx={{ width: '100%' }}
          placeholder="Enter driving license NO"
          value={license}
          onChange={e => setLicense(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={'label'}
          htmlFor="inputField"
          sx={{
            color: '#000000',
          
            fontSize: '16px',
            width: '200px',
          }}
        >
          Username
        </Typography>
        <Input
          type="text"
          id="username"
          name="username"
          sx={{ width: '100%' }}
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={'label'}
          htmlFor="inputField"
          sx={{
            color: '#000000',
            
            fontSize: '16px',
            width: '200px',
          }}
        >
          Password
        </Typography>
        <Input
          type="password"
          id="password"
          name="password"
          sx={{ width: '100%' }}
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00820D',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#00820D',
            },
            marginRight: '10px', // Add margin between buttons
          }}
          onClick={() => isEdit ? updateUser({id,name,number,email,address,license,username,password}) : addUser({id,name,number,email,address,license,username,password})}
        >
          {
            isEdit ? 'Update' : 'Register'
          }
        </Button>
      </Grid>

        
      </Grid>

    </Grid>

    
  );


}

export default UserForm;
