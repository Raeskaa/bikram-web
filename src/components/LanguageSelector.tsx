import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function LanguageSelector() {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCountry, setSelectedCountry] = useState('us');

  // Country to flag emoji mapping
  const countryFlags: { [key: string]: string } = {
    'us': '🇺🇸',
    'in': '🇮🇳',
    'gb': '🇬🇧',
    'ca': '🇨🇦',
    'au': '🇦🇺',
    'de': '🇩🇪',
    'fr': '🇫🇷',
    'es': '🇪🇸',
    'it': '🇮🇹',
    'br': '🇧🇷',
    'mx': '🇲🇽',
    'jp': '🇯🇵',
    'cn': '🇨🇳',
    'kr': '🇰🇷',
    'sg': '🇸🇬',
    'ae': '🇦🇪',
  };

  const countryNames: { [key: string]: string } = {
    'us': 'United States',
    'in': 'India',
    'gb': 'United Kingdom',
    'ca': 'Canada',
    'au': 'Australia',
    'de': 'Germany',
    'fr': 'France',
    'es': 'Spain',
    'it': 'Italy',
    'br': 'Brazil',
    'mx': 'Mexico',
    'jp': 'Japan',
    'cn': 'China',
    'kr': 'South Korea',
    'sg': 'Singapore',
    'ae': 'United Arab Emirates',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-100 rounded-md transition-all active:scale-95 border border-gray-200"
        title="Change language and country"
      >
        <span className="text-base">{countryFlags[selectedCountry]}</span>
        <span className="text-sm font-medium text-gray-900">{selectedLanguage.toUpperCase()}</span>
        <ChevronDown className="size-3.5 text-gray-600" />
      </button>
      
      {/* Language Menu */}
      {showLanguageMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowLanguageMenu(false)}
          />
          <div 
            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ transformOrigin: 'top right' }}
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900">Choose your language</p>
              <p className="text-xs text-gray-500 mt-0.5">Select your preferred language</p>
            </div>
            
            <div className="py-1 max-h-80 overflow-y-auto">
              {/* English */}
              <button
                onClick={() => {
                  setSelectedLanguage('en');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'en' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">English</p>
                </div>
                <span className="text-xs text-gray-500">EN</span>
              </button>

              {/* Spanish */}
              <button
                onClick={() => {
                  setSelectedLanguage('es');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'es' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Español</p>
                </div>
                <span className="text-xs text-gray-500">ES</span>
              </button>

              {/* French */}
              <button
                onClick={() => {
                  setSelectedLanguage('fr');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'fr' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Français</p>
                </div>
                <span className="text-xs text-gray-500">FR</span>
              </button>

              {/* German */}
              <button
                onClick={() => {
                  setSelectedLanguage('de');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'de' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Deutsch</p>
                </div>
                <span className="text-xs text-gray-500">DE</span>
              </button>

              {/* Portuguese */}
              <button
                onClick={() => {
                  setSelectedLanguage('pt');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'pt' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Português</p>
                </div>
                <span className="text-xs text-gray-500">PT</span>
              </button>

              {/* Italian */}
              <button
                onClick={() => {
                  setSelectedLanguage('it');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'it' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Italiano</p>
                </div>
                <span className="text-xs text-gray-500">IT</span>
              </button>

              {/* Japanese */}
              <button
                onClick={() => {
                  setSelectedLanguage('ja');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'ja' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">日本語</p>
                </div>
                <span className="text-xs text-gray-500">JA</span>
              </button>

              {/* Chinese */}
              <button
                onClick={() => {
                  setSelectedLanguage('zh');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'zh' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">中文</p>
                </div>
                <span className="text-xs text-gray-500">ZH</span>
              </button>

              {/* Korean */}
              <button
                onClick={() => {
                  setSelectedLanguage('ko');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'ko' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">한국어</p>
                </div>
                <span className="text-xs text-gray-500">KO</span>
              </button>

              {/* Arabic */}
              <button
                onClick={() => {
                  setSelectedLanguage('ar');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'ar' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">العربية</p>
                </div>
                <span className="text-xs text-gray-500">AR</span>
              </button>

              {/* Hindi */}
              <button
                onClick={() => {
                  setSelectedLanguage('hi');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <div className="size-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  {selectedLanguage === 'hi' && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">हिन्दी</p>
                </div>
                <span className="text-xs text-gray-500">HI</span>
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Country/Region Section */}
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900">Change country/region</p>
              <p className="text-xs text-gray-500 mt-0.5">Shopping preferences and currency</p>
            </div>

            <div className="py-1 max-h-60 overflow-y-auto">
              {/* United States */}
              <button
                onClick={() => {
                  setSelectedCountry('us');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['us']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['us']}</p>
                </div>
                {selectedCountry === 'us' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* India */}
              <button
                onClick={() => {
                  setSelectedCountry('in');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['in']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['in']}</p>
                </div>
                {selectedCountry === 'in' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* United Kingdom */}
              <button
                onClick={() => {
                  setSelectedCountry('gb');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['gb']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['gb']}</p>
                </div>
                {selectedCountry === 'gb' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Canada */}
              <button
                onClick={() => {
                  setSelectedCountry('ca');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['ca']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['ca']}</p>
                </div>
                {selectedCountry === 'ca' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Australia */}
              <button
                onClick={() => {
                  setSelectedCountry('au');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['au']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['au']}</p>
                </div>
                {selectedCountry === 'au' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Germany */}
              <button
                onClick={() => {
                  setSelectedCountry('de');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['de']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['de']}</p>
                </div>
                {selectedCountry === 'de' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* France */}
              <button
                onClick={() => {
                  setSelectedCountry('fr');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['fr']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['fr']}</p>
                </div>
                {selectedCountry === 'fr' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Spain */}
              <button
                onClick={() => {
                  setSelectedCountry('es');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['es']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['es']}</p>
                </div>
                {selectedCountry === 'es' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Italy */}
              <button
                onClick={() => {
                  setSelectedCountry('it');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['it']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['it']}</p>
                </div>
                {selectedCountry === 'it' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Brazil */}
              <button
                onClick={() => {
                  setSelectedCountry('br');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['br']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['br']}</p>
                </div>
                {selectedCountry === 'br' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Mexico */}
              <button
                onClick={() => {
                  setSelectedCountry('mx');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['mx']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['mx']}</p>
                </div>
                {selectedCountry === 'mx' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Japan */}
              <button
                onClick={() => {
                  setSelectedCountry('jp');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['jp']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['jp']}</p>
                </div>
                {selectedCountry === 'jp' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* China */}
              <button
                onClick={() => {
                  setSelectedCountry('cn');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['cn']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['cn']}</p>
                </div>
                {selectedCountry === 'cn' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* South Korea */}
              <button
                onClick={() => {
                  setSelectedCountry('kr');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['kr']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['kr']}</p>
                </div>
                {selectedCountry === 'kr' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* Singapore */}
              <button
                onClick={() => {
                  setSelectedCountry('sg');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['sg']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['sg']}</p>
                </div>
                {selectedCountry === 'sg' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>

              {/* United Arab Emirates */}
              <button
                onClick={() => {
                  setSelectedCountry('ae');
                  setShowLanguageMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-xl">{countryFlags['ae']}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{countryNames['ae']}</p>
                </div>
                {selectedCountry === 'ae' && (
                  <Check className="size-4 text-blue-600 flex-shrink-0" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}