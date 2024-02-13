import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const RouteLink = React.forwardRef((itemProps, ref) => <Link ref={ref} {...itemProps} role={undefined} />);

const User = () => {
  const { state: { username } = {} } = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    if (isLoading) {
      fetch('https://api.github.com/users/' + username)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('ERROR: Error fetching GitHub user detail', error)
      })
    }
  }, [isLoading])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', m: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', m: 1 }}>
        <Button variant="outlined" component={RouteLink} to="/" sx={{ width: 100 }}>Home</Button>
      </Box>
      {isLoading && (
        <CircularProgress />
      )}
      {!isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', m: 1 }}>
          {Object.keys(user).length && (
            <Card sx={{ display: 'flex', flexDirection: 'row', width: 500 }}>
              <CardMedia component="img" sx={{ width: 151, p: 1 }} image={user.avatar_url} alt={user.name} />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">{user.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">{user.location}</Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">Followers: {user.followers}</Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">Following: {user.following}</Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">Repositories: {user.public_repos}</Typography>
                </CardContent>
              </Box>
            </Card>
          )}
          {!Object.keys(user).length && (
            <h1>Oops! Something went wrong.</h1>
          )}
        </Box>
      )}
    </Box>
  )
}

export default User
