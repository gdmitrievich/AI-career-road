import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoIcon from '../../assets/logoIcon.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = localStorage.getItem('currentUser') 
    ? JSON.parse(localStorage.getItem('currentUser')!) 
    : null;

  // Проверяем, есть ли последняя REAL карта (не mock)
  const hasRealLastRoadmap = () => {
    const lastRoadmap = localStorage.getItem('lastRoadmap');
    if (!lastRoadmap) return false;
    
    try {
      const parsed = JSON.parse(lastRoadmap);
      // Проверяем, что это реальная карта (не mock)
      return !!parsed.generatedAt;
    } catch {
      return false;
    }
  };

  // Проверяем, есть ли пользователи в системе (локальная проверка)

  const hasLocalUsers = () => {
    const usersJson = localStorage.getItem('aspirepath_users');
    return usersJson && JSON.parse(usersJson).length > 0;
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setShowDropdown(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img 
            src={logoIcon} 
            alt="AspirePath" 
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-gray-900">AspirePath</span>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-4">
          {/* Кнопка возврата к карте (только на стартовой странице И если есть реальная сохраненная карта) */}
          {location.pathname === '/' && hasRealLastRoadmap() && (
            <button
              onClick={() => {
                const lastRoadmap = JSON.parse(localStorage.getItem('lastRoadmap')!);
                navigate('/roadmap', { state: { roadmapData: lastRoadmap } });
              }}
              className="px-4 py-2 text-black-600 border border-black-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Вернуться к карте
            </button>
          )}

          {/* Иконка профиля */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              {user ? (
                <span className="text-lg font-bold text-red-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>

            {/* Выпадающее меню */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-slideDown">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Личный кабинет
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Гость</p>
                    </div>
                    <button
                      onClick={handleLoginClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Войти
                    </button>
                    <button
                      onClick={handleSignupClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Регистрация
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;