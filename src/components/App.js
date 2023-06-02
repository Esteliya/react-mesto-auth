import React from 'react';
//import { Route, Routes } from 'react-router-dom';
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

function App() {
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
        setCards(cardsData);
        //console.log('обновились данные');
        //console.log(cardsData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);//обновляем при изменении в cards

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
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        {/* <Routes>
            <Route path='/' elemeht={
              <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              currentUser={currentUser}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            } />
            <Route path='/sign-up' elemeht={<Register />} />
            <Route path='/sign-in' elemeht={<Login />} />
        </Routes> 
        <Register/>*/}
      
        <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

        <Footer />
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
