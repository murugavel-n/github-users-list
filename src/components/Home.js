import { Avatar, Box, Card, CardMedia, CircularProgress, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RouteLink = React.forwardRef((itemProps, ref) => <Link ref={ref} {...itemProps} role={undefined} />);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (isLoading) {
      fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('ERROR: Error fetching GitHub users', error)
      })
    }
  }, [isLoading])

  return (
    <>
      <Typography component="div">
        <Box sx={{ fontWeight: 'bold', fontSize: 'h6.fontSize', lineHeight: 3, m: 1, textAlign: 'center', textTransform: 'capitalize' }}>GitHub Users</Box>
      </Typography>
      <Box sx={{ display: 'flex', flex: 'row', flexWrap: 'wrap' }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', m: 'auto' }}>
            <CircularProgress />
          </Box>
        )}
        {!isLoading && users.length && users.map((user) => (
            <Box key={user.login} sx={{ m: 1, p:1, borderRadius: 5, height: 50, width: 300 }}>
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
