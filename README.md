# Klinika weterynaryjna
Projekt dotyczy stworzenia prostej aplikacji służącej do prowadzenia bazy danych lecznicy zwierząt / kliniki weterynaryjnej. Docelowo umożliwia użytkownikowi przeglądanie dokumentacji medycznej swoich zwierząt oraz rezerwowania wizyt.

## Przykładowe widoki aplikacji
1. Lista zwierząt
![app1](./src/assets/app_1.png)

2. Edycja gatunku
![app2](./src/assets/app_2.png)

   
## Technologie

### Stack technologiczny:
* Angular 14
* Angular material
* SCSS
* rxjs
* jwt

### Zastosowane rozwiązania:
* implementacja state managementu na behaviour subjectach
* interceptor doklejający authorization header do requestów http
* podział na lazy-loadowane moduły
