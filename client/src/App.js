import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import NavBar from './components/views/NavBar/NavBar';
import AllAds from './components/pages/AllAds/AllAds';
import Footer from './components/views/Footer/Footer';
import Page from './components/views/Page/Page';
import SingleAd from './components/pages/SingleAd/SingleAd';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAds } from './redux/adsRedux';
import AddAd from './components/pages/CreateAd/CreateAd';
import SearchResults from './components/pages/SearchResult/SearchResult';
import { API_URL } from './config';
import { logIn } from './redux/usersRedux';
import EditAd from './components/pages/EditAd/EditAd';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const options = {
    method: 'GET',
    credentials: 'include',
  };

  fetch(`${API_URL}/auth/user`, options)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      dispatch(logIn({ login: data.login }));
    })
    .catch(e => {
      console.log(e);
    });

  return (
    <Page>
      <Container style={{ flex: '1' }}>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<AllAds />} />
          <Route path={'/ads/:id'} element={<SingleAd />} />
          <Route path={'/ads/add'} element={<AddAd />} />
          <Route path={'/ads/edit/:id'} element={<EditAd />} />
          {/* <Route path={'/ads/remove/:id'} element={<SingleAd />} /> */}
          <Route path={'/search/:searchPhrase'} element={<SearchResults />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/logout'} element={<Logout />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Page>
  );
}

export default App;
