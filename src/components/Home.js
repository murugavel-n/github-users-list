import { Avatar, Box, Button, Card, CardMedia, CircularProgress, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, styled } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RouteLink = React.forwardRef((itemProps, ref) => <Link ref={ref} {...itemProps} role={undefined} />);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')

  const fetchDefaultUsers = useCallback(() => {
    fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('ERROR: Error fetching GitHub users', error)
      })
  }, [])

  useEffect(() => {
    if (isLoading) {
      fetchDefaultUsers()
    }
  }, [isLoading])

  const handleLocationChange = useCallback((e) => {
    const value = e.target.value
    setLocation(value)
  }, [])

  const handleUsernameChange = useCallback((e) => {
    const value = e.target.value
    setUsername(value)
  }, [])

  const handleSearchClick = useCallback(() => {
    if (username || location) {
      const url = `https://api.github.com/search/users?q=${username}+location:${location}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.items)
        })
        .catch((error) => {
          console.log(`ERROR: Error fetching GitHub users by search criteria: username=${username}; location=${location}`, error)
        })
    } else {
      fetchDefaultUsers()
    }
  }, [location, username])

  return (
    <>
      <Typography component="div">
        <Box sx={{ fontWeight: 'bold', fontSize: 'h6.fontSize', lineHeight: 3, m: 1, textAlign: 'center', textTransform: 'capitalize' }}>GitHub Users</Box>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'space-around', m: 'auto' }}>
        <TextField id="username" label="User name" variant="filled" value={username} onChange={handleUsernameChange} />
        <TextField id="location" label="User location" variant="filled" value={location} onChange={handleLocationChange} />
        <Button variant="contained" onClick={handleSearchClick} size="small">Search</Button>
      </Box>
      <Box sx={{ display: 'flex', flex: 'row', flexWrap: 'wrap' }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', m: 'auto' }}>
            <CircularProgress />
          </Box>
        )}
        {!isLoading && users.length && users.map((user) => (
          <Box key={user.login} sx={{ m: 1, p: 1, borderRadius: 5, height: 50, width: 300 }}>
            <ListItem button component={RouteLink} to={`/user/${user.login}`} state={{ username: user.login }} sx={{ p: 1 }}>
              <ListItemAvatar>
                <Avatar alt={user.login} src={user.avatar_url} sx={{ width: 50, height: 50 }} />
              </ListItemAvatar>
              <ListItemText primary={user.login} sx={{ textTransform: 'capitalize' }} />
            </ListItem>
          </Box>
        ))
        }
      </Box>
    </>
  )
}

export default Home
