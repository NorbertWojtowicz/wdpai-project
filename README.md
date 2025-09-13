
# Wędkarze — PHP + PostgreSQL (REST API)

Aplikacja webowa dla wędkarzy zbudowana w **czystym PHP+JS** i **PostgreSQL**

---

## Spis treści
- [Funkcjonalności](#funkcjonalności)
- [Wykorzystane technologie](#wykorzystane-technologie)
- [Struktura katalogów](#struktura-katalogów)
- [API (REST)](#api-rest)
- [Diagram ERD](#diagram-erd)

---

## Funkcjonalności
- **Rejestracja** i **logowanie** (**sesje PHP**).
- Wędkarz:
  - dodaje **swoje** zdobycze i spoty/lokacje,
  - ma profil ze statystykami (najcięższa ryba, liczba ryb, ulubiony spot/lokacja, liczba spotów, ostatnie ryby).
- Strona główna: **ostatnie zdobycze**, **popularne spoty** (wg liczby złowionych ryb).
- Widok „**Moje lokacje**” / „**Lokacje spoleczności**” z przełącznikiem.
- Widok „**Moje zdobycze**” / „**Zdobycze spoleczności**” z przełącznikiem.
- Możliwość **wylogowania** użytkownika
- Interfejs **REST API (JSON)**.

---

## Wykorzystane technologie
- **PHP**, 
- **PostgreSQL**
- **HTML, CSS, JavaScript (wraz z fetch API)**

---

## Struktura katalogów
/wedkarze-app/  
│  
├── api/  
│ ├── auth/  
│ │ ├── login.php
│ │ ├── logout.php
│ │ ├── me.php  
│ │ └── register.php  
│ ├── fish/  
│ │ ├── add.php  
│ │ ├── latest.php  
│ │ └── peruser.php  
│ ├── spots/  
│ │ ├── add.php    
│ │ ├── popular.php  
│ │ └── peruser.php
│ ├── user/  
│ │ └── profile.php  
├── config/  
│ ├── database.php  
│ ├── session.php  
│  
├── public/  
│ ├── index.html  
│ ├── login.html  
│ ├── dashboard.html  
│ ├── spots.html  
│ ├── catches.html 
│ ├── profile.html 
│ ├── register.html
│ ├── new-spot-form.html  
│ ├── new-catch-form.html  
│ └── js/  
│ ├── api.js  
│ ├── auth.js  
│ ├── dashboard.js
│ ├── main.js  
│ ├── fishes.js  
│ ├── new-catch-form.js  
│ ├── new-spot-form.js  
│ ├── profile.js 
│ ├── nav-renderer.js  
│ └── spots.js  
│ └── images/  
│ ├── mainbg.jpg
│ ├── signupbg.jpg  
│ └──-- spots/ (zdjecia lokacji)
│ └──-- fishes/ (zdjęcia ryb)
  
---
## API REST
|       METODA         |URL                          |OPIS|WYMAGANA SESJA?|
|----------------|-------------------------------|-----------------------------|-----------------------------|
|POST|`/api/auth/register.php`            |Rejestracja nowego użytkownika.            | NIE|
|POST|`/api/auth/login.php`            |Logowanie istniejącego użytkownika.            | NIE|
|POST|`/api/auth/logout.php`|Wylogowanie użytkownika.| TAK|
|GET|`/api/auth/me.php`|Pobranie informacji o obecnie zalogowanym użytkowniku.| TAK|
|GET|`/api/fish/add.php`|Dodawanie zdobyczy.| TAK|
|GET|`/api/fish/latest.php`|Pobranie ostatnich zdobyczy użytkowników.| NIE|
|GET|`/api/fish/peruser.php`|Pobranie ostatnich zdobyczy obecnie zalogowanego użytkownika.| TAK|
|GET|`/api/spots/add.php`|Dodawanie spotów/lokacji.| TAK|
|GET|`/api/spots/popular.php`|Pobranie najpopularniejszych miejsc do łowienia (na podstawie liczby złowionych ryb).| NIE|
|POST|`/api/spots/peruser.php`|Pobranie spotów/lokacji obecnie zalogowanego użytkownika.| TAK|
|POST|`/api/user/profile.php`|Pobranie informacji oraz statystyk obecnie zalogowanego użytkownika.| TAK|
|PUT|`/api/config/database.php`|Konfiguracja i połączenie z bazą PostgreSQL.| NIE|
|PUT|`/api/config/session.php`|Pobranie informacji o sesji użytkownika.| TAK|

---

## Diagram ERD
![diagram](https://i.imgur.com/hYdnFFc.png)
