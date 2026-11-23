@Courses
Feature: Bir yönetici olarak API bağlantısı üzerinden courses'e erişebilmek istiyorum.

  @US001TC03_AFIN_get
  Scenario: Negative -> GET [ADMIN=FALSE],[ID=NONE]
  /api/courses endpoint'ine
  gecersiz (invalid token) authorization bilgileri ile
  bir GET request gönderildiginde
  dönen status code'in 401 ve
  response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali.
    * Course kullanicisi "invalid" token ile baseUrl olusturur
    * Course kullanicisi "api/courses" path parametrelerini olusturur
    * Courses kullanicisi "GET" sorgusu gonderir
    * Yetkisiz Course kullanicisi statusCode degerinin 401 oldugunu dogrular
    * Yetkisiz Course kullanicisi "message" bilgisinin "Unauthenticated." oldugunu dogrular
