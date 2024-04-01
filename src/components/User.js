import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const RouteLink = React.forwardRef((itemProps, ref) => <Link ref={ref} {...itemProps} role={undefined} />);

const User = () => {
  const { id: username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})

  if(!username) {
    return null;
  }

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
        <Box sx={{ display: 'flex', flex: 'row', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', m: 'auto' }}>
            <CircularProgress />
          </Box>
        </Box>
      )}
      {!isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', m: 1 }}>
          {Object.keys(user).length && (
            <Card sx={{ width: 400 }}>
              <CardMedia component="img" sx={{ m: '0 auto', width: 200, p: 1, borderRadius: '50%' }} image={user.avatar_url} alt={user.name} />
              <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">{user.name}</Typography>
                  <Typography component="div" variant="subtitle1">{user.login}</Typography>
                  {user.location && (<Typography variant="subtitle1" color="text.primary" component="div">{user.location}</Typography>)}
                  {user.company && (
                    <Typography variant="subtitle1" color="text.primary" component="div">{user.company}</Typography>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0' }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">{user.followers} followers</Typography>
                    <Typography sx={{ px: 1 }} variant="subtitle1" color="text.secondary" component="div">{user.following} following</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">{user.public_repos} repositories</Typography>
                  </div>
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
