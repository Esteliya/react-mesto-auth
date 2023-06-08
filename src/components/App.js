import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound'
import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth';

function App() {
  const navigate = useNavigate();
  //контекст логина
  const [loggedIn, setLoggedIn] = React.useState(false);

  //контекст данных пользователя - лишний стейт
  //const [userInfo, setUserInfo] = React.useState({ email: '', password: '' });

  //контекст данных пользователя - email
  const [userEmail, setUserEmail] = React.useState('');

  //контекст роутов сайта 
  const [currentRoute, setCurrentRoute] = React.useState('');


  const handleLogin = (data) => {
    setLoggedIn(true);//залогинились (правда)
    console.log(data.email);
    //console.log(data.email);
    console.log(data);
    console.log(data.data);
    //console.log(data.password);
    //setUserInfo({ data });
    setUserEmail(data.email)
    //console.log(userEmail);
  }
  //контекст попапа оповещения хода регистрации
  const [showInfoToolTip, setShowInfoToolTip] = React.useState(false)

  const [result, setResult] = React.useState(false);


  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        //выводим на страницу данные профиля
        setCurrentUser(userData);
        //console.log(userData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);

  //контекст карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getArrCards()
      .then((cardsData) => {
        //выводим на страницу карточки
        //console.log('запросили данные карточек');
        setCards(cardsData);
        //console.log('обновились данные');
        //console.log(cardsData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);//обновляем 1 раз

  //добавить карточку
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleAddPlaceSubmit(place) {
    console.log('функция работает')
    //console.log(place);//все ок. Объект {name: '', link: ''}
    api.postUserCard(place)
      //изменения карточек
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      //если ошибка в запросе api
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }


  //редактировать профиль
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleUpdateUser(userData) {
    api.patchUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }


  //редактировать аватар профиля
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleUpdateAvatar(avatar) {
    console.log(avatar);
    api.patchAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //открываем zoom-попап 
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //ставим лайк 
  function handleCardLike(card) {
    //console.log('ставим лайк карточке');
    //console.log(card);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      console.log('лайк');
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        //ловим вероятную ошибку
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    } else {
      console.log('дизлайк');
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        //ловим вероятную ошибку
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }

  //удаляем карточку
  function handleCardDelete(card) {
    //console.log('удаляем карточку');
    //console.log(card);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      //ловим вероятную ошибку
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
    //console.log(`удалили карточку ${card._id}`);
  }

  //закрываем попапы по крестику
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    //setIscheckRegister(false);
    setSelectedCard({});
    setShowInfoToolTip(false)
  }

  //регистрируем пользователя +
  function handleRegister(data) {
    const { email, password } = data;
    auth.register(email, password)
      .then(() => {
        //console.log(data)
        //alert('Регистрация прошла успешно')//работает 
        setResult(true)
        setShowInfoToolTip(true)
        //переходим к авторизации пользователя
        navigate('/sign-up', {
          replace: true
        })
      })
      .catch((err) => {
        //console.log('ОШИБКА РЕГИСТРАЦИИ')
        console.error(`Ошибка: ${err}`);
        setResult(false)
        setShowInfoToolTip(true)
      })
  }

  //авторизируем пользователя 
  function handleAutorization(data) {
    const { email, password } = data;
    //setUserInfo(data);
    //console.log(data);
    //console.log(data.email);
    //console.log(data.password);
    //сохранили в объект данные из полей при авторизации —> используем после успешной авторизации
    const dataAuthUser = {
      email: email,
      password: password
    };
    console.log(dataAuthUser);
    auth.authorize(email, password)
      .then((data) => {
        //console.log(data);
        //alert('Авторизация прошла успешно')
        if (data.token) {
          console.log('получаем токен');
          console.log(data.token);
          localStorage.setItem('jwt', data.token);
          //console.log('записали данные токена в localStorage');
          //после успешной авторизации передаем данные авторизировавшегося пользователя дальше
          console.log('1');
          console.log(dataAuthUser);
          handleLogin(dataAuthUser);
          console.log('2');
          console.log(dataAuthUser);
          console.log('3');
          navigate('/');
        }
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //проверяем наличие токена в localStorage
  function tockenCheck () {    
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.checkToken(jwt)
        .then(user => {
          //setLoggedIn(false);
          //setLoggedIn(true);//уже есть в handleLogin
          console.log(user);
          handleLogin(user.data);
          //console.log(user.data.email);
          //setUserEmail(user.data.emai);
          //console.log(userEmail);
          navigate('/');
        })
        .catch(console.log);
    } else {
      //setLoggedIn(true);
      setLoggedIn(false);
    }
  }
//при загрузке страницы проверяем токен 
  React.useEffect(() => {
    tockenCheck();
  }, [])

  //удаляем токен - для кнопки ВЫХОД - работает - пробросить в Header!!! 
  function handleExitProfile() {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem("jwt");
      //navigate("/sign-in");//перебрасываем на авторизацию - есть в link в Header 
      setLoggedIn(false);//незалогинен
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          loggedIn={loggedIn}
          currentRoute={currentRoute}
          handleExitProfile={handleExitProfile}
        />
        <Routes>

        <Route exact path='/' element={!loggedIn ? <Navigate to='/sign-up' /> :  <ProtectedRoute
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
              setCurrentRoute={setCurrentRoute}
              element={Main} />} replace />
         
          <Route exact path='/sign-up' element={<Register handleDataForm={handleRegister} setCurrentRoute={setCurrentRoute}/>} />
          <Route exact path='/sign-in' element={<Login handleDataForm={handleAutorization} setCurrentRoute={setCurrentRoute}/>} />
          <Route path='*' element={<NotFound />} replace/>

        </Routes>

        {loggedIn ? <Footer /> : ''}

        <InfoTooltip
          isOpen={showInfoToolTip}
          onClose={closeAllPopups}
          res={result}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name='delete-card' title='Вы уверены?' btnText='Да' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
